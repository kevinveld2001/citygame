import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import SettingsContext from "../../services/SettingsContext";
import { login } from "../../services/accountService";


function LoginScreen() {
    const [settings, setSettings] = useContext(SettingsContext);
    const translations = settings?.translations[settings?.language];
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    return (<div className="p-7 flex flex-col items-center w-full">
        <h1 className="text-2xl font-bold mb-6">{translations.LOGIN_SCREEN_TITLE}</h1>
        <Link to="/auth" className="text-blue-600 underline">← {translations.LOGIN_SCREEN_BACK_LABLE}</Link>

        <span className="text-sm text-center my-5">{translations.LOGIN_SCREEN_INFO}</span>

        <label htmlFor="usernameField" className="text-left w-full px-2">{translations.LOGIN_SCREEN_USERNAME_LABLE}</label>
        <input id="usernameField" 
            className="border w-full rounded-md h-9 p-3 py-4" 
            type="text" placeholder={translations.LOGIN_SCREEN_USERNAME_LABLE} 
            onChange={(e) => {setUsername(e.target.value)}} />

        <label htmlFor="passwordField" className="text-left w-full px-2 mt-4">{translations.LOGIN_SCREEN_PASSWORD_LABLE}</label>
        <input id="passwordField" 
            className="border w-full rounded-md h-9 p-3 py-4" 
            type="password" placeholder={translations.LOGIN_SCREEN_PASSWORD_LABLE} 
            onChange={(e) => {setPassword(e.target.value)}} />

        <button className="bg-blue-500 text-white rounded-md p-2 w-full mt-3"
            onClick={async () => {
                setError("");
                const credentials = await login(username, password);
                if (credentials == null) {
                    setError("Login failed");
                    return;
                }

                window.localStorage.setItem('auth', JSON.stringify(credentials));
                setSettings({...settings, auth: credentials});
                window.location.href = "/";
            }}>
            {translations.LOGIN_SCREEN_LOGIN_BUTTON_LABLE}
        </button>

    </div>)
}

export default LoginScreen;