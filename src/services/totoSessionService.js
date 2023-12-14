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
    const sessionTokens = ["115e1bd3-9666-49d8-95ce-a3b9687148fc", "346ab5b7-ea77-4e35-904e-fc8108da9922", "ca3ba57f-fee0-4f5c-9a0d-cc2357f9b7f7", "2474edc4-815a-4c9d-aedd-1d5fe945c0bb", "9eb07df8-1e15-4498-a7e7-f7c37e76abc3"];
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