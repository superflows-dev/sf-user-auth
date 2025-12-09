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

function goBack() {
    window.history.back();
}

function goTo(path: string) {
    window.location.href = path;
}

function maskEmail(emailStr: string) {

    const arrEmail = emailStr.split('@');
    if(arrEmail[0].length > 1) {
        arrEmail[0] = (arrEmail[0] + "").substring(0, 1) + "x".repeat(arrEmail[0].length - 2) + (arrEmail[0] + "").substring(arrEmail[0].length - 1, arrEmail[0].length);
    } 
    arrEmail[1] = (arrEmail[1] + "").substring(0, 1) + "x".repeat(arrEmail[1].length - 2) + (arrEmail[1] + "").substring(arrEmail[1].length - 1, arrEmail[1].length);

    return arrEmail[0] + '@' + arrEmail[1];

}

function getDateTimeStrings(unixTimestamp: number): string {
  // Convert to milliseconds if the timestamp is in seconds
  if (unixTimestamp.toString().length === 10) {
    unixTimestamp *= 1000;
  }

  const date = new Date(unixTimestamp);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  const estFormatter = new Intl.DateTimeFormat('en-US', {
    ...options,
    timeZone: 'America/New_York',
  });

  const istFormatter = new Intl.DateTimeFormat('en-IN', {
    ...options,
    timeZone: 'Asia/Kolkata',
  });

  const [estDate, estTime] = estFormatter.format(date).split(', ');
  const [istDate, istTime] = istFormatter.format(date).split(', ');
  return `${estDate} ${estTime} EST, ${istDate} ${istTime} IST`;
}
const exportFunctions = {
    writeCookie, readCookie, clearCookie, callApi, goBack, goTo, maskEmail, getDateTimeStrings
};

export default exportFunctions;