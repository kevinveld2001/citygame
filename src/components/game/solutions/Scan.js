import React from "react";
import { Link } from "react-router-dom"
import Score from "./Score";

function ScanButton({finished, element, sessionId}) {
    return (<>
        <Link to={finished ? "" :"/qr"} className={`text-white py-3 rounded-xl text-center mt-3 ${finished ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600"}`}>
            Scan
        </Link>
        {finished && <Score elementid={element.id} sessionId={sessionId} />}
    </>);
} 

export default ScanButton