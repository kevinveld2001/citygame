import React from "react";
import Game from "./Game";


function GameSheet({elementId, sessionId }) {
    return <div className='h-[50vh] overflow-y-scroll'>
        <Game elementId={elementId} sessionId={sessionId} />
    </div>
}

export default GameSheet;