import React, { useContext } from "react";
import SettingsContext from "../../services/SettingsContext";
import InventoryTabItem from "./InventoryTabItem";


function InventoryTabbar({ pageId }) {
    const [settings, setSettings] = useContext(SettingsContext);
    const translations = settings?.translations[settings?.language];

    return (
        <div className="h-20 flex flex-row justify-evenly w-full">    {/*TODO classes - this is not for the bottom of the page, might be less wide too*/}
        {/*TODO this is not a global that switches pages like Tabbar, these props are probably bad - see QuestList for filtering*/}
            <InventoryTabItem 
                active={pageId === "achievements"} 
                toLink="/inventory/achievements" 
                text={translations.INVENTORY_TAB_ACHIEVEMENTS} 
            />
            <InventoryTabItem 
                active={pageId === "stories"} 
                toLink="/inventory/stories" 
                text={translations.INVENTORY_TAB_STORIES} 
            />
            <InventoryTabItem 
                active={pageId === "collectibles"} 
                toLink="/inventory/collectibles" 
                text={translations.INVENTORY_TAB_COLLECTIBLES}  
            />
        </div>
    );
}

export default InventoryTabbar;