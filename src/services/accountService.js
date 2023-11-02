import {initAllDefaultSessions} from './totoSessionService.js';

export async function anonymousLogin() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

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
    
    const cridentionals = await fetch("/totoapi/v2/auth/login", {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
            "username": username,
            "password": password,
            "app": "city game app"
          })
    })
    .then(response => response.json())
    .catch(error => console.log('error', error));

    const res = await fetch("/totoapi/v2/auth/identity");
    if (!res.ok || res.status !== 200) return null;

    await initAllDefaultSessions();

    return await cridentionals;
}