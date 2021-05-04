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
  console.log(req.body.newHabit)
  //add to their habits list
  user['habits'].push(req.body.newHabit)


  try {
    await user.save()
    res.send(user['habits'])

  } catch (err) {
    res.status(400).send(err)
  }
})

//delete habits by ids sent
router.post('/delete', validate, async (req, res) =>{
  const user = await User.findById(req.user._id)
  const idList = req.body.ids.checkedItems

  const updatedList = user['habits'].filter(habit=> {
    return !idList.includes(`${habit._id}`)
  })
  user['habits'] = updatedList;

    try {
      await user.save()
      res.send(updatedList)

    } catch (err) {
      res.status(400).send(err)
    }
  })



  //iterate through IDs
  // console.log(idList)
  // const query = {"_id":"req.user._id"};
  // const updateDocument = {
  //   $pull: {"habits.$[]._id":idList}
  // }
  // const result = await user.updateOne(query, updateDocument)

  // deleteOneHabit {
  //   updatedList.filter((item)=> item._id !== id)
  // }
  // console.log(user.habits.isMongooseArray)
  // console.log(User)

//delete by single ID
// router.delete('/delete/:itemId', validate, async (req, res)=>{
//   console.log(req.params)
// })

export { router as habitRoute};