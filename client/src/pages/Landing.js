import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import ClockPicture from '../components/ClockPicture'
import { Guest } from '../helpers/context'

const StyledH1 = styled.h1`
  text-align: center;
`

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
`

const StyledButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  border-radius: 10px;

  :hover {
    opacity: 0.8;
  }
`

function Landing () {
  const { setGuest } = React.useContext(Guest)
  const history = useHistory()

  function gotoAuth () {
    let path = '/login'
    history.push(path)
  }

  function goAsGuest(){
    setGuest(true)
  }

  return (
    <>
      <StyledH1>Welcome to Habit Tracker</StyledH1>
      <ClockPicture/>
      <ButtonDiv>
        <StyledButton onClick={gotoAuth}>Login as User</StyledButton>
        <StyledButton onClick={goAsGuest}>Login as Guest</StyledButton>
      </ButtonDiv>
    </>
  )
}

export default Landing