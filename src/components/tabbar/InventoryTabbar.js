import React, { useContext } from "react";
import SettingsContext from "../../services/SettingsContext";
import { useLocation } from "react-router-dom";
import InventoryTabItem from "./InventoryTabItem";


function InventoryTabbar() {
    const location = useLocation();

    const [settings, setSettings] = useContext(SettingsContext);
    const translations = settings?.translations[settings?.language];

    return (
        <div className="h-20 flex flex-row">    {/*TODO classes - this is not for the bottom of the page, might be less wide too*/}
        {/*TODO this is not a global that switches pages like Tabbar, these props are probably bad - see QuestList for filtering*/}
            <InventoryTabItem active={location.pathname.includes("/achievements")} toLink="/inventory/achievements" text={translations.INVENTORY_TAB_ACHIEVEMENTS} />
            <InventoryTabItem active={location.pathname.includes("/stories")} toLink="/inventory/stories" text={translations.INVENTORY_TAB_STORIES} />
            <InventoryTabItem active={location.pathname.includes("/collectibles")} toLink="/inventory/collectibles" text={translations.INVENTORY_TAB_COLLECTIBLES}  />
            {[1,2,3].map((id) => (
                <InventoryTabItem key={id} filter={filter}/>
            ))}
        </div>
    );
}

export default InventoryTabbar;