import React from "react";
import TabItem from "./TabItem";
import { FaMap, FaBook, FaSlidersH } from "react-icons/fa";

function Tabbar() {
    return (
    <div className="h-20 flex flex-row">
        <TabItem toLink="/" icon={<FaMap />} text="Map" />
        <TabItem toLink="/book" icon={<FaBook />} text="Book" />
        <TabItem toLink="/settings" icon={<FaSlidersH />} text="Settings" />
    </div>
    );
}
export default Tabbar;