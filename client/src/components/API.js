import axios from 'axios'
import Cookies from 'js-cookie'

//setup
const api = axios.create({
  baseURL: 'http://localhost:5000/api/user'
})

const config = {
  headers: {
    'auth': Cookies.get('token')
  }
}

function login (currentUser) {
  return api.post('/login', { currentUser })
}

function signUp (newUser) {
  return api.post('/register', { newUser })
}

function validate(){
  return api.get('/validate', config)
}

function addHabit(newHabit){
  return api.post('/habits/add-habit', {newHabit}, config)
}

function getHabitList(){
  return api.get('/habits', config)
}
export {login,signUp, validate, addHabit, getHabitList}

//signup