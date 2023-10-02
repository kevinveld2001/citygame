import React from "react";
import TabItem from "./TabItem";
import { FaMap, FaBook, FaSlidersH } from "react-icons/fa";
import { useLocation } from "react-router-dom";

function Tabbar() {
    const location = useLocation();

    return (
    <div className="h-20  border border-t-slate-200 flex flex-row">
        <TabItem active={location.pathname === "/"} toLink="/" icon={<FaMap /> } text="Map" />
        <TabItem active={location.pathname === "/book"} toLink="/book" icon={<FaBook /> } text="Book" />
        <TabItem active={location.pathname === "/settings"} toLink="/settings" icon={<FaSlidersH /> } text="Settings" />
    </div>
    );
}
export default Tabbar;