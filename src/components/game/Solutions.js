import React, {useState} from "react";
import MC from "./solutions/MC";
import FreeInput from "./solutions/FreeInput";
import Geofence from "./solutions/Geofence";

function Solutions({element, data, elementId, sessionId, updateLinks }) {
    let defaultFinished = "";
    if (element?.processed?.mc) defaultFinished = "MC";
    if (element?.processed?.text) defaultFinished = "TEXT";
    if (element?.processed?.geofence) defaultFinished = "GEOFENCE";
    const [finished, setFinished] = useState(defaultFinished);
    function finish(type) {
        setFinished(type);
        updateLinks();
    }

    return <>
        {data.mc && (finished === "" || finished === "MC") && 
            <MC element={element} data={data} elementId={elementId} sessionId={sessionId} finish={finish} />}

        {data.text && (finished === "" || finished === "TEXT") && 
            <FreeInput element={element} data={data} elementId={elementId} sessionId={sessionId} finish={finish}/>}

        {data.geofence && (finished === "" || finished === "GEOFENCE") && 
            <Geofence element={element} data={data} elementId={elementId} sessionId={sessionId} finish={finish}/>}
    </>
}

export default Solutions;