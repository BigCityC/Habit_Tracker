import jwt from 'jsonwebtoken'

export default function (req, res, next) {
  const token = req.header('auth') //req.headers.auth
  if (!token) return res.status(401).send('Access Denied')
  console.log(token)
  try {
    req.user = jwt.verify(token, process.env.TOKEN_SECRET)
    next()
  } catch (err) {
    res.status(400).send('Invalid Token')
  }
}



