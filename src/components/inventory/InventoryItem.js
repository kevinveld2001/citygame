import React from "react"
import { Link } from "react-router-dom";

function InventoryItem({ data }) {
    let link = "";
    if (data?.collected && data?.link) {
        link = data.link;
    }

    return <Link 
            to={link} 
            className={`relative bg-gray-500 aspect-square ${(data?.collected && data?.link) ? "cursor-pointer": "cursor-default"}`}>
        {data?.picture && 
            <img src={data?.picture} className="absolute w-full h-full" />
        }
        {!data?.collected && <div className="absolute w-full h-full bg-black opacity-55" />}
    </Link>
}

export default InventoryItem;