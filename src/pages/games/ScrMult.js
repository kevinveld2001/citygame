import { useEffect, useState } from "react";
import { getSessionInfo, processManualTrigger } from "../../services/totoSessionService";
import { useParams } from "react-router-dom";

import SkeletonLoader from "../../components/game/SkeletonLoader";

function ScrMult() {
    const { sessionId } = useParams();

    const [showSkeletonLoader, setShowSkeletonLoader] = useState(true);
    const [error, setError] = useState(false);

    const [dynamicElements, setDynamicElements] = useState([]);

    useEffect(() => {
        async function getDynamicElements() {
            const sessionInfo = await getSessionInfo(sessionId);
            if (sessionInfo === undefined) {
                setError(true);
                setShowSkeletonLoader(false);
            }
            else {
                setDynamicElements(sessionInfo.elements.filter(element => element.t === "Dynamic"));
                setShowSkeletonLoader(false);
            }
        }

        getDynamicElements();

    }, []);

    function processScreenButton(sessionId, elementUuid) {
        processManualTrigger(sessionId, elementUuid);
    }

    return (<div>
        {showSkeletonLoader && <SkeletonLoader />}

        {error && <div className="m-5 h-full bg-red-400 border border-red-700 rounded-xl">
            <span>The game was not able to load.</span>
        </div>}

        {!showSkeletonLoader && !error &&
            <div className="flex flex-col justify-between p-10 h-full">
                {dynamicElements.map( (element) =>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl mt-3 flex items-center justify-center"
                            key={element.id}
                            onClick={ () => { processScreenButton(sessionId, element.id); console.log(element.id); } } >
                                Screen {element.elementId}
                    </button>)
                }
            {/* not GameLink ?? */}
            {/*<GameLink key={updateKey} sessionId={sessionId} elId={elementId}/>*/}
        </div>}

        
    </div>);
}


export default ScrMult;