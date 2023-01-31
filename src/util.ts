function writeCookie(key: string, value: string): void {
    document.cookie = key + "=" + value + "; path=/"
}

function clearCookie(key: string) {
    document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; path=/"
}

function readCookie(key: string): string {
    let name = key + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
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


const exportFunctions = {
    writeCookie, readCookie, clearCookie
};

export default exportFunctions;