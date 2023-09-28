import React, {useEffect, useState} from "react";
import { renderToString } from 'react-dom/server';
import { Marker } from "mapbox-gl";


function Markers({ children, map }) {
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        if (map == null) return;

        markers.forEach((marker) => {
            marker.remove();
        });
        setMarkers([]);
        React.Children.toArray(children).forEach((child) => {
            const customMarker = document.createElement('div');
            customMarker.innerHTML = renderToString(child);

            const marker = new Marker({
                anchor: "bottom",
                element: customMarker,
            })
            .setLngLat({
                lng: child.props.lng,
                lat: child.props.lat
            });
            marker.addTo(map);

            setMarkers((markers) => [...markers, marker]);
        });
    }, [children, map]);

    React.Children.toArray(children).forEach((child) => {

    });

    return (
        <></>
    )
}

export default Markers;