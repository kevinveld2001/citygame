import React, {useState} from "react";
import { askPermision, scheduleNotification, showNotification } from "../../services/NotificationService";

export default function Notifications() {
    const [permission, setPermission] = useState(Notification.permission);
    const [title, setTitle] = useState("");
    const [options, setOptions] = useState({});
    const [datetime, setDateTime] = useState(0);

    return (<div className="flex flex-col gap-1 p-5">
        <h1 className="text-5xl font-semibold">Notifications</h1>

        <div className="mt-3">
            <button className="text-blue-500 underline" onClick={() => {
                askPermision().then(setPermission);
            }}>Request permission</button> 
            <p>Permission: {permission}</p>
        </div>


        <div className="mt-3 flex flex-col items-start">
            <label htmlFor="notification_title">Title</label>
            <input type="text" id="notification_title" className="border rounded-lg p-2" onChange={(event) => {setTitle(event.target.value)}}/>

            <label htmlFor="notification_options">options</label>
            <textarea id="notification_options" className="border rounded-lg p-2"
                onChange={(event) => {
                    let newOptions = options;
                    try {
                        newOptions = JSON.parse(event.target.value);
                    } catch (error) {}
                    setOptions(newOptions);
                }}
                defaultValue={"{\n\n}"}
            />
            <code className="bg-gray-100 p-2 rounded-lg mt-2">{JSON.stringify(options)}</code>

            <button className="text-blue-500 underline" onClick={() => {
                showNotification(title, options);
            }}>Show notification</button>
        </div>

        <div className="mt-3 flex flex-col items-start">
            <label htmlFor="notification_time">date + time</label>
            <input type="datetime-local" id="notification_time" 
                className="border rounded-lg p-2" 
                onChange={(event) => {setDateTime(Date.parse(event.target.value))}}/>
            <button className="text-blue-500 underline" onClick={() => {
                scheduleNotification(title, options, datetime);
            }}>Show delayed notification</button>
        </div>
    </div>)
}