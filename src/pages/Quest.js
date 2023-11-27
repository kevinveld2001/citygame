import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSessionInfo } from "../services/totoSessionService";
import { MdArrowBackIos } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'


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
        <div className="flex flex-row justify-between items-center px-4">
            <Link to="/quest/list" className="w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center">
                <MdArrowBackIos className="pl-[4px] w-5 h-5"/>
            </Link>
            <h1 className="text-center text-2xl font-bold ">QuestScreen</h1>
            <div />
        </div>
        <div className="px-6 flex flex-col">
            <div className="flex flex-row gap-3 my-6">
                <div className="relative w-24 h-24 ">
                    <div className="bg-gray-300 animate-pulse w-full h-full absolute"/>
                    <div className={`absolute z-10 bg-[url('https://api.toto.io/v2/pub/file/${session?.story?.content?.logo}?v=s')] w-full h-full bg-cover`} />
                    {session?.session?.finishedAt && 
                        <div className="absolute z-20 w-full h-full bg-black opacity-40 flex justify-center items-center">
                            <FaCheck className="text-white w-12 h-12"/>
                        </div>
                    }
                </div>
                <div className="flex-1">
                    <h1 className="text-xl font-bold text-black">
                        {session?.story?.content?.title}
                    </h1>
                    <ReactMarkdown className={"text-gray-800"} remarkPlugins={[remarkGfm]} children={session?.story?.content?.description}/>
                </div>
            </div>

            <button className="bg-blue-500 py-3 mb-3 text-white">
                Continue quest
            </button>

            {session && session?.elements.map((element, index) => 
            <Link key={element?.id} to={`/game/${id}/${element?.id}`} className='text-blue-500 my-2 flex flex-row items-center gap-4'>
                <div className="w-10 h-10 bg-slate-200"> 
                    {element?.processed && <div className="w-full h-full bg-blue-500 flex justify-center items-center">
                        <FaCheck className="text-white w-6 h-6"/>
                    </div>}
                </div>
                <span className="text-xl">{element?.content?.title}</span>
            </Link>
            )}
        </div>
    </div>)
}

export default QuestScreen;