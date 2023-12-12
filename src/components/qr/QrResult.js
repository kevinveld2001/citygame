import React, {useEffect, useState} from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { BiSolidError } from "react-icons/bi";
import { getPub } from "../../services/totoPubService";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import { sessionInit } from "../../services/totoSessionService";
import { useNavigate } from "react-router-dom";


function QrResult({qrCode}) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [voucherData, setVoucherData] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!qrCode || !new RegExp(/\/h\/(.)\/(.+)/).test(qrCode)) {
            setError(true);
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
                    
                    //TODO use lang of user
                    const lang = "eng";

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
                    break;
                default:
                    setError(true);
                    break;
            };
            setIsLoading(false);
        }) ();

    }, [qrCode]);

    return <div className="flex justify-center items-center">
        {isLoading ? 
            <AiOutlineLoading className="animate-spin w-6 h-6" /> : 
            <div className="w-full">
                {error && <div className="flex flex-row items-center bg-red-300 text-red-600 border-2 border-red-600 rounded-xl p-3 gap-3"> 
                    <BiSolidError className="h-20 w-20"/>
                    <span>It looks like you scaned a code that is not part of the game.</span>
                </div>}
                {voucherData && <div className=""> 
                    <h1 className="text-2xl font-bold">{voucherData.title}</h1>
                    <ReactMarkdown className={"text-gray-800"} remarkPlugins={[remarkGfm]} children={voucherData.publicInfo}/>
                    <button className="bg-blue-600 px-5 py-3 text-white mt-3"
                        onClick={async () => {
                            const session = await sessionInit(voucherData.voucher)
                            const sessionid = session?.session?.id;
                            return navigate(`/quest/${sessionid}`);
                        }}>
                        Start Quest
                    </button>
                </div>}
            </div>
        }
    </div>
}

export default QrResult;