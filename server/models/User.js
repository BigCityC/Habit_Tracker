import mongoose from 'mongoose'


const habitSchema = new mongoose.Schema({
  name: String,
  type: String,
  days: {
    type: Number,
    Default: 0
  }
})

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    max: 255
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 8,
  },
  habits: [habitSchema]
})



export default mongoose.model('User', userSchema)