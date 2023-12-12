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
import { Threebox } from 'threebox-plugin';
import mapboxgl from 'mapbox-gl';


function CatStory() {
    const mapContainer = useRef(null);  // the ref from <div> doesn't get passed outside of the useEffect, i.e. container would be null
    const map = useRef(null);

    useEffect( () => {
        //if (map.current) return;

        // type: LngLatLike - REVERSE of the usual (lat, long) pairing, apparently a GeoJSON thing
        const startPosition = [13.63506, 45.95483] /*[45.95483, 13.63506]*/;   // current start position = near NG train station; TODO un-hardcode the starting position
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
        window.tb = new Threebox(map.current, map.current.getCanvas().getContext('webgl'), { /*preserveDrawingBuffer: false*/ } );
        
        map.current.on('style.load', async () => {
            map.current.addLayer({
                id: "tb-cat-map",
                type: 'custom',
                renderingMode: '3d',
                    
                render: function () { window.tb.update(); }
            });

            //loadGLTFObject(tb, '/models/necklace_test.glb', );
            window.tb.loadObj({
                    obj: '/models/necklace_test.glb',
                    type: 'gltf',
                    units: 'meters',
                    rotation: { x: 90, y: 0, z: 0 },
                    scale: 1000
                },
                (loadedObj) => {
                    loadedObj.setCoords([13.63527, 45.95533] /*[45.95533, 13.63527]*/);

                    window.tb.add(loadedObj);
                },
            );
        });

        return () => {
            map.current.remove();   // useEffect inits map, this cleanup balances it out by removing the map.
                                    // This passes React's Strict Mode without visible errors and also lets Mapbox dispose resources.
                                    // Dangling remains the Threebox instance, but it seems it doesn't want to be dispose()d.
        };

    }, []);
    

    // TODO isLoading??
    return (
        <>  
            <div className='h-full w-full flex flex-col' > 
                <div ref={mapContainer} className='flex-1' />
            </div>
        </>
    );
}

export default CatStory;