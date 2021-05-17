import express from 'express'
import User from '../models/User.js'
import validate from './verifyToken.js'

const router = express.Router()

//get the user's habits using the validate function to get the verified user ID
router.get('/', validate, async (req, res) => {
  // Get user from email stored in the JWT
  const user = await User.findById(req.user._id)

  // response with user's habits
  res.json(user['habits'])
})

//add a habit to the user's habit list
router.post('/add-habit', validate, async (req, res) => {

  User.findByIdAndUpdate(req.user._id,
    { $push: { habits: req.body.newHabit } },
    { new: true , useFindAndModify: false},
    function (err, data) {
      if (err) {
        res.send(err)
      } else {
        res.send(data.habits)
      }
    }
  )
})

router.delete('/', validate, async (req, res) => {
  //get list of IDs of items to delete
  const { itemsToDelete } = req.body

  User.findByIdAndUpdate(req.user._id,
    { $pull: { habits: { _id: itemsToDelete } } },
    { new: true , useFindAndModify: false},
    function (err, data) {
      if (err) {
        res.send(err)
      } else {
        res.send(data.habits)
      }
    }
  )
})

export { router as habitRoute }