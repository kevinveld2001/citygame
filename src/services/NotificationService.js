
export async function askPermision() {
    await Notification.requestPermission();
    return Notification.permission;
}

export async function showNotification(title, options) {
    if (await askPermision() !== "granted") return;

    new Notification(title, options);
}


// TODO fix this And save it for later site visit and serviceworker
export async function scheduleNotification(title, options, time) {
    if (Date.now() - time <= 0) return;

    setTimeout(() => {
        showNotification(title, options);
    }, time - Date.now() );
}