import React from "react";
import {Link} from "react-router-dom";

// Currently: Same as TabItem but doesn't have an icon...
function InventoryTabItem({ toLink, text, active }) {
    return (
        <Link to={toLink} className={`flex-1 flex flex-col justify-evenly items-center transition-colors duration-200 mb-[3px] ${active && "text-blue-600 border-b-[3px] border-blue-600 !mb-0"}`} >
            <span>{text}</span>
        </Link>
    )
}
export default InventoryTabItem;