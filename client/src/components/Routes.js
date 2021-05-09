import React, { useState, useEffect } from 'react'
import Scorecard from '../pages/Scorecard'
import Plan from '../pages/Plan'
import Tracker from '../pages/Tracker'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Wrapper from './Wrapper'
import Auth from './auth/Auth'
import { validate } from './API'


const privatePages = [
  {
    path: '/scorecard',
    component: <Scorecard/>
  }, {
    path: '/plan',
    component: <Plan/>
  },
  {
    path: '/tracker',
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

  if (authenticating) return <h1>LOADING</h1>

  return (
    <Router>
      <Switch>
        {privatePages.map((page, index) => (
          <Route key={index} path={page.path}>
            {user ?
              <Wrapper user={user} setUser={setUser}>
                {page.component}
              </Wrapper> :
              <Redirect to="/login"/>
            }
          </Route>
        ))}
        <Route path="/login">
          {user ? <Redirect to="/tracker"/> : <Auth setUser={setUser}/>}
        </Route>
        <Route path="/register">
          {user ? <Redirect to="/tracker"/> : <Auth setUser={setUser} newUser/>}
        </Route>
        <Route path="/">
          {user ? <Redirect to="/tracker"/> : <Redirect to="/login"/>}
        </Route>
      </Switch>
    </Router>
  )
}

