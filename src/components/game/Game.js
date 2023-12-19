import React, { useEffect, useState } from 'react'
import SkeletonLoader from "./SkeletonLoader";
import { acknowledge, getSessionInfo } from "../../services/totoSessionService";
//import Solutions from './Solutions';
import GameLoadError from "./GameLoadError";

import DefaultTotoGame from './DefaultTotoGame';
import CatStory from '../../pages/games/1_CatStory';


function Game({ elementId, sessionId }) {
    const [showSkeletonLoader, setShowSkeletonLoader] = useState(true);
    const [error, setError] = useState(false);
    const [markdown, setMarkdown] = useState("");
    const [element, setElement] = useState(null);
    const [updateKey, setUpdateKey] = useState(Math.random());

    const [customGame, setCustomGame] = useState(null);

    useEffect(() => {
        setError(false);
        setShowSkeletonLoader(true);

        // TODO: might need to move this to DefaultTotoGame
        async function getMarkdown ()  {
            const sessionInfo = await getSessionInfo(sessionId);
            if (sessionInfo === undefined) {
                setError(true);
                setShowSkeletonLoader(false);
            } else {
                let element = sessionInfo.elements.find(element => element.id === elementId);
                if (element.t === "Info" && !element?.processed) {
                    const acknowledgement = await acknowledge(sessionId, element.id);
                    if (acknowledgement) {
                        element = acknowledgement.updatedElement;
                    }
                }
                setMarkdown(element?.content?.description);
                setElement(element);
                setCustomGame(element?.content?.description.match(/{customgame:(.+)}/));
                setShowSkeletonLoader(false);
            }
        };

        getMarkdown();
            
    }, [elementId, sessionId]);

    function updateLinks() {
        setUpdateKey(Math.random());
    }

    
    if (customGame) {   // after .match(RegEx), customGame is either array (truthy) or null (falsy)
        switch (customGame[1].toLowerCase()) {  // [1] contains only the RegEx pattern from above if it was found
            case "catstory":
                return (
                    <CatStory />
                    // any other components to be added (Solutions in a different format)??
                );
            /*TODO case: the other custom games*/
            default:
                setError(true);
                console.error("Non-existent 'customgame' declaration in Toto CMS description of: " + customGame[1].toLowerCase());
                return <GameLoadError />;
            }
    }
    else {
        return (
            <div>
                {showSkeletonLoader && <SkeletonLoader />}
                {error && <GameLoadError />}

                {!showSkeletonLoader && !error &&
                    <DefaultTotoGame updateKey={updateKey} element={element} data={element.solutions}
                                    elementId={elementId} sessionId={sessionId}
                                    markdown={markdown} updateLinks={updateLinks}/>
                }
            </div>
        )
    }
}

export default Game;