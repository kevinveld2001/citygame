import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { getSessionInfo } from "../../services/totoSessionService";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

function QuestListItem({sessionId}) {
    const [isLoading, setIsLoading] = useState(true);
    const [quest, setQuest] = useState(null);

    useEffect(() => {
        async function getQuest() {
            const quest = await getSessionInfo(sessionId);
            setQuest(quest);
            setIsLoading(false);
        }
        getQuest();
    }, []);

    return (<Link to={`/quest/${sessionId}`} className={`text-blue-500 flex flex-row bg-gray-50 p-5 gap-5 ${isLoading ? "bg-gray-100 animate-pulse" : ""}`}>
        <div className="relative w-24 h-24 ">
            <div className="bg-gray-300 animate-pulse w-full h-full absolute"/>
            <div className={`absolute z-10 bg-[url('https://api.toto.io/v2/pub/file/${quest?.story?.content?.logo}?v=s')] w-full h-full bg-cover`} />
        </div>
        <div className="flex-1">
            <h1 className="text-xl font-bold text-black">
                {quest?.story?.content?.title}
            </h1>
            <ReactMarkdown className={"text-gray-800"} remarkPlugins={[remarkGfm]} children={quest?.story?.content?.description}/>
        </div>
    </Link>);
}

export default QuestListItem;