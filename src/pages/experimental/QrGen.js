import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";

function QrGenScreen() {
    const [stories, setStories] = useState(null);
    const [selectedStory, setSelectedStory] = useState(null);
    const [vouchers, setVouchers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [coins, setCoins] = useState([]);
    const [error, setError] = useState("")

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`/totoapi/v2/edit/${process.env.REACT_APP_REPO_ID}/story/search`);
                setStories(await res.json());
            } catch(e) {
                setError("Could not load Toto data. Make sure that you are logged in with a toto account that has access to the repo.");
            } 

        }) ();
    }, []);


    useEffect(() => {
        if (selectedStory == null) return;
        //fetch vouchers
        (async () => {
            const res = await fetch(`/totoapi/v2/edit/${process.env.REACT_APP_REPO_ID}/voucher/search?dead=false&library=false&storyId=${selectedStory}`);
            setVouchers((await res.json())?.voucher);
        }) ();

        //fetch coins and tasks
        (async () => {
            setTasks([]);
            setCoins([]);
            const res = await fetch(`/totoapi/v2/edit/${process.env.REACT_APP_REPO_ID}/story/${selectedStory}/footage`);
            const footage = await res.json();
            footage.forEach(code => {
                switch(code?.t) {
                    case "Task":
                        setTasks(tasks => [...tasks, code]);
                        break;
                    case "Coin":
                        setCoins(coins => [...coins, code]);
                        break;
                    default:
                        break;
                } 
            });
        }) ();
    }, [selectedStory])

    return <div className="w-full h-full overflow-y-hidden flex flex-col">
        {error && <div className="border border-red-700 bg-red-300 text-red-700 rounded-xl p-3 m-3">
            {error}
        </div>}

        <div className="p-6 flex flex-col">
            <Link to="/experimental/" className="underline text-blue-600">back</Link>
            
            <label htmlFor="storySelect" className="mt-6">Story:</label>
            <select id="storySelect" className="border-2 rounded-xl p-3 mb-3"
                onChange={(e) => {
                    setSelectedStory(e.target.value);
                }}
            >
                {
                    stories 
                    ? <>
                    <option value={null} className="text-gray-500">Select a story</option>
                    {
                        stories.map(story => 
                        <option key={story?.id} value={story?.id} className="text-black font-bold">
                            {story?.name}
                        </option>
                        )
                    }
                    </> 
                    : <option> Loading stroies... </option>
                }
            </select>

            <button className="bg-blue-600 text-white py-2 rounded"
                onClick={() => {
                    const qrCodeElements = document.getElementsByClassName("qrcode");
                    Array.from(qrCodeElements).forEach(code => {
                        const qrcodeHtml = code.outerHTML;
                        const qrcodeBlob = new Blob([qrcodeHtml], {type:"image/svg+xml;charset=utf-8"});
                        const qrcodeDataUrl = URL.createObjectURL(qrcodeBlob);

                        const downloadLink = document.createElement("a");
                        document.body.appendChild(downloadLink);
                        downloadLink.setAttribute("href", qrcodeDataUrl);
                        downloadLink.setAttribute("download", code?.attributes["qr-name"]?.value + ".svg");
                        downloadLink.click();

                        // sources for downloading svg's:
                        // https://stackoverflow.com/questions/23218174/how-do-i-save-export-an-svg-file-after-creating-an-svg-with-d3-js-ie-safari-an
                        // https://gist.github.com/curran/7cf9967028259ea032e8
                    });
                }}>
                Download all
            </button>
        </div>
        <div className="overflow-y-scroll p-6 flex-1">
            <h2 className="text-xl font-bold">Vouchers:</h2>
            <div className="w-full overflow-x-scroll flex flex-row gap-3">
                {vouchers.map(voucher => <div key={voucher?.id} className="flex flex-col">
                    <QRCode className="qrcode" qr-name={`voucher-${voucher?.name ? voucher.name : voucher.token}`} level="H" value={`${window.location.protocol}//${window.location.host}/h/v/${voucher.token}`} />
                    <a className="text-xs text-blue-600 underline" 
                        href={`${window.location.protocol}//${window.location.host}/h/v/${voucher.token}`}
                    >
                        /h/v/{voucher.token}
                    </a>           
                    {voucher?.name &&
                        <span>
                            name: {voucher.name}
                        </span>
                    }
                </div>)}
            </div>
            <h2 className="text-xl font-bold">Tasks:</h2>
            <div className="w-full overflow-x-scroll flex flex-row gap-3">
                {tasks.map(task => <div key={task?.id} className="flex flex-col">
                    <QRCode className="qrcode" qr-name={`task-${task?.title ? task.title[0]?.text : task.id}`} level="H" value={`${window.location.protocol}//${window.location.host}/h/t/${selectedStory}/${task.id}/${task.secret}`} />
                    <a className="text-xs text-blue-600 underline" 
                        href={`${window.location.protocol}//${window.location.host}/h/t/${selectedStory}/${task.id}/${task.secret}`}
                    >
                        /h/t/{selectedStory}/{task.id}/{task.secret}
                    </a>           
                    {task?.title &&
                        task.title.map( title =>
                            <span>
                                name: {title.text}
                            </span>
                        )
                    }
                </div>)}
            </div>
            <h2 className="text-xl font-bold">Coins:</h2>
            <div className="w-full overflow-x-scroll flex flex-row gap-3">
                {coins.map(coin => <div key={coin?.id} className="flex flex-col">
                    {coin?.title.lenght}
                    <QRCode className="qrcode" qr-name={`coin-${coin?.title ? coin.title[0]?.text : coin.id}`} level="H" value={`${window.location.protocol}//${window.location.host}/h/c/${selectedStory}/${coin.id}/${coin.secret}`} />
                    <a className="text-xs text-blue-600 underline" 
                        href={`${window.location.protocol}//${window.location.host}/h/c/${selectedStory}/${coin.id}/${coin.secret}`}
                    >
                        /h/c/{selectedStory}/{coin.id}/{coin.secret}
                    </a>           
                    {coin?.title &&
                        coin.title.map( title =>
                            <span>
                                name: {title.text}
                            </span>
                        )
                    }
                </div>)}
            </div>
        </div>
    </div>
}

export default QrGenScreen;