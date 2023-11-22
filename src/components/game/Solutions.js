import React from "react";
import MC from "./solutions/MC";

function Solutions({element, data, elementId, sessionId }) {
    return <>
        {data.mc && <MC element={element} data={data} elementId={elementId} sessionId={sessionId}/>}
    </>
}

export default Solutions;