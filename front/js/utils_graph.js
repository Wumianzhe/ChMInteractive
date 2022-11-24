//const element = document.querySelector('#post-request .article-id');
const requestOptions = {
    method: 'GET',
    origin: 'CHmI',
    headers: { 'Content-Type': 'application/json' },
    //body: JSON.stringify({ title: 'Fetch POST Request Example' })
};

export const submitAct =async () => {
    console.log("It's work!")
    const t = fetch('http://192.168.0.106:8080/home/?f=12', requestOptions)
    return t
  }