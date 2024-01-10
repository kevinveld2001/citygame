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

/**
 * Only use this for dynamic Toto elements that have a defined ```script``` in Toto CMS that returns a Toto element!
 * For payload processing you can also use manual triggers on any Toto element - see ```processManualTrigger```.
 */
export async function processDynamicElement(sessionId, elementUuid) {
    return await totoFetch(`/v2/session/${sessionId}/dynamic/process`, {
        method: "POST",
        body: JSON.stringify({
            id: elementUuid
        })
    });
}

export async function processManualTrigger(sessionId, elementUuid) {
    return await totoFetch(`/v2/session/${sessionId}/element/trigger`, {
        method: "POST",
        body: JSON.stringify({
            id: elementUuid,
            input: `Toto API fallacy: This parameter is not used.
                Use Toto CMS for payload. If you see this input printed in a usable place,
                modify 'processManualTrigger' to use this parameter.`
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

export async function collectCoin({sessionId, id, secret}) {
    return await totoFetch(`/v2/session/${sessionId}/coin/collect`, {
        method: "POST",
        body: JSON.stringify({
            id,
            secret,
            "location": {
                "lat": 0,
                "lon": 0
            }
        })
    });
}