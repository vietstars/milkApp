const URL ='http://127.0.0.1:3001/';
const HEADERS = {'Accept': 'application/json','Content-Type': 'application/json'};
export const HOUREXP = (Date.now()*1e3) + 3600;
export const HOURSEXP = (Date.now()*1e3) + 7200;

export const POST = (_url,_body)=>{
  return fetch(URL+_url, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(_body)
  })
  .then((res) => {return res.json();} )
  .catch(console.log);
}

export const GET = (_url)=>{
  return fetch(URL+_url, {
      method: 'GET',
      headers: HEADERS
  })
  .then((res) => {return res.json();} )
  .catch(console.log);
}

export const RMO = (_url)=>{
  return fetch(URL+_url, {
      method: 'DELETE',
      headers: HEADERS
  })
  .then((res) => {return res.json();} )
  .catch(console.log);
}
