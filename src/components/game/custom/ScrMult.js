import { useEffect, useState } from "react";
import { getSessionInfo, processManualTrigger } from "../../../services/totoSessionService";
import { useParams } from "react-router-dom";

import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

function ScrMult( {element, session, sessionId, elementId, markdown, update} ) {
    
    const [dynamicElements, setDynamicElements] = useState([]);

    useEffect(() => {
        setDynamicElements(session.elements.filter(element => element.t === "Dynamic"));
    }, []);

    function processScreenButton(sessionId, elementUuid) {
        processManualTrigger(sessionId, elementUuid);
    }

    return (<div>
        <div className="prose lg:prose-xl mb-5">
            <ReactMarkdown remarkPlugins={[remarkGfm]} children={markdown}/>
        </div>

        <div className="flex flex-col justify-between p-10 h-full">
            {dynamicElements.map( (element) =>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl mt-3 flex items-center justify-center"
                        key={element.id}
                        onClick={ () => { processScreenButton(sessionId, element.id); } } >
                            Screen {element.elementId}
                </button>)
            }
        </div>

        
    </div>);
}


export default ScrMult;