import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { getSessionInfo } from "../../services/totoSessionService";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import { FaCheck } from "react-icons/fa6";

function QuestListItem({sessionId, filter}) {
    const [isLoading, setIsLoading] = useState(true);
    const [quest, setQuest] = useState(null);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        async function getQuest() {
            const quest = await getSessionInfo(sessionId);
            setQuest(quest);
            setIsLoading(false);
            setStatus(quest?.session?.finishedAt ? "completed" : "active");
        }
        getQuest();
    }, []);

    return (<>
    {
        (isLoading || (filter === "all" || filter === status)) && 
        <Link to={`/quest/${sessionId}`} className={`text-blue-500 flex flex-row bg-gray-50 p-5 gap-5 ${isLoading ? "bg-gray-100 animate-pulse" : ""}`}>
            <div className="relative w-24 h-24 ">
                <div className="bg-gray-300 animate-pulse w-full h-full absolute"/>
                <div 
                    className={`absolute z-10 w-full h-full bg-cover`} 
                    style={{ backgroundImage: `url('https://api.toto.io/v2/pub/file/${quest?.story?.content?.logo}?v=s')` }}/>
                {quest?.session?.finishedAt && 
                    <div className="absolute z-20 w-full h-full bg-black opacity-40 flex justify-center items-center">
                        <FaCheck className="text-white w-12 h-12"/>
                    </div>
                }
            </div>
            <div className="flex-1">
                <h1 className="text-xl font-bold text-black">
                    {quest?.story?.content?.title}
                </h1>
                <ReactMarkdown className={"text-gray-800"} remarkPlugins={[remarkGfm]} children={quest?.story?.content?.description}/>
            </div>
        </Link>
    }
    </>);
}

export default QuestListItem;