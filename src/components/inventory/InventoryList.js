import React from "react"
import InventoryItem from "./InventoryItem";

function InventoryList({ listData }) {

    return <div className="w-full grid grid-cols-3 gap-5 p-9">
        {listData.map((data) => <InventoryItem data={data}/>)}
    </div>
}

export default InventoryList;