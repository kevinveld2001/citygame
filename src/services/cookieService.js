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