import React, {useState, useEffect} from 'react';
import { getIdentity } from '../services/accountService';
import ProfileImage from '../components/ProfileImage';

function HomeScreen() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        (async() => {
            const user = await getIdentity();
            setUser(user);
            console.log(user);
        }) ();
    }, []);

    return <div className='w-full h-full flex flex-col items-center pt-10'>
        <ProfileImage user={user} />
        <span className='text-2xl font-bold mt-4'>
            {user?.screenName ?? user?.email ?? (user === null ? "...":'Anonymous')}
        </span>
    </div>
}

export default HomeScreen;