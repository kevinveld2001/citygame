import React, { useContext } from "react";
import SettingsContext from "../services/SettingsContext";
import InventoryTabbar from "../components/tabbar/InventoryTabbar";


function Inventory() {
    const [settings, setSettings] = useContext(SettingsContext);
    const translations = settings?.translations[settings?.language];

    return (
        <div>
            <h1 className='text-2xl font-bold text-center mb-3'>{translations.INVENTORY_TITLE}</h1>
            <InventoryTabbar />
            {/*inventory grid with items (Components) represented by their icons*/}
        </div>
    );
}

export default Inventory;