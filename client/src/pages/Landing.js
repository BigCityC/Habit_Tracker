import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import ClockPicture from '../components/ClockPicture'
import { login } from '../components/API'
import { User } from '../helpers/context'
import Cookies from 'js-cookie'


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
  const { setUser } = React.useContext(User)
  const history = useHistory()

  function gotoAuth () {
    let path = '/login'
    history.push(path)
  }

  function goAsGuest(){
    //login as a guest
    login({
      email: process.env.REACT_APP_GUEST_EMAIL,
      password: process.env.REACT_APP_GUEST_PASSWORD
    })
      .then(res => {
      //user is set and cookie is set
      setUser(res.data)
      Cookies.set('token', res.data.token, { expires: 0.5 })
    })
      .catch(error => {alert(error.response.data)})
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