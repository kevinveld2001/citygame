import React, {useContext} from "react";
import SettingsContext from "../services/SettingsContext";
import LanguagePicker from "../components/settings/LanguagePicker";

function Settings() {
  const [settings, setSettings] = useContext(SettingsContext);
  const translations = settings?.translations[settings?.language];

  return (
    <div className='p-6 overflow-y-scroll w-full'>
        <h1 className='font-semibold text-5xl mb-6'>{translations.SETTINGS_SCREEN_TITLE}</h1>

        <LanguagePicker />
    </div>
  )
}

export default Settings