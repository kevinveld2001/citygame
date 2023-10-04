import React from "react";
import { FaSearchLocation } from "react-icons/fa";

function EnableLocation({ showEnableLocationButton = false }) {
    return (
        <div className='h-full w-full p-12 flex justify-center items-center' > 
            <div className="flex flex-col items-center gap-7">
                <FaSearchLocation className="w-52 h-52" />
                <h1 className="text-2xl font-bold">Enable GPS location</h1>
                <p className="text-center text-gray-500">
                    To play the game, you need to enable GPS location on your device. This will allow us to show you the map and your position on it. Your location will only be used while using the game.
                </p>
                {showEnableLocationButton 
                ? (
                    <button className="bg-blue-600 py-3 px-7 rounded text-white cursor-pointer"
                        onClick={() => { navigator.geolocation.getCurrentPosition(() => {}); }}>
                        Enable GPS location
                    </button>
                ) 
                : (
                    <p className="text-center text-gray-500">Go to the site settings in your browser to enable GPS location.</p>
                )}
            </div>
        </div>
    );
}

export default EnableLocation;