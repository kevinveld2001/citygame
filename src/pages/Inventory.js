import React, { useContext } from "react";
import SettingsContext from "../services/SettingsContext";
import InventoryTabbar from "../components/tabbar/InventoryTabbar";
import { useParams } from "react-router";
import CollectiblesTab from "../components/inventory/CollectiblesTab";
import StoriesTab from "../components/inventory/StoriesTab";
import AchievementsTab from "../components/inventory/AchievementsTab";


function Inventory() {
    const [settings, setSettings] = useContext(SettingsContext);
    const translations = settings?.translations[settings?.language];
    const { id: pageId } = useParams();


    return (
        <div className="w-full">
            <h1 className='text-2xl font-bold text-center my-3'>{translations.INVENTORY_TITLE}</h1>
            <InventoryTabbar pageId={pageId}/>
            {(() => {
                switch (pageId) {
                    case "achievements":
                        return <CollectiblesTab />
                    case "stories":
                        return <StoriesTab />
                    case "collectibles":
                        return <AchievementsTab />
                }
            }) ()}
        </div>
    );
}

export default Inventory;