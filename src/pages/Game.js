import React, {useContext} from "react";
import {useParams, Link} from "react-router-dom";
import Game from "../components/game/Game";
import { MdArrowBackIos } from "react-icons/md";
import SettingsContext from "services/SettingsContext";

function GameScreen() {
    const [settings] = useContext(SettingsContext);
    const translations = settings.translations[settings.language];

    const { elementId, sessionId } = useParams();

    return (<div className="w-full h-full flex flex-col">
        <Link to={`/quest/${sessionId}`} className={`flex flex-row items-center m-5 mb-0 pr-10 self-start`} >
            <MdArrowBackIos />
            <span>{translations.BACK_BUTTON}</span>
        </Link>
        <Game elementId={elementId} sessionId={sessionId} />
    </div>)
}

export default GameScreen;