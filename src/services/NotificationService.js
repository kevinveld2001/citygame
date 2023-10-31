
export async function askPermision() {
    await Notification.requestPermission();
    return Notification.permission;
}

export async function showNotification(title, options) {
    if (await askPermision() !== "granted") return;

    new Notification(title, options);

    // in case it was a scheduled notification it should be removed
    removeNotificationFromStoreage();
}


export function scheduleNotification(title, options, time, saveNotification = true) {
    const timeDate = new Date(time);
    if (timeDate === "Invalid Date" ) {
        throw new Error("Invalid date");
    } 
    const timeTime = timeDate.getTime() - Date.now();
    if (timeTime > 2147483647) {
        throw new Error("Invalid time");
    }

    if (timeTime <= 0) {
        showNotification(title, options);
        return;
    }

    if (saveNotification) {
        storeSchedule(title, options, timeDate.getTime());
    }

    setTimeout(() => {
        showNotification(title, options);
    }, timeTime);
}

function storeSchedule(title, options, time) {
    const notification = {
        title,
        options,
        time
    };

    const notifications = JSON.parse(localStorage.getItem("notifications") || "[]");
    notifications.push(notification);
    localStorage.setItem("notifications", JSON.stringify(notifications));
}

export function scheduleNotificationFromStoreage() {
    const notifications = JSON.parse(localStorage.getItem("notifications") || "[]");
    notifications.forEach(notification => {
        scheduleNotification(notification.title, notification.options, notification.time, false);
    });
    removeNotificationFromStoreage();
}

function removeNotificationFromStoreage() {
    const notifications = JSON.parse(localStorage.getItem("notifications") || "[]");
    notifications.forEach(notification => {
        if (notification.time < Date.now()) {
            const index = notifications.indexOf(notification);
            notifications.splice(index, 1);
        }
    });
    localStorage.setItem("notifications", JSON.stringify(notifications));
}