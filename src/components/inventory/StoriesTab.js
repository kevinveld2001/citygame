import React from "react"
import InventoryList from "./InventoryList";

function StoriesTab() {
    const listData = [
        {picture: "/totoapi/v2/pub/file/6c210b5d-cdcd-4efa-8898-0fa498348c92?v=xl", collected: true, link: "/game/b42c6e56-535e-415b-89c7-75d9fce01c6a/917a02ff-e9b5-423f-9243-20ec5b1916c6"},
        {picture: "/totoapi/v2/pub/file/6c210b5d-cdcd-4efa-8898-0fa498348c92?v=xl", collected: false, link: "/game/b42c6e56-535e-415b-89c7-75d9fce01c6a/917a02ff-e9b5-423f-9243-20ec5b1916c6"},
        {picture: "", collected: false, link: ""},
        {picture: "", collected: false, link: ""},
        {picture: "", collected: false, link: ""},
        {picture: "", collected: true, link: ""},
        {picture: "", collected: false, link: ""},
    ]

    return <div className="w-full h-full">
        <InventoryList listData={listData} />
    </div>
}

export default StoriesTab;