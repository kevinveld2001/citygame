import React, {useContext, useState} from "react";
import { Link } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { anonymousLogin, languageMap } from "../services/accountService"
import SettingsContext from "../services/SettingsContext";
import LanguagePicker from "../components/settings/LanguagePicker";
import { AiOutlineLoading } from "react-icons/ai";

function AuthScreen() {
    const [settings, setSettings] = useContext(SettingsContext);
    const translations = settings?.translations[settings?.language];
    const [loading, setLoading] = useState(false);

    return (<div className="p-7 flex flex-col items-center w-full">
        {window.localStorage.getItem('auth') === null ? <></> : <Navigate to="/" />}
        <h1 className="text-2xl font-bold">{translations.AUTH_SCREEN_TITLE}</h1>
        <span className="text-sm text-center my-5">{translations.AUTH_SCREEN_EXPLANATION}</span>

        <LanguagePicker />

        <div className="flex flex-row mt-5 w-full gap-3">
            <Link to="/auth/login" className="bg-blue-500 text-white rounded-md p-2 flex-1 text-center">{translations.AUTH_SCREEN_BUTTON_LOGIN}</Link>
            <Link to="/auth/register" className="bg-blue-500 text-white rounded-md p-2 flex-1 text-center">{translations.AUTH_SCREEN_BUTTON_REGISTER}</Link>
        </div>
        <button className="bg-blue-500 text-white rounded-md p-2 w-full mt-3 flex items-center justify-center"
            onClick={async () => {
                if (loading === true) return;
                setLoading(true);
                const credentials = await anonymousLogin(languageMap.find(map => map.local === settings.language).toto);
                window.localStorage.setItem('auth', JSON.stringify(credentials));
                setSettings({...settings, auth: credentials});
            }}> 
            {loading? <AiOutlineLoading className="animate-spin w-6 h-6" /> :translations.AUTH_SCREEN_BUTTON_TRY}
        </button>
    </div>)
}

export default AuthScreen;