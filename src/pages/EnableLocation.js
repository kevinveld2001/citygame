import React, {useContext} from "react";
import SettingsContext from "../services/SettingsContext";
import { FaSearchLocation } from "react-icons/fa";

function EnableLocation({ showEnableLocationButton = false }) {
    const [settings, setSettings] = useContext(SettingsContext);
    const translations = settings?.translations[settings?.language];

    return (
        <div className='h-full w-full p-12 flex justify-center items-center' > 
            <div className="flex flex-col items-center gap-7">
                <FaSearchLocation className="w-52 h-52" />
                <h1 className="text-2xl font-bold">{translations.ENABLE_LOCATION_SCREEN_TITLE}</h1>
                <p className="text-center text-gray-500">
                {translations.ENABLE_LOCATION_SCREEN_EXPLANATION}
                </p>
                {showEnableLocationButton 
                ? (
                    <button className="bg-blue-600 py-3 px-7 rounded text-white cursor-pointer"
                        onClick={() => { navigator.geolocation.getCurrentPosition(() => {}); }}>
                        {translations.ENABLE_LOCATION_SCREEN_BUTTON}
                    </button>
                ) 
                : (
                    <p className="text-center text-gray-500">{translations.ENABLE_LOCATION_SCREEN_NO_BUTTON}</p>
                )}
            </div>
        </div>
    );
}

export default EnableLocation;