import React, {useContext} from "react";
import SettingsContext from "../../../services/SettingsContext";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import Solutions from "../Solutions"


function LanguageGame({element, session, sessionId, elementId, markdown, update}) {
    const [settings] = useContext(SettingsContext);
    const translations = settings.translations[settings.language];

    const unFinishedSessions = session?.elements.filter(element => !element.processed)
    const navigate = useNavigate();
    
    return <>
        <div className="prose lg:prose-xl mb-5">
            <ReactMarkdown remarkPlugins={[remarkGfm]} children={markdown}/>
        </div>
        <Solutions element={element} data={element.solutions} elementId={elementId} sessionId={sessionId} update={update} />
        {element?.processed && <div className='flex flex-row justify-end'>
            <button className='bg-blue-500 text-white rounded-xl px-4 py-2 mt-3'
            onClick={() => {
                console.log(unFinishedSessions);
                if (unFinishedSessions.length == 0) {
                    navigate(`/quest/${session?.session?.id}`);
                }
                const element = unFinishedSessions[Math.floor(Math.random() * unFinishedSessions.length)];
                navigate(`/game/${session?.session?.id}/${element?.id}`);
            }}>
                {translations.NEXT_BUTTON}
            </button>
        </div>}
    </>
}

export default LanguageGame;