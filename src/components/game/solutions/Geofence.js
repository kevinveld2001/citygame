import React, {useEffect, useContext, useState} from "react";
import SettingsContext from "../../../services/SettingsContext";
import { AiOutlineLoading } from "react-icons/ai";
import { taskSolveGeofence } from "../../../services/totoSessionService";
import Score from "./Score";

// MANUAL geofence solution field. We might not use/need this.
// reminder to self: copy is from MC.js
function Geofence({element, data, elementId, sessionId, finish }) {
    const [settings] = useContext(SettingsContext);
    const translations = settings.translations[settings.language];
    const [unavailable, setUnavailable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(
        element?.processed?.geofence 
        ? element?.content?.successMessage ?? translations.SOLUTIONS_SCREEN_SUBMIT_SUCCESS  
        : ""
    );

    const [location, setLocation] = useState({});
    let watchIdentifier;

    useEffect(() => {
        watchIfLocationAvailable();

        return () => {
            if (watchIdentifier) clearLocationWatchIfAvailable(watchIdentifier);
        };
    }, []);

    async function watchIfLocationAvailable() {
        const allowedLocation = await navigator.permissions.query({ name: "geolocation" });
        console.log(allowedLocation.state);
        if (allowedLocation.state === "granted") {
            watchIdentifier = navigator.geolocation.watchPosition((position) => {
                console.log(position);
                setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
            });
            setUnavailable(false);
        }
        else {
            setUnavailable(true);
        }
    }

    function clearLocationWatchIfAvailable(watchId) {
        navigator.geolocation.clearWatch(watchId);
    }

    async function submit() {
        setError("");
        setLoading(true);

        const res = await taskSolveGeofence(sessionId, elementId, location.lat, location.lon);
        if (!res) {
            setError(element?.content?.errorMessage ?? translations.SOLUTIONS_SCREEN_SUBMIT_GENERAL_ERROR);
            setLoading(false);
            return;
        }
        setSuccess(element?.content?.successMessage ?? translations.SOLUTIONS_SCREEN_SUBMIT_SUCCESS);
        setLoading(false);
        finish("GEOFENCE");
    }

    return <div className="flex flex-col">
        {error && <div className="bg-red-300 border border-red-600 text-red-600 rounded p-3">
            {error}
        </div>}
        {success && <div className="bg-green-300 border border-green-600 text-green-600 rounded p-3">
            {success}
        </div>}

        <p>Geofence button - only available if you granted location permissions.</p>
        {!success && unavailable && <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded-xl mt-3 flex items-center justify-center" >
                Unavailable
            </button>}
        {!success && !unavailable && <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl mt-3 flex items-center justify-center" 
                onClick={submit}> 
                {loading ? <AiOutlineLoading className="animate-spin w-6 h-6"/> : translations.SOLUTIONS_SCREEN_SUBMIT_BUTTON}
            </button>}
        {success && <Score elementid={element.id} sessionId={sessionId} />}
    </div>
}


export default Geofence;