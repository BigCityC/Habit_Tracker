import express from 'express'
import User from '../models/User.js'
import validate from './verifyToken.js';


const router = express.Router()

//register
router.post('/add-habit', validate, async (req, res) => {
  //get user information through token validation
  const user = await User.findById(req.user._id)

  //destructure newHabit object?
  // const {name, type, days} = req.body.newHabit

  //add to their habits list
  user['habits'].push(req.body.newHabit)



  try {
    await user.save()
    res.send({message: 'Habit Added...'})

  } catch (err) {
    res.status(400).send(err)
  }
})

router.get('/habits',validate, async (req, res) => {

  // Get user from email stored in the JWT
  const user = await User.findById(req.user._id)
  console.log(user)
  res.json(user)

  // response with user data
})


export { router as habitRoute};