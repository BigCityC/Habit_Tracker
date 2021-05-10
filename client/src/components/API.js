import axios from 'axios'
import Cookies from 'js-cookie'

//setup
const api = axios.create({
  baseURL: 'http://localhost:5000/api/user'
})


function getConfig(){
  return {
    headers: {
      'auth': Cookies.get('token')
    }
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
  return api.get('/validate', getConfig())
}

//user's habit routes
function addHabit(newHabit){
  return api.post('/habits/add-habit', {newHabit}, getConfig())
}

function getHabitList(){
  return api.get('/habits', getConfig())
}

function deleteHabit(){
  return api.delete('/habits/delete', getConfig())
}


export {login,signUp, validate, addHabit, getHabitList, deleteHabit}