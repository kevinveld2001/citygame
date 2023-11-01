import React from "react";
import { Link } from "react-router-dom";


export default function Experimental() {

    return (<div className="flex flex-col gap-1 p-5">
        <h1 className="text-5xl font-semibold">Experimental Features</h1>

        <Link to="/settings" className="text-blue-500 underline">Back to all settings</Link>

        <h2 className="text-xl font-semibold mt-3">Notifications</h2>
        <Link to="/experimental/notifications" className="text-blue-500 underline">Notifications</Link>
    </div>);
}