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


import React, {useRef, useEffect} from 'react';
import { initMapboxMap, initThreeboxOnMap, loadGLTFObject } from '../../services/3dmap/3DUtils';


function CatStory() {
    const mapContainer = useRef(null);  // the ref from <div> doesn't get passed outside of the useEffect, i.e. container would be null
    const map = useRef(null);

    useEffect( () => {
        if (map.current) return;

        // -- map options setup - initMapboxMap leaves each implementing map/page to set those itself:
        // type: LngLatLike - REVERSE of the usual (lat, long) pairing, apparently a GeoJSON thing
        const startPosition = [13.63506, 45.95483];   // current start position = near NG train station; TODO un-hardcode the starting position
        const boundSize = 0.05;
        const bounds = [
            [startPosition[0] - boundSize, startPosition[1] - boundSize],
            [startPosition[0] + boundSize, startPosition[1] + boundSize]
        ];
        map.current = initMapboxMap({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/outdoors-v12',
            center: startPosition,
            zoom: 45,
            pitch: 75, 
            maxBounds: bounds
        });
    
        
        map.current.on('style.load', () => {
            const tb = initThreeboxOnMap("tb-cat-map", map.current);
            let theObj;

            //loadGLTFObject(tb, '/models/necklace_test.glb', );
            tb.loadObj({
                    obj: '/models/necklace_test.glb',
                    type: 'gltf',
                    units: 'meters',
                    rotation: { x: 90, y: 0, z: 0 },
                    scale: 1000
                },
                (loadedObj) => {
                    loadedObj.setCoords([13.63527, 45.95533]);

                    theObj = loadedObj;
                    tb.add(loadedObj);
                    //console.log("inner " + theObj);
                },
            );
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