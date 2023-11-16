import React, {useState, useEffect} from "react";
import SkeletonLoader from "./SkeletonLoader";
import ReactMarkdown from "react-markdown";
import { getSessionInfo } from "../../services/totoSessionService";
import remarkGfm from 'remark-gfm'


function GameSheet({ elementId, sessionId }) {
    const [showSkeletonLoader, setShowSkeletonLoader] = useState(true);
    const [markdown, setMarkdown] = useState("");

    useEffect(() => {
        (async () => {
            const sessionInfo = await getSessionInfo(sessionId);
            const element = sessionInfo.elements.find(element => element.id === elementId);
            setMarkdown(element?.content?.description);
            setShowSkeletonLoader(false);
        }) ();
    }, []);

    return <div className='h-[50vh] overflow-y-scroll'>
        {showSkeletonLoader && <SkeletonLoader />}
        {!showSkeletonLoader && <div className="flex flex-col justify-between p-10 h-full">
            <div className="prose lg:prose-xl">
                <ReactMarkdown remarkPlugins={[remarkGfm]} children={markdown}/>
            </div>
        </div>}
    </div>
}

export default GameSheet;