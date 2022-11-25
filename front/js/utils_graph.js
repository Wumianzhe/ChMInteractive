//const element = document.querySelector('#post-request .article-id');


export const submitAct =async (obj) => {
    console.log("It's work!")
    let args = JSON.stringify(obj);
    const requestOptions = {
        method: 'GET',
        origin: 'CHmI',
        headers: { 'Content-Type': 'application/json' },
        //body: JSON.stringify(obj)
    };
    console.log(args)
    const t = fetch('http://192.168.0.106:8080/home/?' + args, requestOptions)
    return t
  }