import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";

function QrGenScreen() {
    const [stories, setStories] = useState(null);
    const [selectedStory, setSelectedStory] = useState(null);
    const [vouchers, setVouchers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await fetch("/totoapi/v2/edit/e0c1defb-c75d-4c3b-8ef2-69d7ec8e224c/story/search");
            setStories(await res.json());
        }) ();
    }, []);


    useEffect(() => {
        if (selectedStory == null) return;
        //fetch vouchers
        (async () => {
            const res = await fetch("/totoapi/v2/edit/e0c1defb-c75d-4c3b-8ef2-69d7ec8e224c/voucher/search?dead=false&library=false&storyId=" + selectedStory);
            setVouchers((await res.json())?.voucher);
        }) ();
        (async () => {
            setTasks([]);
            setCoins([]);
            const res = await fetch(`/totoapi/v2/edit/e0c1defb-c75d-4c3b-8ef2-69d7ec8e224c/story/${selectedStory}/footage`);
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

    return <div className="w-full">
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
        </div>
        <div className="overflow-y-scroll p-6">
            <h2 className="text-xl font-bold">Vouchers:</h2>
            <div className="w-full overflow-x-scroll flex flex-row gap-3">
                {vouchers.map(voucher => <div key={voucher?.id} className="flex flex-col">
                    <QRCode level="H" value={`${window.location.protocol}//${window.location.host}/h/v/${voucher.token}`} />
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
                    <QRCode level="H" value={`${window.location.protocol}//${window.location.host}/h/t/${task.id}/${task.secret}`} />
                    <a className="text-xs text-blue-600 underline" 
                        href={`${window.location.protocol}//${window.location.host}/h/t/${task.id}/${task.secret}`}
                    >
                        /h/t/${task.id}/${task.secret}
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
                    <QRCode level="H" value={`${window.location.protocol}//${window.location.host}/h/c/${coin.id}/${coin.secret}`} />
                    <a className="text-xs text-blue-600 underline" 
                        href={`${window.location.protocol}//${window.location.host}/h/c/${coin.id}/${coin.secret}`}
                    >
                        /h/c/${coin.id}/${coin.secret}
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