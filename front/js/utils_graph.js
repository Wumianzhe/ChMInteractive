//const element = document.querySelector('#post-request .article-id');

function serialize(obj) {
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}

export const submitAct = async (obj) => {
    console.log("It's work!")
    let args = serialize(obj);
    const requestOptions = {
        method: 'GET',
        origin: 'CHmI',
        headers: { 'Content-Type': 'application/json' },
    };
    const url = 'http://192.168.0.106:8080/bisection_response/?' + args;
    console.log(url);
    const t = fetch(url, requestOptions)
    return t
}
