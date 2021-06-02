import express from 'express'
import User from '../models/User.js'
import validate from './verifyToken.js'

const router = express.Router()
//using route: '/api/user/tracker'

router.post('/update', validate, async (req, res) => {
  const { date, name, code } = req.body.update;
  let operator;

  if (code === 'add') {
    operator = { $push: { 'habits.$[inner].completed_dates': date } }
  } else {
    operator = { $pull: { 'habits.$[inner].completed_dates': date } }
  }

  User.findByIdAndUpdate(req.user._id,
    operator,
    { arrayFilters: [{ 'inner.name': name }], safe: true, new: true, useFindAndModify: false },
    function (err, data) {
      if (err) {
        res.send(err)
      } else {
        res.send(data.habits)
      }
    })
})
export { router as trackerRoute }

//need to get id of habit we want to access.

