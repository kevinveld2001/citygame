import React, { useEffect, useState } from 'react'
import SkeletonLoader from "./SkeletonLoader";
import ReactMarkdown from "react-markdown";
import { acknowledge, getSessionInfo } from "../../services/totoSessionService";
import remarkGfm from 'remark-gfm'
import Solutions from './Solutions';
import GameLink from "./GameLink";


function Game({ elementId, sessionId }) {
    const [showSkeletonLoader, setShowSkeletonLoader] = useState(true);
    const [error, setError] = useState(false);
    const [markdown, setMarkdown] = useState("");
    const [element, setElement] = useState(null);
    const [updateKey, setUpdateKey] = useState(Math.random());

    const [customGame, setCustomGame] = useState("");

    useEffect(() => {
        setError(false);
        setShowSkeletonLoader(true);
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
                setShowSkeletonLoader(false);
            }
        };

        getMarkdown();

        const checkForCustomGame = element?.content?.description.match(/{customgame:(.+)}/); // TODO: move? what is the correct place?
        if (checkForCustomGame) {
            switch (checkForCustomGame[1].toLowerCase()) {  // [1] contains the RegEx pattern from above if it was found
                case "{customgame:catstory}":
                    break;
                /*TODO the other custom games*/
                default:
                    setError(true);
                    console.error("Non-existent 'customgame' declaration in Toto CMS description of: " + checkForCustomGame[1].toLowerCase());
            }
        }
        else {
            // treat game as not custom, i.e. in the style of a vanilla Toto Element page
        }
    }, [elementId, sessionId]);

    function updateLinks() {
        setUpdateKey(Math.random());
    }

    // TODO: export the functional part of this return (after error) to components??
    // <Solutions>: the input fields present from Toto for completing a Task Element
    // <GameLink>: the "Next elements" present from Toto showing what next Elements can be accessed when this Element is completed
    return (<div>
        {showSkeletonLoader && <SkeletonLoader />}

        {error && <div className="m-5 h-full bg-red-400 border border-red-700 rounded-xl">
            <span>The game was not able to load.</span>
        </div>}

        {!showSkeletonLoader && !error && <div className="flex flex-col justify-between p-10 h-full">
            <div className="prose lg:prose-xl mb-5">
                <ReactMarkdown remarkPlugins={[remarkGfm]} children={markdown}/>
            </div>

            <Solutions element={element} data={element.solutions} elementId={elementId} sessionId={sessionId} updateLinks={updateLinks} />
            <GameLink key={updateKey} sessionId={sessionId} elId={elementId}/>
        </div>}
    </div>)
}

export default Game;