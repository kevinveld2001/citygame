import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { MdArrowBackIos } from "react-icons/md";
import { FaSave } from "react-icons/fa";

import { MAX_NOTEPAD_CHARS } from "constants";

function MMNotepad({ markdown }) {
    const { elementId, sessionId } = useParams();

    function saveUserNotes() {
        // seems to be sanitized automatically by React
        window.localStorage.setItem("mm_notes", document.getElementById("freenotes").value);
    }

    useEffect(() => {
        document.getElementById("freenotes").value = window.localStorage.getItem("mm_notes");
    }, []);

    return (
        <>
            {/* if someone can make this positioning CSS less hardcoded (and awful), please do it */}
                <div className="absolute inset-0 w-full h-full" style={{backgroundImage:"url(/MurderMystery/MM_CaseFile_Amelie.png)"}}>
                    {/* Link drilled in the component (it should be identical to the global back button for every game - the real one is buried below the div and image here) */}
                    <Link to={`/quest/${sessionId}`} className={`absolute flex flex-row items-center m-5 mb-0 pr-10 self-start`} >
                        <MdArrowBackIos />
                        <span>back</span>
                    </Link>
                        
                    <div className="fixed top-[40%] h-[60%] mt-8 inset-x-4">
                        {/* HARDCODED CLUES HERE */}
                        <p>More notes (not)</p>
                        <br />

                        <div className="relative top-[25%] h-[50%]">
                            <label htmlFor="freenotes">Type your notes here:</label>
                            <br />
                            {/* !! maxLength not displayed to the users !! */}
                            <textarea id="freenotes"
                                        className="resize-none w-full h-full"
                                        style={{backgroundColor:"rgba(235,160,160,0.33)"}}
                                        maxLength={MAX_NOTEPAD_CHARS}></textarea>
                        </div>
                    </div>
                </div>

                <button className="absolute top-4 right-24" onClick={ saveUserNotes }>
                    <FaSave className="w-8 h-8" />
                </button>
        </>
    );
}


export default MMNotepad;