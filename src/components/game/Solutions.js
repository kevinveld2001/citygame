import React from "react";
import MC from "./solutions/MC";

function Solutions({element, data, elementId, sessionId, updateLinks }) {
    return <>
        {data.mc && <MC element={element} data={data} elementId={elementId} sessionId={sessionId} updateLinks={updateLinks} />}
    </>
}

export default Solutions;