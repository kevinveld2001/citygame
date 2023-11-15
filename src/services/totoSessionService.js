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

    if (session?.session?.status === "Initialized") {
        await totoFetch(`/v2/session/${sessionid}/start`, {
            method: "POST",
            body: JSON.stringify({})
        });
    }

    return session;
}

export async function initAllDefaultSessions() {
    const sessionTokens = ["115e1bd3-9666-49d8-95ce-a3b9687148fc"];
    const sessionObject = JSON.parse(window.localStorage.getItem('sessionids') ?? '{}');

    for (let i = 0; i < sessionTokens.length; i++) {
        if (sessionObject.hasOwnProperty(sessionTokens[i])) continue;

        await sessionInit(sessionTokens[i]);
    }

}

export async function getSessionInfo(sessionId) {
    return await totoFetch(`/v2/session/${sessionId}`);
}