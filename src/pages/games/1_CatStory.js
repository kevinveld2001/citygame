// TODO:
// - load and display map of the city/area where the game plays out
// - add player model OR assume first person view with sensible camera position in 3D/PokemonGo style
// - location-based player movement (mock up with input controls too?)
// - get map waypoints/legs/route (Mapbox) and display pawprints in steps
//  * assume fixed static route first, start = train station, mid = bus stop, end = cafe
//  * if tweak parameters are to be added ala Unity Inspector fields, just parse a JSON
// - sync narrative with Toto (how??)
// - display cat in its final position (proximity based) + mock up a win condition/sequence
// - get locations and quest steps from Toto, report back progress to Toto
//  * QR codes? questions? should have here: a nice blend between "gameplay" map and the method to progress, not switching pages


import React, {useRef, useEffect, useState, useContext} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Threebox from 'threebox/src/Threebox';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;


function CatStory({ elementId, sessionId }) {
    // -- spawn map with Mapbox, still within React control
    // set up for our target location
    const mapContainer = useRef(null);
    const map = useRef(null);
    const gltfLoader = new GLTFLoader();

    if (map.current) return;
    const startPosition = [45.95483, 13.63506];   // current start position = near NG train station; TODO un-hardcode the starting position
    const boundSize = 0.05;
    const bounds = [
        [startPosition[0] - boundSize, startPosition[1] - boundSize],
        [startPosition[0] + boundSize, startPosition[1] + boundSize]
    ];
    map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/outdoors-v12',
        center: startPosition,
        zoom: 11,
        pitch: 20/*, 
        maxBounds: bounds*/
    });

    
    const TBWrapper = new Threebox(map, map.getCanvas().getContext('webgl') /*, options{}*/);

    map.on('style.load', () => {
        map.addLayer({
            id: 'tb-cat-map',
            type: 'custom',
            renderingMode: '3d',
            onAdd: function () {
                /**
                const scale = 3.2;
                const options = {
                    obj: 'https://docs.mapbox.com/mapbox-gl-js/assets/metlife-building.gltf',
                    type: 'gltf',
                    scale: { x: scale, y: scale, z: 2.7 },
                    units: 'meters',
                    rotation: { x: 90, y: -90, z: 0 }
                };
                
                TBWrapper.loadObj(options, (model) => {     // ONLY LOADS .obj FILES
                    model.setCoords([-73.976799, 40.754145]);
                    model.setRotation({ x: 0, y: 0, z: 241 });
                    TBWrapper.add(model);
                });
                /**/
                loader.load('./models/necklace_test.glb',
                    (gltf) => {
                        const gltfAsObj = TBWrapper.Object3D(gltf.scene);
                        gltfAsObj.setCoords([45.95533, 13.63527]);
                        TBWrapper.add(gltfAsObj);
                    }
                );
            },
                
            render: function () {
                tb.update();
            }
        });
    });


    // TODO isLoading??
    // TODO don't forget resize callback (see Map.js)??
    // return a mapContainer div -> has map -> has Threebox wrapper around the other setup
    // AKA in human language: a display of the necessary background and objects (map, here: cat, anything else ??)
    return (
        <>  
            <div className='h-full w-full flex flex-col' > 
                <div ref={mapContainer} className='flex-1' />
            </div>
            <Game elementId={elementId} sessionId={sessionId} />
        </>
    );
}

export default CatStory;