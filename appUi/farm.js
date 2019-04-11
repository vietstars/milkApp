const fetch = require('node-fetch');
// const Web3 = require('web3');
// const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
let appKey = '0x16B21177f9fD4cF194f52E2AC923c4Ae0de732Ac';

// let _acc = async ()=>{
//   return await web3.eth.getCoinbase((eror,account)=>{
//       account
//   })
// }

const SECRET_KEY  = 'milkApp';
const expiresIn   = '5h';

const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const router = jsonServer.router('./src/app/sys/farm.json')
const middlewares = jsonServer.defaults({ watch : true })

server.use(middlewares)

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))

function createToken(payload){
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

function lowSecure(token){
  const res = jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err)
  return res;
}

server.post('/authenticate', (req, res) => {
  const access_token = 'apptoken'
  res.status(200).json({access_token})
})

server.use(/^(?!\/authenticate).*$/,  (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'milkApp') {
    const status = 401
    const message = 'Error in authorization format'
    res.status(status).json({status, message})
    return
  }
  try {

    const auth = lowSecure(req.headers.authorization.split(' ')[1])
     // fetch('http://localhost:3001/logged/', {
     //    method: 'GET',
     //    headers: req.headers
     // })
     // .then((rec)=>rec.json())
     // .then((result)=>{
     //    const status = 200
     //    res.status(status).json({status, result})
     // })
    if( auth.appKey === appKey){
      next()
    } else {
      const status = 401
      const message = 'TokenExpiredError'
      res.status(status).json({status, message})
    }
  } catch (err) {
    const status = 401
    const message = 'Error access_token is revoked'
    res.status(status).json({status, message})
  }
})

server.use(router)

server.listen(4001, () => {
  console.log('Farm Service listen: 4001')
})