import react, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { migrate } from '../../services/accountService';
import { AiOutlineLoading } from 'react-icons/ai';
import SettingsContext from '../../services/SettingsContext';

function AccountUpgrade() {
    const [settings] = useContext(SettingsContext);
    const translations = settings?.translations[settings?.language];
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    return (<div className="flex flex-col gap-1 p-5 w-full">
        <div className='flex flex-row w-full items-center mb-5'>
            <Link to="/settings" className="border rounded w-10 h-10 flex justify-center items-center mr-3">
                <IoIosArrowBack />
            </Link>
            <h1 className="text-2xl font-semibold">{translations.SETTINGS_UPGRADE_ACCOUNT_TITLE}</h1>
        </div>

        {error && <div className='border-2 rounded-lg border-red-600 bg-red-400 py-2 flex justify-center items-center'>
            {translations.SETTINGS_UPGRADE_ACCOUNT_ERROR}
        </div>}
        
        {success && <div className='border-2 rounded-lg border-green-600 bg-green-400 py-2 flex justify-center items-center'>
            {translations.SETTINGS_UPGRADE_ACCOUNT_SUCCESS}
        </div>}

        <label htmlFor='emailinput'>{translations.SETTINGS_UPGRADE_ACCOUNT_LABEL}:</label>
        <input type='email' id="emailinput" className='border w-full h-12 rounded-lg p-3'
            placeholder={translations.SETTINGS_UPGRADE_ACCOUNT_LABEL}
            onChange={(e) => {setEmail(e.target.value)}} />
        <button className='bg-blue-500 py-2 w-full text-white rounded-lg flex justify-center items-center'
            onClick={async () => {
                if (isLoading) return;
                setIsLoading(true);
                setError(false);
                setSuccess(false);
                const res = await migrate(email);
                if (res.ok) {
                    setSuccess(true);
                } else {
                    setError(true);
                }
                setIsLoading(false);
            }}>
                {isLoading ? 
                    <AiOutlineLoading className="animate-spin w-6 h-6" /> : 
                    <>{translations.SETTINGS_UPGRADE_ACCOUNT_BUTTON}</>
                }
        </button>

    </div>);
}

export default AccountUpgrade;