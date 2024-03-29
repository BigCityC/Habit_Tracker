import React from "react"
import styled from "styled-components"
import { Navigation, NavigationLink } from "./navigation"
import { Link } from "react-router-dom"
import Cookies from "js-cookie"
import { User } from '../helpers/context'


const Nav = styled.nav`
  background: #CB6A6A;
  align-items: center;
  justify-content: space-between;
  display: flex;
  -webkit-font-smoothing: antialiased;
  height: 56px;
  padding: 10px 10px;
`

const MainNavigationLogoLink = styled.div`
  display: flex;
  align-items: center;
  font-size: 30px;
  transition: opacity 0.2s ease;

  a {
    text-decoration: none;
    color: black;
  }

  :hover {
    cursor: pointer;
    opacity: 0.6;
  }
`
const StyledUl = styled.ul`
  list-style-type: none;
  margin: 0 auto;
  text-align: center;
  padding: 10px 0;
  background-color: #a9a9a9;

  li:hover {
    background-color: #dbdbdb;
    cursor: pointer;


  }
`

function Wrapper ({ children }) {
  const { user, setUser } = React.useContext(User)

  function handleClick () {
      if (user.type === "guest") {
        localStorage.removeItem('tracker.habits')
        setUser(null)
        Cookies.remove("token")
      } else {
        setUser(null)
        Cookies.remove("token")
      }
    }

  return (
    <div>
      <header>
        <Nav>
          <MainNavigationLogoLink>
            <Link to="/scorecard">Habit Tracker</Link>
          </MainNavigationLogoLink>

          <Navigation>
            <StyledUl>
              <NavigationLink url="/plan" label="Plan"/>
              <NavigationLink url="/tracker" label="Tracker"/>
              <NavigationLink url="/scorecard" label="Scorecard"/>
              <NavigationLink isButton label="logout" callback={handleClick}/>
            </StyledUl>
          </Navigation>
        </Nav>
      </header>
        {children}
    </div>
  )
}

export default Wrapper


