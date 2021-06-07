import React from "react"
import { createGlobalStyle } from "styled-components"
import Routes from "./Routes"

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

function App () {

  return (
    <>
      <GlobalStyle/>
      <Routes/>
    </>
  )
}

export default App