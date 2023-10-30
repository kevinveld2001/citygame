
export async function askPermision() {
    await Notification.requestPermission();
    return Notification.permission;
}

export async function showNotification(title, options) {
    if (await askPermision() !== "granted") return;

    new Notification(title, options);
}


export function scheduleNotification(title, options, time) {
    const timeDate = new Date(time);
    if (timeDate === "Invalid Date" ) {
        throw new Error("Invalid date");
    } 
    const timeTime = timeDate.getTime() - Date.now();
    if (timeTime <= 0 || timeTime > 2147483647) {
        throw new Error("Invalid time");
    }

    setTimeout(() => {
        showNotification(title, options);
    }, timeTime);
}