import * as THREE from 'threebox-plugin/src/three';     // threebox = three.js + GLTFLoader + more (for mapbox)
import { Threebox } from 'threebox-plugin';
import mapboxgl from 'mapbox-gl';


export default function spawnObject(id, file ,modelOrigin, modelAltitude, modelRotate, modalScale) {
    const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
        modelOrigin,
        modelAltitude
    );

    const modelTransform = {
        translateX: modelAsMercatorCoordinate.x,
        translateY: modelAsMercatorCoordinate.y,
        translateZ: modelAsMercatorCoordinate.z,
        rotateX: modelRotate[0],
        rotateY: modelRotate[1],
        rotateZ: modelRotate[2],
        scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits() * modalScale
    };

    return {
        id: id,
        type: 'custom',
        renderingMode: '3d',
        onAdd: function (map, gl) {     // this format MUST be called from Mapbox.Map.addLayer() (for the gl context)
            this.camera = new THREE.Camera();
            this.scene = new THREE.Scene();

        
            // TODO: model properties (pos/rot/scale/maybe others) are currently mangled between three.js and threebox
            // !! TODO: RE preserveDrawingBuffer: Accidentally required, unlike any other option.
            // I think Threebox has a scope oopsie in the options, such that this ONE setting
            // is read from the wrong options on init - if it isn't specified here, it's undefined and the world burns.
            // Worth opening a GitHub issue for.

            // TODO make a Threebox lifecycle that starts and propagates current instance to window.tb
            // per page on page enter, and nullifies and disposes current instance on page leave
            window.tb = new Threebox( map, gl, { defaultLights: true, preserveDrawingBuffer: false } );
            window.tb.loadObj({
                    obj: file,
                    type: 'gltf',
                    scale: 1,
                    units: 'meters',
                    rotation: { x: 90, y: 0, z: 0 } //default rotation
                },
                (model) => {
                    const modelAsObj = model.setCoords(origin); // "origin" is faultily called here and will fall back to window.origin AKA the current host address (spoiler: that's not a geo coordinate)
                    window.tb.add(modelAsObj);
                }
            );
            this.map = map;
            
            // use the Mapbox GL JS map canvas for three.js
            this.renderer = new THREE.WebGLRenderer({
                canvas: map.getCanvas(),
                context: gl,
                antialias: true
            });
        
            this.renderer.autoClear = false;
        },
        render: function (gl, matrix) {
            const rotationX = new THREE.Matrix4().makeRotationAxis(
                new THREE.Vector3(1, 0, 0),
                modelTransform.rotateX
            );
            const rotationY = new THREE.Matrix4().makeRotationAxis(
                new THREE.Vector3(0, 1, 0),
                modelTransform.rotateY
            );
            const rotationZ = new THREE.Matrix4().makeRotationAxis(
                new THREE.Vector3(0, 0, 1),
                modelTransform.rotateZ
            );
            
            const m = new THREE.Matrix4().fromArray(matrix);
            const l = new THREE.Matrix4()
            .makeTranslation(
                modelTransform.translateX,
                modelTransform.translateY,
                modelTransform.translateZ
            )
            .scale(
                new THREE.Vector3(
                    modelTransform.scale,
                    -modelTransform.scale,
                    modelTransform.scale
                )
            )
            .multiply(rotationX)
            .multiply(rotationY)
            .multiply(rotationZ);
                
            this.camera.projectionMatrix = m.multiply(l);
            this.renderer.resetState();
            this.renderer.render(this.scene, this.camera);
            this.map.triggerRepaint();
        }
    };
}