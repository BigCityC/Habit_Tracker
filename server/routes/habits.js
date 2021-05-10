import express from 'express'
import User from '../models/User.js'
import validate from './verifyToken.js';


const router = express.Router()

//get the user's habits using the validate function to get the verified user ID
router.get('/',validate, async (req, res) => {

  // Get user from email stored in the JWT
  const user = await User.findById(req.user._id)

  // response with user's habits
  res.json(user['habits'])
})


//add a habit to the user's habit list
router.post('/add-habit', validate, async (req, res) => {

  //get user information through token validation
  const user = await User.findById(req.user._id)
  if (!user) return res.status(400).send('User is null')

  //add to their habits list
  user['habits'].push(req.body.newHabit)


  try {
    await user.save()
    res.send(user['habits'])

  } catch (err) {
    res.status(400).send(err)
  }
})

router.delete('/delete', validate, async (req, res) =>{
  const user = await User.findById(req.user._id)
  console.log(user)
})

export { router as habitRoute};