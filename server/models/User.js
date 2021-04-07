import mongoose from 'mongoose'

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
  habits: [{
    name: String,
    type: String,
    days: {
      type: Number,
      Default: 0
    }
  }]
})

export default mongoose.model('User', userSchema)