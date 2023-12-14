import { clearAllCookies, getCookie } from "./cookieService";

export default function totoFetch(url, options) {
    options = {...{
        headers: {
            'Content-Type': 'application/json'
        }
    }, ...options};

    const csrfToken = getCookie('csrfToken');
    if (csrfToken) {
        options.headers['csrf-token'] = csrfToken;
    }

    return fetch("/totoapi" + url, options)
        .then(response => {
            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.clear();
                    clearAllCookies();
                    window.location.href = "/auth?error=1";
                    return;
                }
                throw new Error(response.statusText);
            }
          return response.json();
        })
        .catch(error => {
            console.error(error);
        });
}

