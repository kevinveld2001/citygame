// TODO:
// - location-based player movement (mock up with input controls too?)
//  * if tweak parameters are to be added ala Unity Inspector fields, parse a JSON (requires Request if from another file!?)
// - sync narrative with Toto (how??)
// - get locations and quest steps from Toto, report back progress to Toto
//  * QR codes? questions? should have here: a nice blend between "gameplay" map and the method to progress, not switching pages


import React, {useState, useRef, useEffect} from 'react';
import { Threebox } from 'threebox-plugin';
import mapboxgl from 'mapbox-gl';
import * as Utils from "../../services/3dmap/3DUtils";

import { getSessionInfo, taskSolveFreeText } from '../../services/totoSessionService';
import { useNavigate } from 'react-router-dom';


function CatStory({ element, elementId, sessionId }) {
    const [finished, setFinished] = useState(false);

    const mapContainer = useRef(null);  // the ref from <div> doesn't get passed outside of the useEffect, i.e. container would be null
    const map = useRef(null);

    const userPositionWatcher = useRef(null);

    const navigate = useNavigate();

    useEffect( () => {
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
        window.tb = new Threebox(map.current, map.current.getCanvas().getContext('webgl'), { /*preserveDrawingBuffer: false*/enableSelectingObjects: true } );


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

            Utils.addSourceGeoJSON(map.current, "route-game-charles-x", "/dataJSON/CharlesX_Points.geojson");
            Utils.addLayerFeaturePointsAsCircles(map.current, "route-game-charles-x", { 'circle-color': '#4264fb', 'circle-radius': 3, 'circle-stroke-width': 1, 'circle-stroke-color': '#ffffff' });

            Utils.addSourceGeoJSON(map.current, "leg1-game-charles-x", "/dataJSON/CharlesX_Leg1Lines.geojson");
            Utils.addLayerFeaturePointsAsLineRouteWithImage(map.current, "leg1-game-charles-x", "/paw_prints_64.png", "paw-prints", { "symbol-spacing": 25 /*default 250*/ });
            
            // the cat is the win condition (in the original cat story), but displaying it is not proximity based...
            Utils.loadGLTFObject("/models/Cat-6K-Textured.glb", {
                rotation: { x: 90, y: 0, z: 0 },
                scale: 10
            },
                (loadedObj) => {
                    loadedObj.setCoords([13.636667, 45.950278]);

                    // could play animation on select here with:
                    // loadedObj.addEventListener('SelectedChange', () => {loadedObj.playAnimation(loadedObj.animations[0], 1000, 1)} , false);
                    // (check for animations with: )
                    // loadedObj.addEventListener('SelectedChange', () => {console.log(loadedObj.animations);} , false);
                    // this cat model does not have animations

                    // on click IMMEDIATELY finalize task (this could be customized):
                    loadedObj.addEventListener("SelectedChange", async () => {
                        setFinished(true);
                        const res = await taskSolveFreeText(sessionId, elementId, " "); // the actual text doesn't matter, this is a hack
                        console.log(element);
                        if (!res) {
                            console.log(element?.content?.errorMessage ?? "Generic error (this should probably print from 'translations')");
                        }
                        // boot from this gameplay screen and into next element / quest details
                        const session = await getSessionInfo(sessionId);
                        const unFinishedSessions = session?.elements.filter(element => !element.processed);
                        const nextElement = unFinishedSessions[0];
                        if (nextElement) {
                            navigate(`/game/${sessionId}/${nextElement.id}`);
                        }
                        else navigate(`/quest/${sessionId}/`); // back to quest details
                    });
                }
            );

            map.current.jumpTo({center: [13.62038, 45.94922] /* hardcoded, from first point of relevant mission (here: from CharlesX_Points) */ });
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
            {finished && <div>
                Finished (test text).
            </div>}
        </>
    );
}

export default CatStory;