import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import Solutions from './Solutions';
import GameLink from './GameLink';

function DefaultTotoGame({ updateKey, element, data, elementId, sessionId, markdown, updateLinks }) {
    
    // <Solutions>: the input fields present from Toto for completing a Task Element
    // <GameLink>: the "Next elements" present from Toto showing what next Elements can be accessed when this Element is completed
    // params: too many!
    return (
        <div className="flex flex-col justify-between p-10 h-full">
            <div className="prose lg:prose-xl mb-5">
                <ReactMarkdown remarkPlugins={[remarkGfm]} children={markdown}/>
            </div>

            <Solutions element={element} data={data} elementId={elementId} sessionId={sessionId} updateLinks={updateLinks} />
            <GameLink key={updateKey} sessionId={sessionId} elId={elementId}/>
        </div>
    )
}


export default DefaultTotoGame;