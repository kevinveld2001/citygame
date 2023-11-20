import React, {useContext} from "react";
import SettingsContext, {rawSettings} from "../services/SettingsContext";
import { Link } from "react-router-dom";
import LanguagePicker from "../components/settings/LanguagePicker";
import { logout } from "../services/accountService";

function Settings() {
  const [settings, setSettings] = useContext(SettingsContext);
  const translations = settings?.translations[settings?.language];

  return (
    <div className='p-6 overflow-y-scroll w-full'>
        <h1 className='font-semibold text-5xl mb-6'>{translations.SETTINGS_SCREEN_TITLE}</h1>

        <LanguagePicker />
        
        <h2 className="font-semibold text-xl">
          {translations.SETTINGS_ACOUNTSETTING_TITLE}
        </h2>
        <a className="text-red-500 underline cursor-pointer"
          onClick={async () => {
            await logout();
            localStorage.clear();
            setSettings(rawSettings)
          }}>
          <div className="border my-4 rounded-lg flex flex-col p-3">
              {translations.SETTINGS_ACOUNTSETTING_LOG_OUT_BUTTON}
          </div>
        </a>

        
        {process.env.REACT_APP_EXPERIMENTAL_FEATURES === 'true' && <>
          <Link to='/experimental' className='text-blue-500 underline'>experimental features</Link>
        </> }
    </div>
  )
}

export default Settings