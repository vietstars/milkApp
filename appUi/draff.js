const appKey      = '0x16B21177f9fD4cF194f52E2AC923c4Ae0de732Ac';
const SECRET_KEY  = 'milkApp';
const expiresIn   = '5h';

const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const router = jsonServer.router('./src/app/sys/draff.json')
const middlewares = jsonServer.defaults({ watch : true })

server.use(middlewares)

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())

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
  if(req.method !== 'POST'){
    if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'milkApp') {
      const status = 401
      const message = 'Error in authorization format'
      res.status(status).json({status, message})
      return
    }
    try {
      const auth = lowSecure(req.headers.authorization.split(' ')[1])
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
  }else{
    next()
  }  
})

server.use(router)

server.listen(3002, () => {
  console.log('Draff Service listen: 3002')
})