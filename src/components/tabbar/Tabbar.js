import React, {useContext} from "react";
import SettingsContext from "../../services/SettingsContext";
import TabItem from "./TabItem";
import { FaMap, FaBook, FaSlidersH } from "react-icons/fa";
import { useLocation } from "react-router-dom";

function Tabbar() {
    const location = useLocation();

    const [settings, setSettings] = useContext(SettingsContext);
    const translations = settings?.translations[settings?.language];

    return (
    <div className="h-20 flex flex-row">
        <TabItem active={location.pathname === "/"} toLink="/" icon={<FaMap />} text={translations.TAB_MAP} />
        <TabItem active={location.pathname === "/book"} toLink="/book" icon={<FaBook />} text={translations.TAB_BOOK}  />
        <TabItem active={location.pathname === "/settings"} toLink="/settings" icon={<FaSlidersH />} text={translations.TAB_SETTINGS}  />
    </div>
    );
}
export default Tabbar;