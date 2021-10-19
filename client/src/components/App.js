import React, { useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import Routes from './Routes'
import { User } from '../helpers/context'

const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;


    body {
      font-family: "Michroma", sans-serif;
    }
  }
`

export default function App () {
  const [user, setUser] = useState(null)

  return (
    <User.Provider value={{ user, setUser }}>
      <GlobalStyle/>
        <Routes/>
    </User.Provider>
  )
}