import axios from 'axios'
import Cookies from 'js-cookie'

//setup
const api = axios.create({
  baseURL: 'http://localhost:5000/api/user'
})

function login (currentUser) {
  return api.post('/login', { currentUser })
}

function signUp (newUser) {
  return api.post('/register', { newUser })
}

function validate(){
  return api.get('/validate', {
    headers: {
      'auth': Cookies.get('token')
    }
  })
}

function addHabit(newHabit){
  return api.post('/habits/add-habit', {newHabit})
    .then((res) => {
      console.log(res.data)
    })
}

export {login,signUp, validate, addHabit}

//signup