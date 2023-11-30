import React, {useState, useEffect, useContext} from 'react';
import { getIdentity } from '../services/accountService';
import ProfileImage from '../components/ProfileImage';
import { Link } from 'react-router-dom';
import SettingsContext from '../services/SettingsContext';

function HomeScreen() {
    const [settings, setSettings] = useContext(SettingsContext);
    const translations = settings?.translations[settings?.language];
    const [user, setUser] = useState(null);

    useEffect(() => {
        (async() => {
            const user = await getIdentity();
            setUser(user);
            console.log(user);
        }) ();
    }, []);

    return <div className='w-full h-full flex flex-col items-stretch pt-10'>
        <div className='flex flex-col items-center'>
            <ProfileImage user={user} />
            <span className='text-2xl font-bold mt-4'>
                {user?.screenName ?? user?.email ?? (user === null ? "..." : 'Anonymous')}
            </span>
        </div>
        <div className='flex-1 flex justify-center items-center'> 
            <span className='text-gray-400'>TODO put quest and notification here</span>
        </div>
        <div className='flex flex-col items-center'>
            <Link to="/qr" className='border-2 border-blue-500 rounded px-8 py-3 m-5 text-lg font-medium text-blue-500'>
                {translations.HOME_SCREEN_QR_BUTTON}
            </Link>
        </div>
    </div>
}

export default HomeScreen;