import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import Solutions from "../Solutions"
import GameLink from "../GameLink";

function DefaultGame({element, elementId, sessionId, update, markdown}) {
    

    return <>
        <div className="prose lg:prose-xl mb-5">
            <ReactMarkdown remarkPlugins={[remarkGfm]} children={markdown}/>
        </div>
        <Solutions element={element} data={element.solutions} elementId={elementId} sessionId={sessionId} update={update} />
        <GameLink sessionId={sessionId} elId={elementId}/>
    </>
}

export default DefaultGame;