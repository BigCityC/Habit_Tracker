import express from 'express'
import User from '../models/User.js'


const router = express.Router()

//register
router.post('/add-habit', async (req, res) => {
  //validate habit data?
  console.log(req)
  //destructure newHabit object?
  // const {name, type, days} = req.body.newHabit

  //find the user in the DB
  // const user = awat User.find
  //add to their habits list


  try {
    await user.save()
    res.json('Habit Added...')

  } catch (err) {
    res.status(400).send(err)
  }
})

export { router as habitRoute};