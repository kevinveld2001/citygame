import React, { useEffect, useState } from 'react'
import { CUSTOM_GAME_REGEX } from '../../constants';
import SkeletonLoader from "./SkeletonLoader";
import { acknowledge, getSessionInfo } from "../../services/totoSessionService";
import CustomGamesMap from "./CustomGamesMap";


function Game({ elementId, sessionId }) {
    const [showSkeletonLoader, setShowSkeletonLoader] = useState(true);
    const [updateKey, setUpdateKey] = useState(Math.random());
    const [error, setError] = useState(false);
    const [markdown, setMarkdown] = useState("");
    const [element, setElement] = useState(null);
    const [session, setSession] = useState(null);

    const [customGame, setCustomGame] = useState("default");
    const CustomGame = CustomGamesMap.get(customGame);

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

                const elementCustomGame = element?.content?.description?.match(CUSTOM_GAME_REGEX);
                if (elementCustomGame && CustomGamesMap.has(elementCustomGame[1])) {
                    setCustomGame(elementCustomGame[1]);
                }
                const storyCustomGame = sessionInfo?.story?.content?.description?.match(CUSTOM_GAME_REGEX);
                if (storyCustomGame && CustomGamesMap.has(storyCustomGame[1])) {
                    setCustomGame(storyCustomGame[1]);
                }


                setMarkdown(element?.content?.description.replace(CUSTOM_GAME_REGEX, ""));
                setElement(element);
                setSession(sessionInfo);
                setShowSkeletonLoader(false);
            }
        };

        getMarkdown();
    }, [elementId, sessionId, updateKey]);



    function update() {
        setUpdateKey(Math.random());
    }

    return (<div>
        {showSkeletonLoader && <SkeletonLoader />}

        {error && <div className="m-5 h-full bg-red-400 border border-red-700 rounded-xl">
            <span>The game was not able to load.</span>
        </div>}

        {!showSkeletonLoader && !error && <div className="flex flex-col justify-between p-10 h-full">
            <CustomGame element={element} session={session} sessionId={sessionId} elementId={elementId} markdown={markdown} update={update}/>
        </div>}
    </div>)
}

export default Game;