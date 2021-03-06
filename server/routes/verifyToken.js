import jwt from 'jsonwebtoken';

export default function (req,res,next) {
  const token = req.header('auth'); //req.headers.auth
  if(!token) return res.status(401).send('Access Denied');

  try{
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verified;
    // console.log('validate function runs')
    next()
  }catch(err){
    res.status(400).send('Invalid Token')
  }
}



