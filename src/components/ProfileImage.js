import React from "react";
import { FaRegUser } from "react-icons/fa";

function ProfileImage({user, size}) {
    return (
        <div className={`relative ${size} overflow-hidden bg-avatar-frame bg-cover`}>
            {/* {user === null && <div className='w-full h-full bg-slate-200 animate-pulse' />} */}
            {user?.avatar && <img src={`https://api.toto.io/v2/account/${user?.avatar}/avatar`} 
                className='absolute w-full h-full object-cover'
                style={{clipPath: 'polygon(0% 0%, 67% 0, 100% 33%, 100% 100%, 0% 100%)' }} />}
            {!user?.avatar && <div className="absolute w-full h-full flex justify-center items-center">
                <FaRegUser className="w-14 h-14 text-white"/>
            </div>}
            <img src="/ui_assets/Avatar_frame_overlay.png" alt="avatar frame overlay"
                className="absolute w-full h-full"/>
        </div>
    );
}

export default ProfileImage;
