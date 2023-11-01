import React, {useContext} from "react";
import { Navigate } from 'react-router-dom';
import { anonymousLogin } from "../services/accountService"
import SettingsContext from "../services/SettingsContext";
import LanguagePicker from "../components/settings/LanguagePicker";

function LoginScreen() {
    const [settings, setSettings] = useContext(SettingsContext);
    const translations = settings?.translations[settings?.language];

    return (<div className="p-7 flex flex-col items-center w-full">
        {window.localStorage.getItem('auth') === null ? <></> : <Navigate to="/" />}
        <h1 className="text-2xl font-bold">{translations.LOGIN_SCREEN_TITLE}</h1>
        <span className="text-sm text-center my-5">{translations.LOGIN_SCREEN_EXPLANATION}</span>

        <LanguagePicker />

        <div className="flex flex-row mt-5 w-full gap-3">
            <button className="bg-blue-500 text-white rounded-md p-2 flex-1">{translations.LOGIN_SCREEN_BUTTON_LOGIN}</button>
            <button className="bg-blue-500 text-white rounded-md p-2 flex-1">{translations.LOGIN_SCREEN_BUTTON_REGISTER}</button>
        </div>
        <button className="bg-blue-500 text-white rounded-md p-2 w-full mt-3"
            onClick={async () => {
                const credentials = await anonymousLogin();
                window.localStorage.setItem('auth', JSON.stringify(credentials));
                setSettings({...settings, auth: credentials});
            }}> 
            {translations.LOGIN_SCREEN_BUTTON_TRY}
        </button>
    </div>)
}

export default LoginScreen;