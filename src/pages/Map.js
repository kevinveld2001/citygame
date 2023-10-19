import React, {useRef, useEffect, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Markers from '../components/markers/Markers';
import GameMarker from '../components/markers/GameMarker';
import Sheet from 'react-modal-sheet'
import GameSheet from '../components/game/GameSheet';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

function Map() {
    const [mapActive, setMapActive] = useState(false); 
    const [sheetInfo, setSheetInfo] = useState({ open: false, isOpen: false , lat: null, lng: null }); 
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
        setMapActive(true);

        window.addEventListener("resize", () => {
            map.current.resize();
        });
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
                <GameMarker onClick={() => {setSheetInfo( info => ({...info, open: true, lat:45.9299, lng:13.6187}) )}} lat={45.9299} lng={13.6187} />
            </Markers>
        )}
    </div>
  )
}

export default Map