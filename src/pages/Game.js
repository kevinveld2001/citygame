import React from "react";
import {useParams, Link} from "react-router-dom";
import Game from "../components/game/Game";
import { MdArrowBackIos } from "react-icons/md";

function GameScreen() {
    const { elementId, sessionId } = useParams();

    return (<div className="w-full h-full flex flex-col">
        <Link to={`/quest/${sessionId}`} className={`flex flex-row items-center m-5 mb-0 pr-10 self-start`} >
            <MdArrowBackIos />
            <span>back</span>
        </Link>
        <Game elementId={elementId} sessionId={sessionId} />
    </div>)
}

export default GameScreen;