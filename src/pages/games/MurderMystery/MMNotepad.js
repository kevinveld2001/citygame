import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { FaSave } from "react-icons/fa";

import { MAX_NOTEPAD_CHARS, TOTO_VAR_MMYSTERY_IDS } from "constants";
import { getSessionInfo } from "services/totoSessionService";

function MMNotepad({ markdown }) {
    const [predefinedNotes, setPredefinedNotes] = useState([]);
    const [predefinedNoteIndex, setPredefinedNoteIndex] = useState(0);

    const { elementId, sessionId } = useParams();

    function savePredefinedNotes() {
        // better?: store in Toto variable instead (we do not have the permissions to do that)
        window.localStorage.setItem("mm_notes_predefined", predefinedNotes);
    }

    function saveUserNotes() {
        // seems to be sanitized automatically by React
        window.localStorage.setItem("mm_notes_user", document.getElementById("freenotes").value);
    }

    async function setPredefinedNotesFromIds() {
        const sessionInfo = await getSessionInfo(sessionId);
        // the variable name is hardcoded here because there exists no more reasonable way to locate the info storage for this code
        const notesIds = sessionInfo.variables.find(variable => variable.name === TOTO_VAR_MMYSTERY_IDS);
        if (!notesIds) return;  // silent return - bad for error handling, but necessary to handle not having any notes yet
        const notesIdsArray = notesIds.value.split(",");

        const updatedNotes = new Array();
        // -1 because if every trigger in Toto follows the same generic pattern of 'var = var + "id,"', there will be an excess element caused by the last comma.
        // as an alternative to this, check for each element if it is an empty string instead.
        for (let i = 0; i < notesIdsArray.length - 1; i++) {
            const noteText = sessionInfo.elements.find(element => element.elementId === notesIdsArray[i]).processed.postDescription;
            console.log(updatedNotes);
            updatedNotes.push(noteText);
        }
        setPredefinedNotes(updatedNotes);
    }

    useEffect(() => {
        setPredefinedNotesFromIds();

        document.getElementById("freenotes").value = window.localStorage.getItem("mm_notes_user");
    }, []);

    useEffect(() => {
        savePredefinedNotes();
    }, [predefinedNotes]);

    return (
        <>
            {/* if someone can make this positioning CSS less hardcoded (and awful), please do it */}
                <div className="absolute inset-0 w-full h-full" style={{backgroundImage:"url(/MurderMystery/MM_CaseFile_Amelie.png)", backgroundSize:"cover", backgroundPosition:"top"}}>
                    {/* Link drilled in the component (it should be identical to the global back button for every game - the real one is buried below the div and image here) */}
                    <Link to={`/quest/${sessionId}`} className={`absolute flex flex-row items-center m-5 mb-0 pr-10 self-start`} >
                        <MdArrowBackIos />
                        <span>back</span>
                    </Link>
                        
                    <div className="fixed top-[40%] h-[60%] mt-8 inset-x-4">
                        <div className="relative h-[40%]">
                            <p>Found notes:</p>
                            <br />
                            <div className="flex">
                                {predefinedNotes && predefinedNotes.length > 0 ? <>
                                    <button className="" onClick={ () =>
                                        setPredefinedNoteIndex(predefinedNoteIndex === 0 ? predefinedNotes.length - 1 : predefinedNoteIndex - 1) }>
                                        <MdArrowBackIos className="w-8 h-8" />
                                    </button>
                                    <p id="foundnotes" className="basis-[80%]">{predefinedNotes.length > 0 ? predefinedNotes[predefinedNoteIndex] : ""}</p>
                                    <button className="" onClick={ () =>
                                        setPredefinedNoteIndex(predefinedNoteIndex === predefinedNotes.length - 1 ? 0 : predefinedNoteIndex + 1) }>
                                        <MdArrowForwardIos className="w-8 h-8" />
                                    </button>
                                </>
                                :
                                <p className="justify-center self-center">No notes</p>
                                }
                            </div>
                        </div>

                        <div className="relative h-[50%]">
                            <label htmlFor="freenotes">Type your notes here:</label>
                            <br />
                            {/* !! maxLength not displayed to the users !! */}
                            <textarea id="freenotes"
                                        className="resize-none w-full h-[80%]"
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