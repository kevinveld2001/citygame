import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { MdArrowBackIos } from "react-icons/md";

function MMNotepad({ markdown }) {
    const { elementId, sessionId } = useParams();

    return (
        <>
                <div className="absolute inset-0 w-full h-full" style={{backgroundImage:"url(/MurderMystery/MM_CaseFile_Isabella.png)"}}>
                    {/* Link drilled in the component (it should be identical to the global back button for every game - the real one is buried below the div and image here) */}
                    <Link to={`/quest/${sessionId}`} className={`absolute flex flex-row items-center m-5 mb-0 pr-10 self-start`} >
                        <MdArrowBackIos />
                        <span>back</span>
                    </Link>
                        
                    {/* HARDCODED CLUES HERE */}

                    <textarea style={{resize: "none", }}>

                    </textarea>
                </div>

            <div className="fixed w-full h-full flex flex-col-reverse inset-0">
                
            </div>

        </>
    );
}


export default MMNotepad;