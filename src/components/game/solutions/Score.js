import React, {useContext, useEffect, useState} from "react";
import SettingsContext from "../../../services/SettingsContext";
import { getSessionInfo } from "../../../services/totoSessionService"
import { AiOutlineLoading } from "react-icons/ai";

function Score({sessionId, elementid}) {
    const [settings] = useContext(SettingsContext);
    const translations = settings.translations[settings.language];
    const [element, setElement] = useState(null);

    useEffect(() => {
        (async() => {
            const session = await getSessionInfo(sessionId);
            setElement(session?.elements?.find((element) => element?.id === elementid));
        })()
    }, [])

    return <div className="relative border rounded-lg p-4 pt-11 mt-11 flex flex-col">
        {element === null ?
            <div className="w-full h-full flex justify-center items-center">
                <AiOutlineLoading className="animate-spin w-6 h-6" />
            </div>
        :
        <>
            <div className="absolute rounded-full border h-16 w-16 flex justify-center items-center top-[-2rem] bg-white self-center">
                <span className="font-bold text-2xl">{element?.processed?.score}</span>
            </div>
            
            <div className="flex flex-col">
                <span>
                    {
                    translations.SOLUTIONS_SCREEN_SUBMIT_SCORE_TEXT
                        .replace(':task_name', element?.content?.title)
                        .replace(':score', element?.processed?.score)
                    }
                </span>
                <span className="mt-6">
                    {element?.processed?.postDescription}
                </span>
            </div>
        </>
        }
    </div>
}

export default Score;