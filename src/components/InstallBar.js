import React, { useEffect, useState, useContext } from 'react'
import SettingsContext from '../services/SettingsContext'
import { IoCloseSharp } from 'react-icons/io5'

function InstallBar() {
    const [settings, setSettings] = useContext(SettingsContext);
    const translations = settings?.translations[settings?.language];
    const [installPrompt, setInstallPrompt] = useState(null);
    const [hidePrompt, setHidePrompt] = useState(localStorage.getItem('hideInstallPrompt') === 'true');

    useEffect(() => {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            setInstallPrompt(e);
            setSettings({...settings, showInstallPrompt: true});
        });
    }, []);

    if (installPrompt == null || hidePrompt) return <></>;

    return (
        <div className='w-full flex flex-row bg-indigo-100 p-3 gap-2 items-center'>
            <img alt='app logo' src="/logo512.png"  className='bg-white w-12 h-12 rounded-xl'/>
            <span className='text-lg font-semibold'>{translations.INSTALL_BANNER_TITLE}</span>

            <div className='ml-auto flex flex-row gap-2'>
                <button className='bg-blue-600 py-1 px-3 rounded text-white'
                    onClick={() => { installPrompt.prompt() }}>
                        {translations.INSTALL_BANNER_INSTALL_BUTTON}
                </button>
                <button className='w-6 flex justify-center items-center'
                    aria-label="close install prompt"
                    onClick={() => {
                        setHidePrompt(true);
                        localStorage.setItem('hideInstallPrompt', 'true');
                        setSettings({...settings, showInstallPrompt: false});
                    }}>
                    <IoCloseSharp />
                </button>
            </div>
        </div>
    );
}

export default InstallBar;