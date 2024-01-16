import { useEffect, useState } from "react";
import { processManualTrigger, getSessionInfo } from "../../../services/totoSessionService";

import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

function ScrMult( {element, session, sessionId, elementId, markdown, update} ) {
    
    const [dynamicElements, setDynamicElements] = useState([]);

    // first, the info element has to be acknowledged and release the dynamic elements
    useEffect(() => {
        async function setDynamicAfterInfoAcknowledge() {
            const sessionAnew = await getSessionInfo(sessionId);

            if (element.t === "Info" && element.processed) {
                setDynamicElements(sessionAnew.elements.filter(element => element.t === "Dynamic"));
            }
            else {
                throw new Error("Dynamic elements are not set correctly - the info element was not yet acknowledged and the session did not yet have information about the dynamic elements at this point in the code!");
            }
        }

        setDynamicAfterInfoAcknowledge();
        
    }, [element]);

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