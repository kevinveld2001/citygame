import React, { useEffect, useState } from 'react'
import SkeletonLoader from "./SkeletonLoader";
import ReactMarkdown from "react-markdown";
import { getSessionInfo } from "../../services/totoSessionService";
import remarkGfm from 'remark-gfm'
import Solutions from './Solutions';


function Game({ elementId, sessionId }) {
    const [showSkeletonLoader, setShowSkeletonLoader] = useState(true);
    const [error, setError] = useState(false);
    const [markdown, setMarkdown] = useState("");
    const [element, setElement] = useState(null);

    useEffect(() => {
        (async () => {
            const sessionInfo = await getSessionInfo(sessionId);
            if (sessionInfo === undefined) {
                setError(true);
                setShowSkeletonLoader(false);
            } else {
                const element = sessionInfo.elements.find(element => element.id === elementId);
                setMarkdown(element?.content?.description);
                setElement(element);
                setShowSkeletonLoader(false);
            }
        }) ();
    }, []);


    return (<div>
        {showSkeletonLoader && <SkeletonLoader />}

        {error && <div className="m-5 h-full bg-red-400 border border-red-700 rounded-xl">
            <span>The game was not able to load.</span>
        </div>}

        {!showSkeletonLoader && !error && <div className="flex flex-col justify-between p-10 h-full">
            <div className="prose lg:prose-xl">
                <ReactMarkdown remarkPlugins={[remarkGfm]} children={markdown}/>
            </div>
            <Solutions element={element} data={element.solutions} elementId={elementId} sessionId={sessionId} />
        </div>}
    </div>)
}

export default Game;