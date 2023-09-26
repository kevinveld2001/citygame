import React, { useEffect, useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'

function InstallBar() {
    const [installPrompt, setInstallPrompt] = useState(null);
    const [hidePrompt, setHidePrompt] = useState(localStorage.getItem('hideInstallPrompt') === 'true');

    useEffect(() => {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            setInstallPrompt(e);
        });
    }, []);

    if (installPrompt == null || hidePrompt) return <></>;

    return (
        <div className='w-full flex flex-row bg-indigo-100 p-3 gap-2 items-center'>
            <img src="./logo512.png"  className='bg-white w-12 h-12 rounded-xl'/>
            <span className='text-lg font-semibold'>Install city game app</span>

            <div className='ml-auto flex flex-row gap-2'>
                <button className='bg-blue-600 py-1 px-3 rounded text-white'
                    onClick={() => { installPrompt.prompt() }}>
                        Install
                </button>
                <button className='w-6 flex justify-center items-center'
                    onClick={() => {
                        setHidePrompt(true);
                        localStorage.setItem('hideInstallPrompt', 'true');
                    }}>
                    <IoCloseSharp />
                </button>
            </div>
        </div>
    );
}

export default InstallBar;