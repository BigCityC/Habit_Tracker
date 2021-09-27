import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { login, signUp } from '../API'
import Cookies from 'js-cookie'
import ClockPicture from '../ClockPicture'

//css
const StyledH1 = styled.h1`
  text-align: center;
`
const StyledForm = styled.form`
  border: 3px solid #f1f1f1;
`

const Container = styled.div`
  padding: 16px;
  margin: 0 50px;

  @media screen and (max-width: 500px) {
    margin: 0;
  }
`

const StyledInput = styled.input`
  width: 100%;
  padding: 6px 3px;
  margin: 4px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
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

const PasswordLink = styled.p`
  color: lightgray;
  font-size: 10px;
  text-align: center;
  margin: 0;
  display: block;

  a {
    text-decoration: none;
  }
`

const AuthLink = styled(Container)`
  background-color: #f1f1f1;
  display: block;
  padding: 10px 0 40px 0;
  margin: 0;


  @media screen and (max-width: 500px) {
    padding-bottom: 125px;
    text-align: center;
  }
`

const StyledSpan = styled.span`
  float: right;
  font-size: 10px;
  margin-right: 45px;

  a {
    text-decoration: none;
    font-weight: bold;
  }

  @media screen and (max-width: 500px) {
    float: none;
  }
`

let initCredentials = {
  name: '',
  email: '',
  password: ''
}

function Auth ({ newUser, setUser, guestOption }) {

  const [credentials, setCredentials] = useState(initCredentials)
  const inHalfDay = 0.5

  function handleFormInput (event) {
    const value = event.target.value
    const name = event.target.name
    setCredentials({ ...credentials, [name]: value })
  }

  function handleSubmit (event) {
    event.preventDefault()
    // setLoading(true)
    if (newUser) {
      signUp({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      })
        .then(res => {
          setUser(res.data)
          Cookies.set('token', res.data.token, { expires: inHalfDay })
        })
        .catch(error => {
          alert(error.response.data)
          // setLoading(false)
        })
    } else {
      login({
        email: credentials.email,
        password: credentials.password,
      })
        .then(res => {
          //user is set and cookie is set
          setUser(res.data)
          Cookies.set('token', res.data.token, { expires: inHalfDay })
        })
        .catch(error => {alert(error.response.data)})
    }

  }

  return (
    <>
      {newUser ? <StyledH1>Registration</StyledH1> : <StyledH1>Login</StyledH1>}
      <ClockPicture/>
      <StyledForm onSubmit={handleSubmit}>
        <Container>
          {newUser && <>
            <label htmlFor="name"><b>Name</b></label>
            <StyledInput type="text" placeholder="Enter Full Name" name="name" value={credentials.name}
                         onChange={handleFormInput} required/></>}

          <label htmlFor="email"><b>Email</b></label>
          <StyledInput type="text" placeholder="Enter Email" name="email" value={credentials.email}
                       onChange={handleFormInput} required/>

          <label htmlFor="password"><b>Password</b></label>
          <StyledInput type="password" placeholder="Enter Password" name="password" value={credentials.password}
                       onChange={handleFormInput} required/>

          {!newUser && <PasswordLink>Forget your password?</PasswordLink>}

          <StyledButton type="submit">{newUser ? 'Register' : 'Login'}</StyledButton>
        </Container>

        {!newUser ?
          <AuthLink>
            <StyledSpan>Don"t have an account? Register <Link to="/register">HERE</Link></StyledSpan>
          </AuthLink> :
          <AuthLink>
            <StyledSpan>Already have an account? Login <Link to="/login">HERE</Link></StyledSpan>
          </AuthLink>
        }
      </StyledForm>
    </>
  )
}

export default Auth

