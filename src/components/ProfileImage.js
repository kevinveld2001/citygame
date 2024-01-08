import React from "react";
import { FaRegUser } from "react-icons/fa";

function ProfileImage({user, size}) {
    return (
        <div className={`${size} rounded-full overflow-hidden`}>
            {user === null && <div className='w-full h-full bg-slate-200 animate-pulse' />}
            {user?.avatar && <img src={`https://api.toto.io/v2/account/${user?.avatar}/avatar`} className='w-full h-full object-cover' />}
            {!user?.avatar && <div className="w-full h-full bg-slate-200 flex justify-center items-center">
                <FaRegUser className="w-10 h-10 text-gray-600"/>
            </div>}
        </div>
    );
}

export default ProfileImage;
