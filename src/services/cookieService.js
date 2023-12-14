export function getCookies() {
    let cookies = {}
    document.cookie.split(";").forEach(cookie => {
        let splitCookie = cookie.split('=');
        cookies[splitCookie[0]] = splitCookie[1];
    });

    return cookies;
}

export function getCookie(key) {
    const cookies = getCookies();
    return cookies[key];
}

export function clearAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
}