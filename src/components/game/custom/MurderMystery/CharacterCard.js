import { useState, useContext } from "react";
import { createPortal } from "react-dom";
import { useParams, Link } from "react-router-dom";

import ReactMarkdown from  "react-markdown";
import remarkGfm from 'remark-gfm'
import { PiNotepadFill } from "react-icons/pi";
import { MdArrowBackIos } from "react-icons/md";
import { FaWindowClose } from "react-icons/fa";
import SettingsContext from "services/SettingsContext";

import MMNotepad from "components/game/custom/MurderMystery/MMNotepad";

function CharacterCard({ markdown }) {
    const [settings] = useContext(SettingsContext);
    const translations = settings.translations[settings.language];

    const { elementId, sessionId } = useParams();

    const [showNotepad, setShowNotepad] = useState(false);

    return (<>
        {!showNotepad && <>
                {/* TODO: Randomize/appropriate backgroundImage per character */}
                <div className="absolute inset-0 w-full h-full" >
                    <img className="absolute top-0 left-0 w-full h-full" src="/MurderMystery/MM_CaseFile_Amelie.png" alt="Case file background with character" />
                    {/* Link drilled in the component (it should be identical to the global back button for every game - the real one is buried below the div and image here) */}
                    <Link to={`/quest/${sessionId}`} className={`absolute flex flex-row items-center m-5 mb-0 pr-10 self-start`} >
                        <MdArrowBackIos />
                        <span>{translations.BACK_BUTTON}</span>
                    </Link>
                        
                    <ReactMarkdown className="relative top-[40%] h-[50%] mt-6 px-4" remarkPlugins={[remarkGfm]} children={markdown}/>

                    <button className="absolute top-4 right-4" onClick={() => { setShowNotepad(true) } }>
                        <PiNotepadFill className="w-8 h-8" />
                    </button>
                </div>
            </>
        }

        {showNotepad && <>
            <MMNotepad markdown={markdown} />
            
            {/* Button to toggle notepad, element being independent from the actual other content. Caveat: Notepad save operations get VERY coupled with this component. */}
            <button className="absolute top-4 right-4" onClick={ () => { setShowNotepad(false) } }>
                <FaWindowClose className="w-8 h-8" />
            </button>
            </>
        }
        
    </>);
}


export default CharacterCard;