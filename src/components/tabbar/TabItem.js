import React from "react";
import {Link} from "react-router-dom";

function TabItem({ toLink, icon, activeIcon, text, active }) {

    return (
        <Link to={toLink} className={`flex-1 flex flex-col justify-evenly items-center transition-colors duration-200`} >
            <img src={activeIcon.src} alt={activeIcon.alt} className={`h-8 w-8 mt-3 ${active? "block":"hidden"}`} />
            <img src={icon.src} alt={icon.alt} className={`h-8 w-8 mt-3 ${active? "hidden":"block"}`} />
            <span className="text-white">{text}</span>
        </Link>
    )
}
export default TabItem;