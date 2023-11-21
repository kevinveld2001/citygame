import React, { useEffect, useState } from 'react'
import SkeletonLoader from "./SkeletonLoader";
import ReactMarkdown from "react-markdown";
import { acknowledge, getSessionInfo } from "../../services/totoSessionService";
import remarkGfm from 'remark-gfm'
import GameLink from "./GameLink";

function Game({ elementId, sessionId }) {
    const [showSkeletonLoader, setShowSkeletonLoader] = useState(true);
    const [error, setError] = useState(false);
    const [markdown, setMarkdown] = useState("");

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
                setShowSkeletonLoader(false);
            }
        };

        getMarkdown();
    }, [elementId, sessionId]);


    return (<div>
        {showSkeletonLoader && <SkeletonLoader />}

        {error && <div className="m-5 h-full bg-red-400 border border-red-700 rounded-xl">
            <span>The game was not able to load.</span>
        </div>}

        {!showSkeletonLoader && !error && <div className="flex flex-col justify-between p-10 h-full">
            <div className="prose lg:prose-xl mb-5">
                <ReactMarkdown remarkPlugins={[remarkGfm]} children={markdown}/>
            </div>
            <GameLink sessionId={sessionId} elId={elementId}/>
        </div>}
    </div>)
}

export default Game;