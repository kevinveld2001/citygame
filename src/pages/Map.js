import React, {useRef, useEffect} from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

function Map() {
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

        window.addEventListener("resize", () => {
            map.current.resize();
        });
    });

  return (
    <div className='h-full w-full overflow-hidden' >
        <div ref={mapContainer} className="h-full w-full" />
    </div>
  )
}

export default Map