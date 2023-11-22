import React, {useContext, useState} from "react";
import SettingsContext from "../../../services/SettingsContext";
import { AiOutlineLoading } from "react-icons/ai";
import { taskSolveMC } from "../../../services/totoSessionService";
import Score from "./Score";

function MC({element, data, elementId, sessionId }) {
    const [settings] = useContext(SettingsContext);
    const translations = settings.translations[settings.language];
    const [selected, setSelected] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(
        element?.processed?.mc 
        ? element?.content?.successMessage ?? translations.SOLUTIONS_SCREEN_SUBMIT_SUCCESS  
        : ""
    );

    async function submit() {
        setError("");
        setLoading(true);
        if (selected === "") {
            setError(translations.SOLUTIONS_SCREEN_SUBMIT_SELECT_ERROR);
            setLoading(false);
            return;
        }
        const res = await taskSolveMC(sessionId, elementId, selected);
        if (!res) {
            setError(element?.content?.errorMessage ?? translations.SOLUTIONS_SCREEN_SUBMIT_GENERAL_ERROR);
            setLoading(false);
            return;
        }
        setSuccess(element?.content?.successMessage ?? translations.SOLUTIONS_SCREEN_SUBMIT_SUCCESS);
        setLoading(false);
    }

    return <div className="flex flex-col">
        {error && <div className="bg-red-300 border border-red-600 text-red-600 rounded p-3">
            {error}
        </div>}
        {success && <div className="bg-green-300 border border-green-600 text-green-600 rounded p-3">
            {success}
        </div>}
        <div className="flex flex-col border rounded-lg mt-3"> 
            {data.mc.map((title) => <button key={title} className={`p-4 text-left first:rounded-t-lg last:rounded-b-lg [&:not(:first-child)]:border-t ${title === selected ? "bg-blue-100" : ""}`} 
                onClick={() => {setSelected(title)}} >
                <span>{title}</span>
            </button>)}
        </div>

        {!success &&
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl mt-3 flex items-center justify-center" 
                onClick={submit}> 
                {loading ? <AiOutlineLoading className="animate-spin w-6 h-6"/> : translations.SOLUTIONS_SCREEN_SUBMIT_BUTTON}
            </button>
        }
        {success && <Score element={element} />}
    </div>
}


export default MC;