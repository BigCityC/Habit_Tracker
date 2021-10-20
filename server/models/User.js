import mongoose from 'mongoose'


const habitSchema = new mongoose.Schema({
  name: String,
  category: String,
  color: {
    type: String,
  },
  date_added: {
    type: String,
  },
  completed_dates: {
    type: Array,
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
  type: {
    type: String,
    required: true,
  },
  habits: [habitSchema]
})


//{ type: mongoose.Schema.Types.ObjectId, ref: 'habitSchema' }
export default mongoose.model('User', userSchema)