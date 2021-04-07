import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
//import routes
import { authRoute } from './routes/auth.js'
import { habitRoute } from './routes/habits.js'



//setup
const app = express()
const PORT = 5000
dotenv.config();

//middleware
app.use(express.json())
app.use(cors())
app.use('/api/user', authRoute)
app.use('/api/user/habits', habitRoute)

//routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('connected to database'))

//listen to server
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
})