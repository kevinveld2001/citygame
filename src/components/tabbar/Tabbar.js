import React, {useContext} from "react";
import SettingsContext from "../../services/SettingsContext";
import TabItem from "./TabItem";
import { FaMap, FaBook, FaSlidersH } from "react-icons/fa";

function Tabbar() {
    const [settings, setSettings] = useContext(SettingsContext);
    const translations = settings?.translations[settings?.language];

    return (
    <div className="h-20 flex flex-row">
        <TabItem toLink="/" icon={<FaMap />} text={translations.TAB_MAP} />
        <TabItem toLink="/book" icon={<FaBook />} text={translations.TAB_BOOK}  />
        <TabItem toLink="/settings" icon={<FaSlidersH />} text={translations.TAB_SETTINGS}  />
    </div>
    );
}
export default Tabbar;