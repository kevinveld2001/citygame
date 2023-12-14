import React, {useContext, useState} from "react";
import SettingsContext from "../../../services/SettingsContext";
import { AiOutlineLoading } from "react-icons/ai";
import { taskSolveFreeText } from "../../../services/totoSessionService";
import Score from "./Score";

function FreeInput({element, data, elementId, sessionId, finish}) {
    const [settings] = useContext(SettingsContext);
    const translations = settings.translations[settings.language];
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(
        element?.processed?.text 
        ? element?.content?.successMessage ?? translations.SOLUTIONS_SCREEN_SUBMIT_SUCCESS  
        : ""
    );
    const [freeInputText, setFreeInputText] = useState(element?.processed?.text ?? "");
    

    async function submit() {
        setError("");
        setLoading(true);
        if (freeInputText === "") {
            setError(translations.SOLUTIONS_SCREEN_SUBMIT_SELECT_ERROR);
            setLoading(false);
            return;
        }
        const res = await taskSolveFreeText(sessionId, elementId, freeInputText);
        if (!res) {
            setError(element?.content?.errorMessage ?? translations.SOLUTIONS_SCREEN_SUBMIT_GENERAL_ERROR);
            setLoading(false);
            return;
        }
        setSuccess(element?.content?.successMessage ?? translations.SOLUTIONS_SCREEN_SUBMIT_SUCCESS);
        setLoading(false);
        finish("TEXT");
    }

    return <div className="flex flex-col mt-3">
        {error && <div className="bg-red-300 border border-red-600 text-red-600 rounded p-3">
            {error}
        </div>}
        {success && <div className="bg-green-300 border border-green-600 text-green-600 rounded p-3">
            {success}
        </div>}
        <input type="text" 
            className={`border rounded-lg px-4 py-2 mt-3 ${success ? "bg-gray-100 cursor-not-allowed" : ""}`} 
            disabled={success !== ""}
            placeholder={translations.SOLUTIONS_SCREEN_INPUT_PLACEHOLDER}
            onChange={(event) => {
                if (success !== "") return;
                setFreeInputText(event.target.value);
            }}
            defaultValue={freeInputText}/>

        {!success &&
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl mt-3 flex items-center justify-center" 
                onClick={submit}> 
                {loading ? <AiOutlineLoading className="animate-spin w-6 h-6"/> : translations.SOLUTIONS_SCREEN_SUBMIT_BUTTON}
            </button>
        }
        {success && <Score elementid={element.id} sessionId={sessionId} />}
    </div>
}

export default FreeInput;