// Make API Request
function api(url, data = {}) {
    return new Promise((resolve, reject) => {
        if (url == undefined) reject("Missing url");
        data.method == undefined
            ? (data.method = "GET")
            : (data.body = JSON.stringify(data.body || {}));
        if (data.headers == undefined)
            data.headers = { "Content-Type": "application/json" };
        if (data.proxyUrl) url = data.proxyUrl + url;

        fetch(url, data)
            .then((data) => data.json())
            .then((json) => resolve(json))
            .catch((err) => reject({ Error: err }));
    });
}

export { api };
