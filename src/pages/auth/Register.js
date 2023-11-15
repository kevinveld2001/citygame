import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import SettingsContext from "../../services/SettingsContext";
import { register } from "../../services/accountService";


function RegisterScreen() {
    const [settings, setSettings] = useContext(SettingsContext);
    const translations = settings?.translations[settings?.language];
    const [email, setemail] = useState("");
    const [error, setError] = useState("");
    const [emailSend, setEmailSend] = useState(false);

    return (<div className="p-7 flex flex-col items-center w-full">
        <h1 className="text-2xl font-bold mb-6">{translations.REGISTER_SCREEN_TITLE}</h1>
        <Link to="/auth" className="text-blue-600 underline">← {translations.LOGIN_SCREEN_BACK_LABLE}</Link>

        <span className="text-sm text-center my-5">{translations.REGISTER_SCREEN_INFO}</span>

        {error !== "" && <div className="bg-red-500 text-white rounded-md p-2 w-full mt-3 border border-red-700 mb-4">
            {error}
        </div>}

        {emailSend && <div className="bg-green-500 text-white rounded-md p-2 w-full mt-3 border border-green-700 mb-4">
            {translations.REGISTER_SEREEN_EMAIL_SENT}    
        </div>}

        <label htmlFor="emailField" className="text-left w-full px-2">{translations.REGISTER_SCREEN_EMAIL}</label>
        <input id="emailField" 
            className="border w-full rounded-md h-9 p-3 py-4" 
            type="email" placeholder={translations.REGISTER_SCREEN_EMAIL} 
            onChange={(e) => {setemail(e.target.value)}} />

        <button className="bg-blue-500 text-white rounded-md p-2 w-full mt-3"
            onClick={async () => {
                setError("");
                setEmailSend(false);
                const emailSend = await register(email);
                if (!emailSend) {
                    setError(translations.REGISTER_SCREEN_FAILED);
                    return;
                }

                setEmailSend(true);
            }}>
            {translations.REGISTER_SCREEN_BUTTON}
        </button>

    </div>)
}

export default RegisterScreen;