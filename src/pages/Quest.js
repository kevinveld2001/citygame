import React, { useEffect, useState, useContext } from "react";
import SettingsContext from "../services/SettingsContext";
import { useParams, Link } from "react-router-dom";
import { getSessionInfo, reinit } from "../services/totoSessionService";
import { MdArrowBackIos } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import { useNavigate } from "react-router-dom";
import {AiOutlineLoading} from "react-icons/ai";


function QuestScreen() {
    const [settings, setSettings] = useContext(SettingsContext);
    const translations = settings?.translations[settings?.language];
    const { id } = useParams();
    const [session, setSession] = useState(null);
    const elements = session?.elements?.filter(element => element?.t !== "Coin");
    const unFinishedSessions = session?.elements.filter(element => !element.processed)
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    async function getSession() {
        const session = await getSessionInfo(id);
        setSession(session);
        setIsLoading(false);
    }

    useEffect(() => {
        getSession();
    }, [id])

    return (<div className="w-full flex flex-col p-3 overflow-y-scroll">
        <div className="flex flex-row justify-between items-center px-4">
            <Link to="/quest/list" className="w-10 h-10 bg-gray-200 rounded-full flex justify-center items-center">
                <MdArrowBackIos className="pl-[4px] w-5 h-5"/>
            </Link>
            <h1 className="text-center text-2xl font-bold ">{translations.QUEST_SCREEN_TITLE}</h1>
            <div />
        </div>
        <div className="px-6 flex flex-col">
            <div className="flex flex-row gap-3 my-6">
                <div className="relative w-24 h-24 ">
                    <div className="bg-gray-300 animate-pulse w-full h-full absolute"/>
                    {!isLoading &&
                        <>
                        <div 
                            style={{ backgroundImage: `url('https://api.toto.io/v2/pub/file/${session?.story?.content?.logo}?v=s')` }}
                            className={`absolute z-10 w-full h-full bg-cover`} />
                        {session?.session?.finishedAt && 
                            <div className="absolute z-20 w-full h-full bg-black opacity-40 flex justify-center items-center">
                            <FaCheck className="text-white w-12 h-12"/>
                            </div>
                        }
                        </>
                    }
                </div>
                <div className="flex-1">
                    <h1 className="text-xl font-bold text-black">
                        {session?.story?.content?.title}
                    </h1>
                    {isLoading ? 
                    <div className="bg-gray-300 h-8 w-full animate-pulse my-2" />
                    :
                    <ReactMarkdown className={"text-gray-800"} remarkPlugins={[remarkGfm]} children={session?.story?.content?.description}/>
                    }
                </div>
            </div>

            {unFinishedSessions?.length > 0 &&
                <button className="bg-blue-500 py-3 mb-3 text-white"
                    onClick={() => {
                        const element = unFinishedSessions[0];
                        navigate(`/game/${id}/${element?.id}`);
                    }}
                >
                    {translations.QUEST_SCREEN_CONTINUE_BUTTON}
                </button>
            }

            {session && !isLoading && elements.map((element, index) => 
            <Link key={element?.id} to={`/game/${id}/${element?.id}`} className='text-blue-500 my-2 flex flex-row items-center gap-4'>
                <div className="w-10 h-10 bg-slate-200"> 
                    {element?.processed && <div className="w-full h-full bg-blue-500 flex justify-center items-center">
                        <FaCheck className="text-white w-6 h-6"/>
                    </div>}
                </div>
                <span className="text-xl">{element?.content?.title}</span>
            </Link>
            )}
            {isLoading &&
                <div className="flex flex-col gap-2">
                    {[1,2,3].map(id =>
                        <div key={id} className="flex flex-row gap-4 animate-pulse">
                            <div className="w-10 h-10 bg-slate-200" />
                            <div className="bg-slate-200 h-10 flex-1" />
                        </div>
                    )}
                </div>
            }

            <button className="border-2 border-red-500 rounded p-2 self-center mt-6 text-red-500"
                onClick={async () => {
                    if (isLoading) return;
                    setIsLoading(true);
                    const oldId = session?.session?.id;
                    const newId = await reinit(id);
                    let sessionids = localStorage.getItem("sessionids");
                    sessionids = sessionids.replace(oldId, newId); 
                    localStorage.setItem("sessionids", sessionids);

                    return navigate(`/quest/${newId}`);
                }}
            >
                {isLoading ? 
                    <AiOutlineLoading className="animate-spin w-6 h-6" /> : 
                    <>{translations.QUEST_SCREEN_RESET_BUTTON}</>
                }
            </button>
        </div>
    </div>)
}

export default QuestScreen;