function writeCookie(key, value) {
    document.cookie = key + "=" + value + "; path=/";
}
function clearCookie(key) {
    document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; path=/";
}
function readCookie(key) {
    let name = key + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
async function callApi(url, data, authorization) {
    return new Promise((resolve) => {
        const jsonData = JSON.stringify(data);
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", () => {
            if (xhr != null) {
                if (xhr.readyState === 4) {
                    resolve(xhr);
                }
            }
        });
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        if (authorization != null) {
            xhr.setRequestHeader('Authorization', 'Basic ' + authorization);
        }
        xhr.send(jsonData);
        return xhr;
    });
}
const exportFunctions = {
    writeCookie, readCookie, clearCookie, callApi
};
export default exportFunctions;
//# sourceMappingURL=util.js.map