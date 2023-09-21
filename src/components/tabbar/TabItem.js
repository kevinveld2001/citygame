import React from "react";
import {Link} from "react-router-dom";

function TabItem({ toLink, icon, text }) {
    return (
        <Link to={toLink} className="flex-1 flex flex-col justify-evenly items-center">
            {icon}
            <span>{text}</span>
        </Link>
    )
}
export default TabItem;