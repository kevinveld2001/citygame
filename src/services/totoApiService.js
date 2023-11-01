import { getCookie } from "./cookieService";

function totoFetch(url, options) {
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
                throw new Error(response.statusText);
            }
          return response.json();
        })
        .catch(error => {
            console.error(error);
        });
}


export async function getSessionConfig() {
    return await totoFetch('/v2/session/config');
}