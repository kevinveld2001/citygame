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
import * as Utils from "../../services/3dmap/3DUtils";


function CatStory() {
    const mapContainer = useRef(null);  // the ref from <div> doesn't get passed outside of the useEffect, i.e. container would be null
    const map = useRef(null);

    const userPositionWatcher = useRef(null);

    useEffect( () => {
        //if (map.current) return;


        // -- INIT MAPBOX MAP + THREEBOX FOR THE SCREEN

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
            pitch: 70,
            maxPitch: 70,
            minPitch: 70, 
            maxBounds: bounds
        });
        window.tb = new Threebox(map.current, map.current.getCanvas().getContext('webgl'), { /*preserveDrawingBuffer: false*/ } );

        // -- WATCH USER POSITION IF USER ALLOWS:
        // TODO: test on phone (currently impossible without full legit deployment; proxy isn't liked by providers)
        userPositionWatcher.current = navigator.geolocation.watchPosition(
            async (position) => {
                console.log(position.coords);
                map.current.jumpTo({ center: [position.coords.longitude, position.coords.latitude] });
            },
            async (error) => {
                // error code 1 (PERMISSION_DENIED), AKA user fault
                    // TODO some conditionals if user doesn't allow location, continue with predefined route etc.
                // 2 (POSITION_UNAVAILABLE) or 3 (TIMEOUT) should not be thrown or should not affect the map
                console.error(error);
            });
        
        // -- LOAD ALL MAP ELEMENTS (3d elements, layer of important points, layer of line route between points...)
        map.current.on('style.load', () => {
            Utils.add3DRenderLayer(map.current, "tb-cat-map");

            Utils.loadGLTFObject('/models/necklace_test.glb', {
                    rotation: { x: 90, y: 0, z: 0 },
                    scale: 1000
                },
                (loadedObj) => {
                    loadedObj.setCoords([13.63527, 45.95533] /*[45.95533, 13.63527]*/);
                },
            );

            Utils.addSourceGeoJSON(map.current, "route-game-cat-story", "/dataJSON/CatStory_Points.geojson");
            Utils.addLayerFeaturePointsAsCircles(map.current, "route-game-cat-story", { 'circle-color': '#4264fb', 'circle-radius': 3, 'circle-stroke-width': 1, 'circle-stroke-color': '#ffffff' });

            Utils.addSourceGeoJSON(map.current, "leg1-game-cat-story", "/dataJSON/CatStory_Leg1Lines.geojson");
            Utils.addLayerFeaturePointsAsLineRouteWithImage(map.current, "leg1-game-cat-story", "/paw_prints_64.png", "paw-prints", { "symbol-spacing": 25 /*default 250*/ });
            

            map.current.jumpTo({center: [13.6343074, 45.953702]});
        });

        // -- CLEANUP (ON PAGE LEAVE)
        return () => {
            navigator.geolocation.clearWatch(userPositionWatcher.current);
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