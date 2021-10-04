import React, { useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import Routes from './Routes'
import { Guest } from '../helpers/context'

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

  const [guest, setGuest] = useState(null)


  return (
    <Guest.Provider value={{ guest, setGuest }}>
      <GlobalStyle/>
        <Routes/>
      </Guest.Provider>
  )
}