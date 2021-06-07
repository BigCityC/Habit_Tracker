import express from 'express'
import User from '../models/User.js'
import validate from './verifyToken.js'

const router = express.Router()
//using route: '/api/user/tracker'

router.post('/update', validate, async (req, res) => {
  const { data, id, action } = req.body.update
  let operator

  //dynamic update query
  function query (param, data) {
    return { [`habits.$[inner].${param}`]: data }
  }

  //operator is based on the action
  switch (action) {
    case 'add-date':
      operator = { $addToSet: query('completed_dates', data) }
      break
    case 'remove-date':
      operator = { $pull: query('completed_dates', data) }
      break
    case 'update-color':
      operator = { $set: query('color', data) }
      break
  }

  //updates the habit based on action
  User.findByIdAndUpdate(req.user._id,
    operator,
    { arrayFilters: [{ 'inner._id': id }], safe: true, upsert: true, new: true, useFindAndModify: false },
    function (err, document) {
      if (err) {
        res.send(err)
      } else {
        //sends back the habit
        const result = document.habits.find(habit => habit._id == id)
        res.send(result)
      }
    })
})
export { router as trackerRoute }

