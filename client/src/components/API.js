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


//user validation routes
function login (currentUser) {
  return api.post('/login', { currentUser })
}

function signUp (newUser) {
  return api.post('/register', { newUser })
}

function validate(){
  return api.get('/validate', config)
}

//user's habit routes
function addHabit(newHabit){
  return api.post('/habits/add-habit', {newHabit}, config)
}

function getHabitList(){
  return api.get('/habits', config)
}

function deleteHabit(ids){
  return api.post('/habits/delete', {ids}, config)
}


export {login,signUp, validate, addHabit, getHabitList, deleteHabit}