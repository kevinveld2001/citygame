import { async } from "q";
import totoFetch from "./totoApiService";

export async function getSessionConfig() {
    return await totoFetch('/v2/session/config');
}

export async function sessionInit(sessionToken, lang = 'eng') {
    let session = await totoFetch('/v2/session/init', {
        method: "POST",
        body: JSON.stringify({
            token: sessionToken,
            lang: lang
        })
    });
    
    let sessionid = session?.session?.id;
    let sessionObject = JSON.parse(window.localStorage.getItem('sessionids') ?? '{}');
    if (!sessionObject.hasOwnProperty(sessionToken)) {
        sessionObject[sessionToken] = sessionid;
    }
    window.localStorage.setItem('sessionids', JSON.stringify(sessionObject));

    return session;
}

export async function initAllDefaultSessions() {
    const sessionTokens = ["8b3a5eec-34e2-41a7-9251-ab4f85e2cac6", "ca3ba57f-fee0-4f5c-9a0d-cc2357f9b7f7"];
    const sessionObject = JSON.parse(window.localStorage.getItem('sessionids') ?? '{}');

    for (let i = 0; i < sessionTokens.length; i++) {
        if (sessionObject.hasOwnProperty(sessionTokens[i])) continue;

        await sessionInit(sessionTokens[i]);
    }

}

export async function getSessionInfo(sessionId) {
    return await totoFetch(`/v2/session/${sessionId}`);
}