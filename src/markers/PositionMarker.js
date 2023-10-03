import React, { useState } from "react";

function PositionMarker({setUserPosition}) {
    useState(() => {
        if (!navigator.geolocation) return;
        
        
            //watch position
        navigator.geolocation.watchPosition((position) => {
            setUserPosition({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
        });
        
    }, [setUserPosition]);

    return (
        <div className="w-4 h-4 flex items-center justify-center">
            <div className="bg-blue-600 w-2 h-2 rounded-full absolute z-10" />
            <div className="animate-ping bg-blue-300 w-4 h-4 rounded-full absolute opacity-75" />
        </div>
    )
}

export default PositionMarker;