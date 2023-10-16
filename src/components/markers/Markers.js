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
                anchor: "center",
                element: customMarker,
            })
            .setLngLat({
                lng: child.props.lng,
                lat: child.props.lat
            });
            marker.addTo(map);
            if (child?.props?.onClick !== null) {
                marker.getElement().addEventListener('click', child.props.onClick);
            }

            setMarkers((markers) => [...markers, marker]);
        });
        document.querySelectorAll('[aria-label="Map marker"]').forEach((marker) => {
            marker.removeAttribute("aria-label");
        });
        
        //comment to stop it complaining about markers not being in there
        // eslint-disable-next-line
    }, [children, map]);

    return (
        <></>
    )
}

export default Markers;