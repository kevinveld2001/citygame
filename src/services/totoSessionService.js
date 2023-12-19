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
    if (session?.session?.status === "Initialized") {
        await totoFetch(`/v2/session/${sessionid}/start`, {
            method: "POST",
            body: JSON.stringify({})
        });
    }

    return session;
}

export async function initAllDefaultSessions() {
    const sessionTokens = process.env.REACT_APP_INIT_SESSIONS.split(',');
    const sessionObject = JSON.parse(window.localStorage.getItem('sessionids') ?? '{}');
    const promises = [];

    for (let i = 0; i < sessionTokens.length; i++) {
        if (sessionObject.hasOwnProperty(sessionTokens[i])) continue;

        promises.push(sessionInit(sessionTokens[i]));
    }
    await Promise.all(promises);
}

export async function getSessionInfo(sessionId) {
    return await totoFetch(`/v2/session/${sessionId}`);
}

export async function taskSolveMC(sessionId, elementId, text) {
    return await totoFetch(`/v2/session/${sessionId}/task/solve/mc`, {
        method: "POST",
        body: JSON.stringify({
            "id": elementId,
            "text": text
        })
    });
}

export async function taskSolveFreeText(sessionId, elementId, text) {
    return await totoFetch(`/v2/session/${sessionId}/task/solve/text`, {
        method: "POST",
        body: JSON.stringify({
            "id": elementId,
            "text": text
        })
    });
}

export async function taskSolveGeofence(sessionId, elementId, lat, lon) {
    return await totoFetch(`/v2/session/${sessionId}/task/solve/geofence`, {
        method: "POST",
        body: JSON.stringify({
            "id": elementId,
            "location": {
                "lat": lat,
                "lon": lon
            }
        })
    });
}

export async function acknowledge(sessionId, elementUuid) {
    return await totoFetch(`/v2/session/${sessionId}/info/acknowledge`, {
        method: "POST",
        body: JSON.stringify({
            id: elementUuid
        })
    });
}

export async function reinit(sessionId) {
    const session = await totoFetch(`/v2/session/${sessionId}/reinit`, {
        method: "POST",
    });
    if (session?.session?.status === "Initialized") {
        await totoFetch(`/v2/session/${session?.session?.id}/start`, {
            method: "POST",
            body: JSON.stringify({})
        });
    }
    return session?.session?.id;
}

export async function taskSolveSecret({sessionId, elementId, secret}) {
    return await totoFetch(`/v2/session/${sessionId}/task/solve/secret`, {
        method: "POST",
        body: JSON.stringify({
            "id": elementId,
            secret
        })
    });
}