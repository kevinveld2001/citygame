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
            pitch: 80,
            maxPitch: 80,
            minPitch: 80, 
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
        
        // -- LOAD 3D MODELS ON THE MAP
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

            map.current.addSource('route-game-cat-story', {
                "type": "geojson",
                "data": {   // TODO: export to dedicated .geojson file
                    "type": "FeatureCollection",
                    "features": [
                        {   // Ms. Novak's house (gotta start somewhere in case the user doesn't allow location tracking)
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [13.6343074, 45.953702]  // Via Caterina Percoto, 1
                            },
                            "properties": {
                                "title": "Ms. Novak's house",
                                //"marker-symbol": "monument"
                            }
                        },
                        {   // Bus stop (Via Caprin)
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [13.6338457, 45.9553166]
                            },
                            "properties": {
                                "title": "Via Caprin bus stop",
                                //"marker-symbol": "monument"
                            }
                        },
                        {   // Caffe Bordo bar (at the railway building + Europe Square)
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [13.6350897, 45.9553188]
                            },
                            "properties": {
                                "title": "Caffe Bordo",
                                //"marker-symbol": "monument"
                            }
                        },
                    ]
                }
            });
            map.current.addLayer({
                id: "route-game-cat-story",
                type: 'circle',
                source: "route-game-cat-story",
                paint: {
                    'circle-color': '#4264fb',
                    'circle-radius': 3,
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#ffffff'
                }
            });

            // ~~this is absolute butts - need to make util methods out of this(?)
            map.current.addSource('leg1-game-cat-story', {
                "type": "geojson",
                "data": {   // TODO: export to dedicated .geojson file
                    "type": "FeatureCollection",
                    "features": [
                        {   // Leg 1: Between Ms. Novak's house and bus stop (over Kolodvorska pot + Trg Europe?)
                            "type": "Feature",
                            'geometry': {
                                'type': 'LineString',
                                'coordinates': [
                                    [13.6343074, 45.953702],    // house
                                    [13.634572, 45.953769],     // street, directly east of house
                                    [13.635025, 45.955278],     // street, near Trg Europe
                                    [13.634201, 45.955421],     // bus stop
                                ]
                            },
                            "properties": {
                                "title": "Route leg 1"
                            }
                        }
                    ]
                }
            });
            map.current.loadImage("/paw_prints_64.png", (error, image) => {    // !! TODO: use latest approved version from eg. OneDrive, not Discord download
                if (error) throw error;
                map.current.addImage("paw-prints", image);
                map.current.addLayer({
                    id: "leg1-game-cat-story",
                    type: 'symbol',
                    source: "leg1-game-cat-story",
                    layout: {
                        'symbol-placement': "line",
                        'icon-image': ["image", "paw-prints"]  // https://docs.mapbox.com/style-spec/reference/expressions/#types-image
                    }
                });
            });
            

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