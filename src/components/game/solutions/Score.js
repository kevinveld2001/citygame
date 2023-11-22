import React, {useContext} from "react";
import SettingsContext from "../../../services/SettingsContext";

function Score({ element }) {
    const [settings] = useContext(SettingsContext);
    const translations = settings.translations[settings.language];

    return <div className="relative border rounded-lg p-4 pt-11 mt-11 flex flex-col">
        <div className="absolute rounded-full border h-16 w-16 flex justify-center items-center top-[-2rem] bg-white self-center">
            <span className="font-bold text-2xl">{element?.processed?.score}</span>
        </div>
        <div>
            <span>
                {
                translations.SOLUTIONS_SCREEN_SUBMIT_SCORE_TEXT
                    .replace(':task_name', element?.content?.title)
                    .replace(':score', element?.processed?.score)
                }
            </span>
            
        </div>
    </div>
}

export default Score;