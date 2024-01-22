import React, { useEffect, useState } from "react"
import InventoryList from "./InventoryList";
import { AiOutlineLoading } from "react-icons/ai";
import { getSessionInfo } from "../../services/totoSessionService";

function StoriesTab() {
    const [isLoading, setIsLoading] = useState(true);
    const [listData, setListData] = useState([]);

    useEffect(() => {
        (async () => {
            const sessionIds = JSON.parse(localStorage.getItem("sessionids") ?? "{}");
            const list = await Promise.all(Object.values(sessionIds).map(async (id) => await getSessionInfo(id)))
            const formatedList = list.map((totoSession) => {
                let picture = "";
                if (totoSession?.story?.content?.logo) {
                    picture = `/totoapi/v2/pub/file/${totoSession?.story?.content?.logo}?v=xl`
                }
                return {picture, collected: !!totoSession?.session?.session?.finishedAt, link: "", key: totoSession?.story?.id}
            }) 
            setListData(formatedList);
            setIsLoading(false);
        }) ()
    }, [])

    console.log(listData);
    return <div className={`w-full h-full ${isLoading? "flex justify-center items-center" : ""}`}>
        { isLoading ? 
            <AiOutlineLoading className="animate-spin w-6 h-6" /> : 
            <InventoryList listData={listData} />
        }
    </div>
}

export default StoriesTab;