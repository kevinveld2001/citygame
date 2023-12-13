import { getCookie } from "./cookieService";
import totoFetch from "./totoApiService.js";
import {initAllDefaultSessions} from './totoSessionService.js';

export async function anonymousLogin() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const csrfToken = getCookie('csrfToken');
    if (csrfToken) {
        myHeaders.append("csrf-token", csrfToken);
    }

    const anonymousUserCridentionals = await fetch("/totoapi/v2/auth/try", {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
            "lang": "eng",
            "screenName": `anon${(Math.random() + 1).toString(36).substring(6)}` 
        })
    })
    .then(response => response.json())
    .catch(error => console.log('error', error));

    return await login(anonymousUserCridentionals?.username, anonymousUserCridentionals?.password);
}

export async function login(username, password) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const csrfToken = getCookie('csrfToken');
    if (csrfToken) {
        myHeaders.append("csrf-token", csrfToken);
    }
    
    const cridentionals = await fetch("/totoapi/v2/auth/login", {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
            "username": username,
            "password": password,
            "app": "city game app"
          })
    })

    if (cridentionals.status !== 200) return null;

    const res = await fetch("/totoapi/v2/auth/identity", {headers: myHeaders});
    if (res.status !== 200) return null;
  
    await initAllDefaultSessions();

    return await cridentionals;
}

export async function logout() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const csrfToken = getCookie('csrfToken');
    if (csrfToken) {
        myHeaders.append("csrf-token", csrfToken);
    }

    const res = await fetch("/totoapi/v2/auth/logout", {
        method: 'POST',
        headers: myHeaders,
    });

    return res;
}

export async function register(email, lang = "eng") {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const csrfToken = getCookie('csrfToken');
    if (csrfToken) {
        myHeaders.append("csrf-token", csrfToken);
    }
    
    const res = await fetch("/totoapi/v2/auth/register", {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
            "email": email,
            lang,
            "app": "city game app"
          })
    })

    return res.status == 200;
} 

export async function getIdentity() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const csrfToken = getCookie('csrfToken');
    if (csrfToken) {
        myHeaders.append("csrf-token", csrfToken);
    }
    const res = await fetch("/totoapi/v2/auth/identity", {headers: myHeaders})
    if (!res.ok) return null;
    return res.json();
}

export const languageMap = [
    {
        toto: "eng",
        local: "en"
    },
    {
        toto: "nor", //fake map (norsk = italian)
        local: "it"
    },
    {
        toto: "srp", //fake map (srpski = Slovenian)
        local: "sl"
    }
];


export async function saveLanguage(userId, lang) {
    await totoFetch(`/v2/account/${userId}`, {
        method: "PUT",
            body: JSON.stringify({
                lang: languageMap.find(map => map.local === lang)?.toto
            })
    })
}
