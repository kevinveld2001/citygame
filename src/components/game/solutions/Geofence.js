import React, {useContext, useState} from "react";
import SettingsContext from "../../../services/SettingsContext";
import { AiOutlineLoading } from "react-icons/ai";
import { taskSolveGeofence } from "../../../services/totoSessionService";
import Score from "./Score";

// MANUAL geofence solution field. We might not use/need this.
function Geofence({element, data, elementId, sessionId, finish }) {
    const [settings] = useContext(SettingsContext);
    const translations = settings.translations[settings.language];
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(
        element?.processed?.geofence 
        ? element?.content?.successMessage ?? translations.SOLUTIONS_SCREEN_SUBMIT_SUCCESS  
        : ""
    );

    async function submit() {
        setError("");
        setLoading(true);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const res = await taskSolveGeofence(sessionId, elementId, position.coords.latitude, position.coords.longitude);
                if (!res) {
                    setError(element?.content?.errorMessage ?? translations.SOLUTIONS_SCREEN_SUBMIT_GENERAL_ERROR);
                    setLoading(false);
                    return;
                }
                setSuccess(element?.content?.successMessage ?? translations.SOLUTIONS_SCREEN_SUBMIT_SUCCESS);
                setLoading(false);
                finish("GEOFENCE");
            },
            async (error) => {
                // error message below assumes error code 1 (PERMISSION_DENIED), AKA user fault
                setError(translations.SOLUTIONS_SCREEN_SUBMIT_GEOFENCE_NOPERM);
                setLoading(false);
            });
    }

    return <div className="flex flex-col">
        {error && <div className="bg-red-300 border border-red-600 text-red-600 rounded p-3 mt-3">
            {error}
        </div>}
        {success && <div className="bg-green-300 border border-green-600 text-green-600 rounded p-3">
            {success}
        </div>}

        
        {!success && <>
            <p className="mt-3 font-bold">{translations.SOLUTIONS_GEOFENCE_BUTTON_EXPLANATION}</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl mt-3 flex items-center justify-center" 
                onClick={submit}> 
                {loading ? <AiOutlineLoading className="animate-spin w-6 h-6"/> : translations.SOLUTIONS_SCREEN_SUBMIT_BUTTON}
            </button>
        </>
            }
        {success && <Score elementid={element.id} sessionId={sessionId} />}
    </div>
}


export default Geofence;