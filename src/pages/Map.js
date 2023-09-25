import React, {useRef, useEffect} from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWN1dGVjaXR5cHJvamVjdCIsImEiOiJjbG1qNW9ieHkwMGh0MmxwbHZ4OTFrYWN2In0.MjRVtHCcPRcHF6ba4ccdTA';

function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [13.6185, 45.9294],
            zoom: 11,
            pitch: 20, 
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