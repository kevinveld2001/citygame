import React, { useEffect, useState, useContext } from 'react'
import SettingsContext from '../../services/SettingsContext';
import SkeletonLoader from "./SkeletonLoader";
import ReactMarkdown from "react-markdown";
import { acknowledge, getSessionInfo } from "../../services/totoSessionService";
import remarkGfm from 'remark-gfm'
import Solutions from './Solutions';
import GameLink from "./GameLink";
import { useNavigate, useParams } from "react-router-dom";
import ScrMult from '../../pages/games/ScrMult';


function Game({ elementId, sessionId }) {
    const [settings, setSettings] = useContext(SettingsContext);
    const translations = settings?.translations[settings?.language];
    const [showSkeletonLoader, setShowSkeletonLoader] = useState(true);
    const [error, setError] = useState(false);
    const [markdown, setMarkdown] = useState("");
    const [element, setElement] = useState(null);
    const [session, setSession] = useState(null);
    const unFinishedSessions = session?.elements.filter(element => !element.processed)
    const [updateKey, setUpdateKey] = useState(Math.random());
    const navigate = useNavigate();

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
                setSession(sessionInfo);
                setShowSkeletonLoader(false);
            }
        };

        getMarkdown();
    }, [elementId, sessionId, updateKey]);

    function updateLinks() {
        setUpdateKey(Math.random());
    }
    
    // NEEDS FURTHER REFACTORING
    let currentGame;
    // CASE: MEMORY PUZZLE
    if (session.story.content.title === "Memory puzzle with screens") {
        currentGame = <ScrMult />;
    }
    // CASE: LANGUAGE GAME
    else if (session.session.storyId !== "03725d6b-b0af-4a91-883f-6203b2b2f617") {
        currentGame = <>
                <Solutions element={element} data={element.solutions} elementId={elementId} sessionId={sessionId} updateLinks={updateLinks} />
                {element?.processed &&
                    <div className='flex flex-row justify-end'>
                        <button className='bg-blue-500 text-white rounded-xl px-4 py-2 mt-3'
                        onClick={() => {
                            console.log(unFinishedSessions);
                            if (unFinishedSessions.length == 0) {
                                navigate(`/quest/${session?.session?.id}`);
                            }
                            const element = unFinishedSessions[Math.floor(Math.random() * unFinishedSessions.length)];
                            navigate(`/game/${session?.session?.id}/${element?.id}`);
                        }}>
                            {translations.NEXT_BUTTON}
                        </button>
                    </div>
                }
            </>
    }
    // CASE: DEFAULT
    else {
        currentGame = <>
            <Solutions element={element} data={element.solutions} elementId={elementId} sessionId={sessionId} updateLinks={updateLinks} />
            <GameLink key={updateKey} sessionId={sessionId} elId={elementId}/>
        </>
    }
    

    return (<div>
        {showSkeletonLoader && <SkeletonLoader />}

        {error && <div className="m-5 h-full bg-red-400 border border-red-700 rounded-xl">
            <span>The game was not able to load.</span>
        </div>}

        {!showSkeletonLoader && !error && <div className="flex flex-col justify-between p-10 h-full">
            <div className="prose lg:prose-xl mb-5">
                <ReactMarkdown remarkPlugins={[remarkGfm]} children={markdown}/>
            </div>

        {currentGame}
        
        </div>}
    </div>)
}

export default Game;