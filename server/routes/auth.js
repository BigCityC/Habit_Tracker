import bcrypt from 'bcrypt'
import express from 'express'
import jwt from 'jsonwebtoken'
import { registerValidation, loginValidation } from '../validation.js'
import User from '../models/User.js'
import validate from './verifyToken.js'

//using route: '/api/user'
const router = express.Router()

//register a new user
router.post('/register', async (req, res) => {
  //validate before creating a user
  const { error } = registerValidation(req.body.newUser)
  if (error) return res.status(400).json(error.details[0].message)

  const { name, email, password, type } = req.body.newUser

  //check if user is already in database
  const emailExists = await User.findOne({ email: email })
  if (emailExists) return res.status(400).send('Email already exists')

  //Hash passwords
  const hashPassword = await bcrypt.hash(password, 10,)

  //create a new user
  const user = new User({
    name,
    email,
    type,
    password: hashPassword
  })

  try {
    await user.save()
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.json({ name, email, token })

  } catch (err) {
    res.status(400).send(err)
  }
})

//login as an authenticated user
router.post('/login', async (req, res) => {
  //validate before using the user data
  const { error } = loginValidation(req.body.currentUser)
  if (error) return res.status(400).json(error.details[0].message)

  const { email, password } = req.body.currentUser
  //check if email already exists
  const user = await User.findOne({ email: email })
  if (!user) return res.status(400).send('Email or password is incorrect')

  //check is password is correct
  const validPass = await bcrypt.compare(password, user.password)
  if (!validPass) return res.status(400).send('Invalid email or password')

  //create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)

  //all checks are passed, login
  res.json({ _id: user._id, type: user.type, name: user.name, email: user.email, token })
  // }
})

router.get('/validate', validate, async (req, res) => {

  // Get user from _id stored in the JWT
  const user = await User.findById(req.user._id)
  // response with user data
  res.json(user)
})

export { router as authRoute }