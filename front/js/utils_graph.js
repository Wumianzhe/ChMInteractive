//const element = document.querySelector('#post-request .article-id');

function serialize(obj) {
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}

export const submitAct = async (method, obj) => {
    console.log("It's work!")
    let args = serialize(obj);
    const requestOptions = {
        method: 'GET',
        origin: 'CHmI',
        headers: { 'Content-Type': 'application/json' },
    };
    const url = 'http://localhost:8080/' + method + '_response/?' + args;
    console.log(url);
    const t = fetch(url, requestOptions)
    return t
}
