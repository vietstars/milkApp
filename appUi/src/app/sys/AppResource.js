export const LOGGED ='http://localhost:3001/logged/';
export const DRAFF ='http://localhost:3001/draff/';
export const FARM ='http://localhost:4001/farm/';
export const FACTORY ='http://localhost:5001/factory/';
export const STORE ='http://localhost:6001/store/';
export const INVOICE ='http://localhost:7001/invoice/';
const HEADERS = {'Accept': 'application/json','Content-Type': 'application/json'};
export const HOUREXP = (Date.now()*1e3) + 3600;
export const HOURSEXP = (Date.now()*1e3) + 7200;

export const POST = (_url,_body)=>{
  return fetch(_url, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(_body)
  })
  .then((res) => {return true;} );
}

export const GET = (_url)=>{
  return fetch(_url, {
      method: 'GET',
      headers: HEADERS
  })
  .then((res) => {return res.json();} );
}

export const PUT = (_url,_body)=>{
  return fetch(_url, {
      method: 'PUT',
      headers: HEADERS,
      body: JSON.stringify(_body)
  })
  .then((res) => {return true;} );
}

export const PATCH = (_url,_body)=>{
  return fetch(_url, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify(_body)
  })
  .then((res) => {return true;} );
}

export const DEL = (_url)=>{
  return fetch(_url, {
      method: 'DELETE',
      headers: HEADERS
  })
  .then((res) => {return true;} );
}