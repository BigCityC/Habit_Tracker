import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledLink = styled.li`
  a, span {
    background-color: inherit;
    text-decoration: none;
    color: black;
    font-size: 14px;
    display: block;
    padding: 5px 15px;

    :hover {
      background-color: #dbdbdb;
      cursor: pointer;
    }
  }
`

const NavigationLink = ({ isButton, url, label, callback }) => {
  return <StyledLink>
    {isButton ? <span onClick={callback}>{label}</span> : <Link to={url}>{label}</Link>}
  </StyledLink>
}

export default NavigationLink