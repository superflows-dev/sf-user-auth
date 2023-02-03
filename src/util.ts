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

async function callApi(url: string, data: string, authorization: any) {

    return new Promise((resolve: any) => {

        const jsonData = JSON.stringify(data);
        var xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", () => {
            if(xhr != null) {
                if(xhr.readyState === 4) {
                    resolve(xhr);
                }
            }
        });
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); 
        if(authorization != null) {
            xhr.setRequestHeader('Authorization', 'Basic ' + authorization);
        }
        xhr.send(jsonData);

        return xhr;

    })

}

const exportFunctions = {
    writeCookie, readCookie, clearCookie, callApi
};

export default exportFunctions;