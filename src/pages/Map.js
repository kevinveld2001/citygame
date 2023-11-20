import React, {useRef, useEffect, useState, useContext} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Markers from '../components/markers/Markers';
import GameMarker from '../components/markers/GameMarker';
import Sheet from 'react-modal-sheet'
import GameSheet from '../components/game/GameSheet';
import spawnObject from '../services/3dmap/3dObject';
import SettingsContext from '../services/SettingsContext';
import { getSessionInfo } from '../services/totoSessionService';


mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

function Map() {
    const [settings] = useContext(SettingsContext);
    const [mapActive, setMapActive] = useState(false); 
    const [sheetInfo, setSheetInfo] = useState({ open: false, isOpen: false , lat: null, lng: null }); 
    const [gameMarkers, setGameMarkers] = useState([]); 
    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        if (map.current) return;
        const startPosition = [13.6185, 45.9294];
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
            pitch: 20, 
            maxBounds: bounds
        });
        map.current.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true,
                },
                trackUserLocation: true,
                showUserHeading: false,
                showAccuracyCircle: false,
            })
        );
        setMapActive(true);

        window.addEventListener("resize", () => {
            map.current.resize();
        });

        map.current.on('style.load', () => { 
            map.current.addLayer(spawnObject('necklace', './models/necklace_test.glb', [13.6197, 45.9399], 0, [Math.PI / 2, Math.PI / 1.2, 0], 10000));
            map.current.addLayer(spawnObject('test', './models/test2.glb', [13.6187, 45.9399], 0, [Math.PI / 2, Math.PI / 1.8, 0], 1));
        });

        let sessionids = JSON.parse(localStorage.getItem("sessionids") ?? "{}");
        for (const [key, value] of Object.entries(sessionids)) {
            (async() => {
                const session = await getSessionInfo(value);
                if (!session?.session || session?.elements?.length === 0) return;

                for (const element of session?.elements) {
                    if (!element?.location?.gps) continue;
                    setGameMarkers(markers => [...markers, {
                        lng: element?.location?.gps.lon, 
                        lat: element?.location?.gps.lat, 
                        id: element?.id
                    }])
                }
            })();
        }

    }, []);

    useEffect(() => {
        map.current.resize();
        if (!sheetInfo.isOpen) return;

        map.current.flyTo({
            center: [sheetInfo.lng, sheetInfo.lat],
            zoom: 18,
            essential: true
        });

    }, [sheetInfo]);

    useEffect(() => {
        map.current.resize();
    }, [settings.showInstallPrompt]);

  return (
    <div className='h-full w-full flex flex-col' > 
        <div ref={mapContainer} className='flex-1' />
        <div className={`flex-1 hidden bg-red-white ${sheetInfo.isOpen && '!block'}`} />
        <Sheet isOpen={sheetInfo.open} 
            onClose={() => setSheetInfo( info => ({...info, open: false, isOpen: false}) )} 
            onOpenEnd={() => setSheetInfo( info => ({...info, isOpen: true}) )}
            onCloseStart={() => setSheetInfo( info => ({...info, isOpen: false}) )}
            detent='content-height'>
            <Sheet.Container>
                <Sheet.Header />
                <Sheet.Content>
                    <GameSheet />
                </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop />
        </Sheet>
        {mapActive && (
            <Markers map={map.current}>
                {gameMarkers.map((marker, index) => 
                    <GameMarker key={index} onClick={() => {setSheetInfo( info => ({...info, open: true, lat:marker.lat, lng:marker.lng}) )}} lat={marker.lat} lng={marker.lng} />
                )}
            </Markers>
        )}
    </div>
  )
}

export default Map