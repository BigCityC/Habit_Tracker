import React, { useState, useEffect } from "react"
import Scorecard from "../pages/Scorecard"
import Plan from "../pages/Plan"
import Tracker from "../pages/Tracker"
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom"
import Wrapper from "./Wrapper"
import Auth from "./auth/Auth"
import { validate } from "./API"
import Landing from '../pages/Landing'
import Loader from './Loader'

const privatePages = [
  {
    path: "/scorecard",
    component: <Scorecard/>
  }, {
    path: "/plan",
    component: <Plan/>
  },
  {
    path: "/tracker",
    component: <Tracker/>
  }
]

export default function Routes () {
  const [user, setUser] = useState(null)
  const [authenticating, setAuthenticating] = useState(true)


  useEffect(() => {
    async function auth () {
      try {
        const res = await validate()
        setUser(res.data)
      } catch (error) {
        console.log(error)
      } finally {
        setAuthenticating(false)
      }
    }

    auth()
  }, [])


  if (authenticating) return <Loader />

  return (
    <Router>

      <Switch>
        {privatePages.map((page, index) => (

          <Route key={index} path={page.path}>
            {user ?
              <Wrapper user={user} setUser={setUser}>
                {page.component}
              </Wrapper> :
              <Redirect to="/"/>
            }
          </Route>
        ))}
        <Route exact path="/">
          {user ? <Redirect to="/scorecard"/> : <Landing/> }
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/tracker"/> : <Auth setUser={setUser}/>}
        </Route>
        <Route path="/register">
          {user ? <Redirect to="/scorecard"/> : <Auth setUser={setUser} newUser/>}
        </Route>
        <Route path='*'>
          <h1>NOT FOUND</h1>
        </Route>

      </Switch>
    </Router>
  )
}

