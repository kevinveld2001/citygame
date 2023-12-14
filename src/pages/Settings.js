import React, {useContext, useState} from "react";
import SettingsContext, {rawSettings} from "../services/SettingsContext";
import { Link } from "react-router-dom";
import LanguagePicker from "../components/settings/LanguagePicker";
import { logout } from "../services/accountService";
import { AiOutlineLoading } from "react-icons/ai";

function Settings() {
  const [settings, setSettings] = useContext(SettingsContext);
  const translations = settings?.translations[settings?.language];
  const [loading, setLoading] = useState(false);

  return (
    <div className='p-6 overflow-y-scroll w-full'>
        <h1 className='font-semibold text-5xl mb-6'>{translations.SETTINGS_SCREEN_TITLE}</h1>

        <LanguagePicker saveToToto={true} />
        
        <h2 className="font-semibold text-xl">
          {translations.SETTINGS_ACOUNTSETTING_TITLE}
        </h2>
        <a className="text-red-500 underline cursor-pointer"
          onClick={async () => {
            if (loading === true) return;
            setLoading(true);
            await logout();
            localStorage.clear();
            setSettings({...settings, auth: null});
          }}>
          <div className="border my-4 rounded-lg flex flex-col p-3">
              {loading? <AiOutlineLoading className="animate-spin w-6 h-6" /> :translations.SETTINGS_ACOUNTSETTING_LOG_OUT_BUTTON}
          </div>
        </a>

        
        {process.env.REACT_APP_EXPERIMENTAL_FEATURES === 'true' && <>
          <Link to='/experimental' className='text-blue-500 underline'>experimental features</Link>
        </> }
    </div>
  )
}

export default Settings