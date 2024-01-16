import { useState } from "react";
import { createPortal } from "react-dom";

import ReactMarkdown from  "react-markdown";
import remarkGfm from 'remark-gfm'
import { PiNotepadFill } from "react-icons/pi";

import MMNotepad from "pages/games/MurderMystery/MMNotepad";

function CharacterCard({ markdown }) {
    const [showNotepad, setShowNotepad] = useState(false);

    return (<>
        {!showNotepad && <>
                <div className="fixed w-full h-full" style={{backgroundImage:"url(/MurderMystery/MM_CaseFile_Isabella.png)"}}>   {/* TODO: do not load markdown for this game in parent element + align elements below according to background img+back button */}
                        {/*<img className="mx-auto h-1/3" src="/MurderMystery/MM_Image_Isabella_DeLongi.png" alt="Character for a Murder Mystery character card"></img>*/}
                        <ReactMarkdown className="h-2/3 mt-4 px-4" remarkPlugins={[remarkGfm]} children={markdown}/>

                        <button className="absolute top-4 left-4" onClick={() => { setShowNotepad(true) } }>
                            <PiNotepadFill className="w-8 h-8" />
                        </button>
                </div>
        </>
        }

        {showNotepad &&
            <MMNotepad />
        }
        
    </>);
}


export default CharacterCard;