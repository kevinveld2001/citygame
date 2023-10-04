import React from "react";
import TabItem from "./TabItem";
import { FaMap, FaBook, FaSlidersH } from "react-icons/fa";
import { useLocation } from "react-router-dom";

function Tabbar() {
    const location = useLocation();

    return (
    <div className="h-20  border border-t-slate-200 flex flex-row">
        <TabItem toLink="/" icon={<FaMap />} text="Map" />
        <TabItem toLink="/book" icon={<FaBook />} text="Book" />
        <TabItem toLink="/settings" icon={<FaSlidersH />} text="Settings" />
    </div>
    );
}
export default Tabbar;