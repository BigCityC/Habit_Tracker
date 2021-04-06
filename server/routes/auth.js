import express from 'express'
import User from '../models/User.js'
import { registerValidation, loginValidation } from '../validation.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import validate from './verifyToken.js';


const router = express.Router()

//register
router.post('/register', async (req, res) => {
  //validate before creating a user
  const { error } = registerValidation(req.body.newUser)
  if (error) return res.status(400).json(error.details[0].message)

  const { name, email, password } = req.body.newUser

  //check if user is already in database
  const emailExists = await User.findOne({ email: email })
  if (emailExists) return res.status(400).send('Email already exists')

  //Hash passwords
  const hashPassword = await bcrypt.hash(password, 10,)

  //create a new user
  const user = new User({
    name: name,
    email: email,
    password: hashPassword,
  })

  try {
    await user.save()
    res.json({ name: name, email:email })

  } catch (err) {
    res.status(400).send(err)
  }
})

//login url: http://localhost:5000/api/user
router.post('/login',  async (req, res) => {
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
  const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)

  //all checks are passed, login
  res.json({ _id: user._id, name: user.name, email:user.email, token})
})

router.get('/validate',validate, async (req, res) => {

  // Get user from email stored in the JWT
  const user = await User.findById(req.user._id)
  console.log(user)
  res.json(user)

  // response with user data
})

export { router as authRoute }