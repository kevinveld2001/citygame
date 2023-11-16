import React, {useContext} from "react";
import SettingsContext from "../../services/SettingsContext";
import TabItem from "./TabItem";
import { FaMap, FaSlidersH, FaListUl  } from "react-icons/fa";
import { useLocation } from "react-router-dom";

function Tabbar() {
    const location = useLocation();

    const [settings, setSettings] = useContext(SettingsContext);
    const translations = settings?.translations[settings?.language];

    return (
    <div className="h-20 flex flex-row">
        <TabItem active={location.pathname === "/"} toLink="/" icon={<FaMap />} text={translations.TAB_MAP} />
        <TabItem active={location.pathname.includes("/quest")} toLink="/quest/list" icon={<FaListUl />} text={translations.TAB_QUEST}  />
        <TabItem active={location.pathname === "/settings"} toLink="/settings" icon={<FaSlidersH />} text={translations.TAB_SETTINGS}  />
    </div>
    );
}
export default Tabbar;