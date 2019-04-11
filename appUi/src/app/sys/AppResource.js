export const LOGGED ='http://localhost:3001/logged/';
export const DRAFF ='http://localhost:3002/draff/';
export const FARM ='http://localhost:4001/farm/';
export const FACTORY ='http://localhost:5001/factory/';
export const STORE ='http://localhost:6001/store/';
export const INVOICE ='http://localhost:7001/invoice/';
export const HOUREXP = parseInt(Date.now()/1e3) + 36*1e2;
export const HOURSEXP = parseInt(Date.now()/1e3) + 72*1e2;
export const SECRET_KEY = 'milkApp';
export const expiresIn = '5h';

export const HEADERS = {'Accept': 'application/json','Content-Type': 'application/json'};

export const POST = (_url,_body,_header)=>{
  return fetch(_url, {
      method: 'POST',
      headers: _header||HEADERS,
      body: JSON.stringify(_body)
  })
  .then((res) => {return true;} );
}

export const GET = (_url,_header)=>{
  return fetch(_url, {
      method: 'GET',
      headers: _header||HEADERS
  })
  .then((res) => {return res.json();} );
}

export const PUT = (_url,_body,_header)=>{
  return fetch(_url, {
      method: 'PUT',
      headers: _header||HEADERS,
      body: JSON.stringify(_body)
  })
  .then((res) => {return true;} );
}

export const PATCH = (_url,_body,_header)=>{
  return fetch(_url, {
      method: 'PATCH',
      headers: _header||HEADERS,
      body: JSON.stringify(_body)
  })
  .then((res) => {return true;} );
}

export const DEL = (_url,_header)=>{
  return fetch(_url, {
      method: 'DELETE',
      headers: _header||HEADERS
  })
  .then((res) => {return true;} );
}
