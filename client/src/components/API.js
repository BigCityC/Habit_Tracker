import axios from "axios"
import Cookies from "js-cookie"

//setup
const api = axios.create({
  baseURL: "http://localhost:5000/api/user"
})


function getConfig(){
  return {"auth": Cookies.get("token")}
}


//user validation routes
function login (currentUser) {
  return api.post("/login", { currentUser })
}

function signUp (newUser) {
  return api.post("/register", { newUser })
}

function validate(){
  return api.get("/validate", { headers: getConfig() })
}

//user's habit routes
function addHabit(newHabit){
  return api.post("/habits/add-habit", { newHabit }, { headers: getConfig() })
}

function getHabitList(){
  return api.get("/habits", { headers: getConfig() })
}

function deleteHabit(itemsToDelete){
  return api.delete("/habits",{data: { itemsToDelete }, headers: getConfig() })
}

//tracker routes
function updateHabit(update){
  return api.post("/tracker/update", { update },{ headers: getConfig() })
}


export {login,signUp, validate, addHabit, getHabitList, deleteHabit, updateHabit}