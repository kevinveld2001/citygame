import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSessionInfo } from "../services/totoSessionService";


function QuestScreen() {
    const { id } = useParams();
    const [session, setSession] = useState(null);

    useEffect(() => {
        (async() => {
            const session = await getSessionInfo(id);
            setSession(session);
        })()
    }, [])

    return (<div className="w-full flex flex-col m-3">
        <h1 className="text-center text-2xl font-bold">QuestScreen</h1>

        {session && session?.elements.map((element, index) => 
        <Link key={index} to={`/game/${id}/${element?.id}`} className='text-blue-500'>
            {element?.id}
        </Link>
        )}

    </div>)
}

export default QuestScreen;