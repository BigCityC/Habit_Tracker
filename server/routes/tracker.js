import express from 'express'
import User from '../models/User.js'
import validate from './verifyToken.js'

const router = express.Router()
//using route: '/api/user/tracker'

router.post('/update', validate, async (req, res) => {
  const { date, name} = req.body.update
  User.findByIdAndUpdate(req.user._id,
    { $push: { 'habits.$[req.body.name].completed_dates': req.body.date} },
    {safe: true, upsert: true, new : true, useFindAndModify: false},
    function (err, data) {
      if (err) {
        res.send(err)
      } else {
        //data.update
        res.send(data.habits)
      }
    }
  )
  console.log(date, name)

})
export { router as trackerRoute }

//need to get id of habit we want to access.

