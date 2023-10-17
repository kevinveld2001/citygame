import React, {useContext} from "react";
import SettingsContext from "../../services/SettingsContext";
import { ReactComponent as Gb } from "./../../assets/flags/gb.svg"; 
import { ReactComponent as It } from "./../../assets/flags/it.svg"; 
import { ReactComponent as Si } from "./../../assets/flags/si.svg"; 


export default function LanguagePicker() {
    const [settings, setSettings] = useContext(SettingsContext);
    const translations = settings?.translations[settings?.language];

    function changeLanguage(event) {
        setSettings({...settings, language: event?.target?.value});
    }

    return (
    <div className="w-full">
        <h2 className='font-semibold text-xl'>{translations.SETTINGS_LANGUAGE}</h2>
        <p className="text-sm">{translations.SETTINGS_LANGUAGE_EXPLENATION}</p>

        <ul className="border my-4 rounded-lg flex flex-col">
            <li className="w-full flex">
                
                <input type="radio" id="radio_language_en" name="language_input" 
                    className="sr-only peer" checked={settings.language === "en"} onChange={changeLanguage} value="en"/>
                <label htmlFor="radio_language_en" 
                    className="w-full peer-checked:bg-blue-100 h-full p-4 rounded-t-lg border-b cursor-pointer flex flex-row items-center">
                    <Gb className="w-10 h-10 p-2"/>
                    {translations.SETTINGS_LANGUAGE_EN}
                </label>
            </li>

            <li className="w-full flex">
                <input type="radio" id="radio_language_it" name="language_input" 
                    className="sr-only peer" checked={settings.language === "it"} onChange={changeLanguage} value="it"/>
                <label htmlFor="radio_language_it" 
                    className="w-full peer-checked:bg-blue-100 h-full p-4  border-b cursor-pointer flex flex-row items-center">
                    <It className="w-10 h-10 p-2"/>
                    {translations.SETTINGS_LANGUAGE_IT}
                </label>
            </li>

            <li className="w-full flex">
                
                <input type="radio" id="radio_language_sl" name="language_input" 
                    className="sr-only peer" checked={settings.language === "sl"} onChange={changeLanguage} value="sl"/>
                <label htmlFor="radio_language_sl" 
                    className="w-full peer-checked:bg-blue-100 h-full p-4 rounded-b-lg cursor-pointer flex flex-row items-center">
                    <Si className="w-10 h-10 p-2"/> 
                    {translations.SETTINGS_LANGUAGE_SL}
                </label>
            </li>

        </ul>
    </div>);
}