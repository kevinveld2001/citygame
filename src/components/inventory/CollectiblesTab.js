import React from "react"
import InventoryList from "./InventoryList";

function CollectiblesTab() {

    const listData = [
        {picture: "/totoapi/v2/pub/file/6c210b5d-cdcd-4efa-8898-0fa498348c92?v=xl", collected: true, link: ""},
        {picture: "/totoapi/v2/pub/file/6c210b5d-cdcd-4efa-8898-0fa498348c92?v=xl", collected: true, link: ""},
        {picture: "/totoapi/v2/pub/file/6c210b5d-cdcd-4efa-8898-0fa498348c92?v=xl", collected: false, link: ""},
        {picture: "/totoapi/v2/pub/file/6c210b5d-cdcd-4efa-8898-0fa498348c92?v=xl", collected: false, link: ""},
        {picture: "", collected: false, link: ""},
        {picture: "", collected: false, link: ""},
        {picture: "", collected: false, link: ""},
        {picture: "", collected: false, link: ""},
        {picture: "", collected: true, link: ""},
        {picture: "", collected: true, link: ""},
        {picture: "", collected: false, link: ""},
        {picture: "", collected: false, link: ""},
        {picture: "", collected: false, link: ""},
        {picture: "", collected: false, link: ""},
    ]

    return <div className="w-full h-full">
        <InventoryList listData={listData} />
    </div>
}

export default CollectiblesTab;