import totoFetch from "./totoApiService";

export async function getPub({voucher, element, invite}) {
    let query = ""

    if (voucher) {
        query += query === "" ? "?" : "&"
        query += `voucher=${voucher}`;
    }
    if (element) {
        query += query === "" ? "?" : "&"
        query += `element=${element}`;
    }
    if (invite) {
        query += query === "" ? "?" : "&"
        query += `invite=${invite}`;
    }

    return await totoFetch('/v2/session/init' + query);
}