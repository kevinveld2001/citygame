import React, {useContext, useState} from "react";
import { Link } from "react-router-dom";
import { Navigate, useSearchParams } from 'react-router-dom';
import { anonymousLogin, getIdentity, languageMap } from "../services/accountService"
import SettingsContext from "../services/SettingsContext";
import LanguagePicker from "../components/settings/LanguagePicker";
import { AiOutlineLoading } from "react-icons/ai";

function AuthScreen() {
    const [searchParams] = useSearchParams();
    const [settings, setSettings] = useContext(SettingsContext);
    const translations = settings?.translations[settings?.language];
    const [loading, setLoading] = useState(false);
    const error = searchParams.get('error');

    return (<div className="p-7 flex flex-col items-center w-full">
        {error && <div className="bg-blue-300 border-2 border-blue-600 text-blue-900 rounded-xl p-3 mb-3">
            <span>{translations[`AUTH_SCREEN_ERROR_${error}`]}</span>
        </div>}
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

                const user = await getIdentity();

                window.localStorage.setItem('auth', JSON.stringify(user));
                setSettings({...settings, auth: user});
            }}> 
            {loading? <AiOutlineLoading className="animate-spin w-6 h-6" /> :translations.AUTH_SCREEN_BUTTON_TRY}
        </button>
    </div>)
}

export default AuthScreen;