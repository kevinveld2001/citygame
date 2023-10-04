import React, {useRef, useEffect, useState} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Markers from '../components/markers/Markers';
import PositionMarker from '../components/markers/PositionMarker';
import GameMarker from '../components/markers/GameMarker';
import Sheet from 'react-modal-sheet'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

function Map() {
    const [mapActive, setMapActive] = useState(false); 
    const [userPosition, setUserPosition] = useState({lat: 0, lng: 0}); 
    const [isSheetOpen, setIsSheetOpen] = useState(true); 
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

  return (
    <div className='h-full w-full' > 
        <div ref={mapContainer} className='h-full w-full' />
        <Sheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)} detent='content-height'>
            <Sheet.Container>
                <Sheet.Header />
                <Sheet.Content>
                    <div className='h-[50vh]'>

                    </div>
                </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop />
        </Sheet>
        {mapActive && (
            <Markers map={map.current}>
                <GameMarker onClick={() => {setIsSheetOpen(true)}} lat={45.9299} lng={13.6187} />
                <PositionMarker {...userPosition} setUserPosition={setUserPosition} />
            </Markers>
        )}
    </div>
  )
}

export default Map