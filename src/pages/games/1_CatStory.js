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


function CatStory() {
    const mapContainer = useRef(null);  // the ref from <div> doesn't get passed outside of the useEffect, i.e. container would be null
    const map = useRef(null);

    useEffect( () => {
        if (map.current) return;

        // type: LngLatLike - REVERSE of the usual (lat, long) pairing, apparently a GeoJSON thing
        const startPosition = [13.63506, 45.95483];   // current start position = near NG train station; TODO un-hardcode the starting position
        const boundSize = 0.05;
        const bounds = [
            [startPosition[0] - boundSize, startPosition[1] - boundSize],
            [startPosition[0] + boundSize, startPosition[1] + boundSize]
        ];
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/outdoors-v12',
            center: startPosition,
            zoom: 45,
            pitch: 75, 
            maxBounds: bounds
        });
    
        
        // comment: am I really locked to typing map.current every time? if that's the case, can we not "escape" React there for a second?
        // which probably just shows that I need to learn more about refs.
        const TBWrapper = new Threebox(map.current, map.current.getCanvas().getContext('webgl') /*, options{}*/);
        const gltfLoader = new GLTFLoader();
    
        map.current.on('style.load', () => {
            map.current.addLayer({
                id: 'tb-cat-map',
                type: 'custom',
                renderingMode: '3d',
                onAdd: function () {
                    // loads from /public after webpack bundles it
                    gltfLoader.load('/models/necklace_test.glb',
                        (gltf) => {
                            const gltfAsObj = TBWrapper.Object3D({ obj: gltf.scene });
                            gltfAsObj.set( { coords: [13.63527, 45.95533],
                                             scale: 1000
                                            });
                            TBWrapper.add(gltfAsObj);
                        }
                    );
                },
                    
                render: function () {
                    TBWrapper.update();
                }

                // TODO: when exiting this page -> dispose()?
            });
        });

    }, []);
    

    // TODO isLoading??
    // TODO don't forget resize callback (see Map.js)??
    // return a mapContainer div -> has map -> has Threebox wrapper around the other setup
    // AKA in human language: a display of the necessary background and objects (map, here: cat, anything else ??)
    return (
        <>  
            <div className='h-full w-full flex flex-col' > 
                <div ref={mapContainer} className='flex-1' />
            </div>
        </>
    );
}

export default CatStory;