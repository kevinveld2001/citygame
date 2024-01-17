import React, {useContext} from "react";
import SettingsContext from "../../services/SettingsContext";
import TabItem from "./TabItem";
import { useLocation } from "react-router-dom";

function Tabbar() {
    const location = useLocation();

    const [settings] = useContext(SettingsContext);
    const translations = settings?.translations[settings?.language];

    return (
    <div className="h-20 flex flex-row bg-[#4FD6D6]">
        <TabItem 
            active={location.pathname === "/"} 
            toLink="/" 
            activeIcon={{src: "/ui_assets/home_active.png", alt: "Home icon active"}} 
            icon={{src: "/ui_assets/home_button.png", alt: "Home icon"}} 
            text={translations.TAB_HOME} 
        />
        <TabItem 
            active={location.pathname === "/map"} 
            toLink="/map" 
            activeIcon={{src: "/ui_assets/map_active.png", alt: "Map icon active"}} 
            icon={{src: "/ui_assets/map_button.png", alt: "Map icon"}} 
            text={translations.TAB_MAP} />
        <TabItem 
            active={location.pathname.includes("/quest")}
            toLink="/quest/list" 
            activeIcon={{src: "/ui_assets/quest_active.png", alt: "Quest icon active"}} 
            icon={{src: "/ui_assets/quest_button.png", alt: "Quest icon"}} 
            text={translations.TAB_QUEST}  />
        <TabItem 
            active={location.pathname.includes("/inventory")}
            toLink="/inventory" 
            activeIcon={{src: "/ui_assets/inventory_active.png", alt: "inventory icon active"}} 
            icon={{src: "/ui_assets/inventory_button.png", alt: "inventory icon"}} 
            text={"Inventory"} />
    </div>
    );
}
export default Tabbar;