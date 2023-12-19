import React, {useEffect, useState, useContext} from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { BiSolidError } from "react-icons/bi";
import { getPub } from "../../services/totoPubService";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import { getSessionInfo, sessionInit, taskSolveSecret } from "../../services/totoSessionService";
import { useNavigate } from "react-router-dom";
import SettingsContext from "../../services/SettingsContext"
import { getIdentity } from "../../services/accountService";

function QrResult({qrCode}) {
    const [settings] = useContext(SettingsContext);
    const translations = settings?.translations[settings?.language];
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [voucherData, setVoucherData] = useState(null);
    const [taskData, setTaskData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        //reset state
        setVoucherData(null);
        setTaskData(null);
        setError(null);

        //get qr data
        if (!qrCode || !new RegExp(/\/h\/(.)\/(.+)/).test(qrCode)) {
            setError(translations.QR_CODE_SCAN_ERROR);
            setIsLoading(false);
            return;
        };
        const url = new URL(qrCode);
        if (!url?.pathname) return;
        const [, type, params] = url?.pathname?.match(/\/h\/(.)\/(.+)/);

        (async () => {
            switch (type) {
                case "v":
                    const info = await getPub({voucher: params});
                    const user = await getIdentity();
                    const lang = user?.lang ?? "eng";

                    let title = info?.content?.title.find(entry => entry.lang === lang)?.text;
                    if (!title) {
                        title = info?.content?.title.find(entry => entry.lang === "eng")?.text;
                    }

                    let publicInfo = info?.content?.publicInfo.find(entry => entry.lang === lang)?.text;
                    if (!publicInfo) {
                        publicInfo = info?.content?.publicInfo.find(entry => entry.lang === "eng")?.text;
                    }

                    setVoucherData({
                        title,
                        publicInfo,
                        logo: info?.content?.logo,
                        voucher: params
                    })

                    break;
                case "c":
                    break;
                case "t":
                    const [storyId, elementId, secret] = params.split('/')
                    setTaskData({storyId, elementId, secret})
                    break;
                default:
                    setError(translations.QR_CODE_SCAN_ERROR);
                    break;
            };
            setIsLoading(false);
        }) ();

    }, [qrCode]);

    return <div className="flex justify-center items-center">
        {isLoading ? 
            <AiOutlineLoading className="animate-spin w-6 h-6" /> : 
            <div className="w-full">
                {error && <div className="flex flex-row items-center bg-red-200 text-red-600 border-2 border-red-600 rounded-xl p-3 gap-3"> 
                    <BiSolidError className="h-20 w-20"/>
                    <span>{error}</span>
                </div>}
                {voucherData && <div className="flex flex-col"> 
                    <h1 className="text-2xl font-bold">{voucherData.title}</h1>
                    <ReactMarkdown className={"text-gray-800"} remarkPlugins={[remarkGfm]} children={voucherData.publicInfo}/>
                    <button className="bg-blue-600 px-5 py-3 text-white mt-3"
                        onClick={async () => {
                            let sessionObject = JSON.parse(window.localStorage.getItem('sessionids') ?? '{}');
                            if (sessionObject.hasOwnProperty(voucherData.voucher)) {
                                return navigate(`/quest/${sessionObject[voucherData.voucher]}`);
                            }
                            const session = await sessionInit(voucherData.voucher)
                            const sessionid = session?.session?.id;
                            return navigate(`/quest/${sessionid}`);
                        }}>
                        {translations.QR_CODE_SCAN_START_QUEST_BUTTON}
                    </button>
                </div>}
                {taskData && <div className="flex flex-col">
                    <h1 className="text-2xl font-bold">
                        Finish task
                    </h1>
                    <span className="text-gray-800">
                        This qr-code solves a task for a quest.
                    </span>
                    <button className="bg-blue-600 px-5 py-3 text-white mt-3"
                        onClick={async () => {
                            setTaskData(null);
                            setIsLoading(true);
                            try {
                                const sessionids = JSON.parse(localStorage.getItem("sessionids") ?? {});

                                const quest = await getSessionInfo(sessionids[taskData.storyId]);
                                const questElement = quest?.elements?.find(element => element.elementId == taskData.elementId);

                                await taskSolveSecret({
                                    sessionId: sessionids[taskData.storyId],
                                    elementId: questElement.id,
                                    secret: taskData.secret
                                });

                                return navigate(`/game/${sessionids[taskData.storyId]}/${questElement?.id}`)
                            } catch (e) {
                                setError('You have already scaned this code. Or this part of the game is not unlocked jet.');
                                setIsLoading(false);
                            }
                        }}>
                        Finish task
                    </button>
                </div>}
            </div>
        }
    </div>
}

export default QrResult;