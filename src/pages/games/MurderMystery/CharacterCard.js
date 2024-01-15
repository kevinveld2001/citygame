import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { getSessionInfo } from "services/totoSessionService";
import { useParams } from "react-router-dom";

import ReactMarkdown from  "react-markdown";
import remarkGfm from 'remark-gfm'
import { PiNotepadFill } from "react-icons/pi";

import SkeletonLoader from "components/game/SkeletonLoader";

import MMNotepad from "pages/games/MurderMystery/MMNotepad";

function CharacterCard({ markdown }) {
    const { sessionId } = useParams();

    const [showSkeletonLoader, setShowSkeletonLoader] = useState(true);
    const [error, setError] = useState(false);

    const [showNotepad, setShowNotepad] = useState(false);

    useEffect(() => {
        async function initFromSessionInfo() {
            const sessionInfo = await getSessionInfo(sessionId);
            if (sessionInfo === undefined) {
                setError(true);
                setShowSkeletonLoader(false);
            }
            else {

                setShowSkeletonLoader(false);
            }
        }

        initFromSessionInfo();

    }, []);


    return (<div>
        {showSkeletonLoader && <SkeletonLoader />}

        {error &&
            <div className="m-5 h-full bg-red-400 border border-red-700 rounded-xl">
                <span>The game was not able to load.</span>
            </div>}

        {!showSkeletonLoader && !error && !showNotepad && <>
                <div className="fixed w-full h-full">   {/* TODO: do not load markdown for this game in parent element + align elements below according to background img+back button */}
                    <img className="mx-auto h-1/3" src="/MurderMystery/MM_Image_Isabella_DeLongi.png" alt="Character for a Murder Mystery character card"></img>
                    <ReactMarkdown className="h-2/3 mt-4 px-4" remarkPlugins={[remarkGfm]} children={markdown}/>

                    <button className="absolute top-4 left-4" onClick={() => { setShowNotepad(true) } }>
                        <PiNotepadFill className="w-8 h-8" />
                    </button>
                </div>
            {createPortal(
                <img className="fixed w-full h-full z-[-10]" src="/MurderMystery/MM_CaseFile_Template_Blank.png" alt="Background, blank template for a Murder Mystery character card"></img>,
                document.getElementById("main-container")
            )}
            </>
        }

        {!showSkeletonLoader && !error && showNotepad &&
            <MMNotepad />
        }
        
    </div>);
}


export default CharacterCard;