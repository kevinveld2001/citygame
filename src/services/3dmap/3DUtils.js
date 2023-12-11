import * as THREE from 'threebox-plugin/src/three';     // threebox = three.js + GLTFLoader + more (for mapbox)
import { Threebox } from 'threebox-plugin';
import mapboxgl from 'mapbox-gl';

/* TODO:
 * - On current page: init Mapbox Map object
 * - On current page: init Threebox object tied to the map (never global / on window)
 * - On current page: if any relevant 3D models, spawn them on a dedicated layer (technically each new model could be on a new layer)
 * - On current page: --||-- tooltips
 * - On leave page: dispose of Threebox (allegedly handles all necessary underlying disposes)
 */



/**
 * Initializes a new instance of a Mapbox Map.
 * 
 * @param options REQUIRED: ```container``` with the HTML element that will hold this map. For all options, see: https://docs.mapbox.com/mapbox-gl-js/api/map/
 */
export function initMapboxMap(options) {
    return new mapboxgl.Map(options);
}

// @param map Mapbox map to initialize Threebox on.
/**
 * Initializes a new live (updating) Threebox instance linked to the Mapbox 'map' (WebGL context is obtained automatically from it).
 * 
 * @param mapLayerId Unique ID string for the newly created map layer.
 * @param options (optional) Threebox instance options. ```!! WARNING: IF YOU USE THIS, YOU MUST SPECIFY '{ preserveDrawingBuffer: false }'!!``` See: https://github.com/jscastro76/threebox/blob/master/docs/Threebox.md#threebox-instance
 * 
 * @returns The initialized Threebox instance. Use this for all subsequent operations on the same map/page.
 */
export function initThreeboxOnMap(mapLayerId, map, options) {
    const finalOptions = options === undefined ? { preserveDrawingBuffer: false } : options;

    const newTb = new Threebox(map, map.getCanvas().getContext('webgl'), finalOptions);

    map.addLayer({
            id: mapLayerId,
            type: 'custom',
            renderingMode: '3d',
                
            render: function () { newTb.update(); }
        });

    return newTb;
}

// @param tbox Threebox instance on whose underlying map the object will be loaded.
/**
 * DO NOT USE! The return is not proper because of ```Threebox.loadObj```, therefore this is useless. Use ```Threebox.loadObj``` directly!
 * Loads a new GLTF object from ```file``` on the specified ```tbox``` Threebox instance AND adds it.
 * 
 * @param file File to load the object from. Use ```/directory/file.extension``` absolute format to load from ```/public```.
 * @param options (optional) Threebox instance options. See: https://github.com/jscastro76/threebox/blob/master/docs/Threebox.md#loadobj . Defaults to GLTF type and metres scale. SET MODEL TRANSFORM USING ```set(options)``` ON THE RETURNED OBJECT INSTEAD!
 * 
 * 
 */
// @returns The successfully loaded and added object. Use this to set transforms, other options, or event listeners.
export function loadGLTFObject(tbox, file, options) {
    options = options === undefined ? {
        obj: file,   // loads from /public after webpack bundles it
        type: 'gltf',
        units: 'meters'
    }
    : options;

    tbox.loadObj(options, (obj) => {
        tbox.add(obj);
        return obj;
    });
}