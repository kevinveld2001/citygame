import React from "react";
import { Navigate } from 'react-router-dom';
import { anonymousLogin } from "../services/accountService"

function LoginScreen() {

    return (<div className="p-7 flex flex-col items-center w-full">
        {window.localStorage.getItem('auth') === null ? <></> : <Navigate to="/" />}
        <h1 className="text-2xl font-bold">City Game</h1>
        <span className="text-sm text-center mt-5">To play the sity game you need a acount. You can make a acount. If you have one you can login with that one. But you can also try the app with a anoneymous account. </span>

        <div className="flex flex-row mt-5 w-full gap-3">
            <button className="bg-blue-500 text-white rounded-md p-2 flex-1">Login</button>
            <button className="bg-blue-500 text-white rounded-md p-2 flex-1">Create account</button>
        </div>
        <button className="bg-blue-500 text-white rounded-md p-2 w-full mt-3"
            onClick={anonymousLogin}> 
            Try without account 
        </button>
    </div>)
}

export default LoginScreen;