import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
//import routes
import { authRoute } from './routes/auth.js'
import { habitRoute } from './routes/habits.js'
import { trackerRoute } from './routes/tracker.js'

//setup
const app = express()
const PORT = 5000
dotenv.config();

//middleware
app.use(express.json())
app.use(cors())
app.use('/api/user', authRoute)
app.use('/api/user/habits', habitRoute)
app.use('/api/user/tracker', trackerRoute)

//connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('connected to database'))

//listen to server
app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`)
})