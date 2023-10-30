import React, {useContext} from "react";
import SettingsContext from "../services/SettingsContext";
import { Link } from "react-router-dom";

function Settings() {
  const [settings, setSettings] = useContext(SettingsContext);
  const translations = settings?.translations[settings?.language];

  function changeLanguage(event) {
    setSettings({...settings, language: event?.target?.value});
  }

  return (
    <div className='p-6 overflow-y-scroll w-full'>
        <h1 className='font-semibold text-5xl mb-6'>{translations.SETTINGS_SCREEN_TITLE}</h1>
        <h2 className='font-semibold text-xl'>{translations.SETTINGS_LANGUAGE}</h2>
        <p className="text-sm">{translations.SETTINGS_LANGUAGE_EXPLENATION}</p>

        <ul className="border my-4 rounded-lg flex flex-col">
          <li className="w-full flex">
            <input type="radio" id="radio_language_en" name="language_input" 
              className="sr-only peer" checked={settings.language === "en"} onChange={changeLanguage} value="en"/>
            <label htmlFor="radio_language_en" 
              className="w-full peer-checked:bg-blue-100 h-full p-4 rounded-t-lg border-b cursor-pointer">
              {translations.SETTINGS_LANGUAGE_EN}
            </label>
          </li>

          <li className="w-full flex">
            <input type="radio" id="radio_language_it" name="language_input" 
              className="sr-only peer" checked={settings.language === "it"} onChange={changeLanguage} value="it"/>
            <label htmlFor="radio_language_it" 
              className="w-full peer-checked:bg-blue-100 h-full p-4  border-b cursor-pointer">
              {translations.SETTINGS_LANGUAGE_IT}
            </label>
          </li>

          <li className="w-full flex">
            <input type="radio" id="radio_language_sl" name="language_input" 
              className="sr-only peer" checked={settings.language === "sl"} onChange={changeLanguage} value="sl"/>
            <label htmlFor="radio_language_sl" 
              className="w-full peer-checked:bg-blue-100 h-full p-4 rounded-b-lg cursor-pointer">
              {translations.SETTINGS_LANGUAGE_SL}
            </label>
          </li>

        </ul>

        {process.env.REACT_APP_EXPERIMENTAL_FEATURES === 'true' && <>
          <Link to='/experimental' className='text-blue-500 underline'>experimental features</Link>
        </> }
    </div>
  )
}

export default Settings