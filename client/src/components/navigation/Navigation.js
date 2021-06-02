import React from "react"
import styled from "styled-components"
import { HiMenu } from "react-icons/hi"

const MainNavigationLink = styled.a`
  align-items: flex-start;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  padding: 10px 10px;

  :hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

const MainNavigationDropDown = styled.div`
  display: none;
  z-index: 1;
  position: absolute;
  right: -10px;
  top: 66px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`

const MainNavigation = styled.div`
  height: 100%;
  position: relative;

  :hover ${MainNavigationDropDown} {
    display: block;
  }
`

const Navigation = ({ children }) =>

  <MainNavigation>
    <MainNavigationLink>
      <HiMenu size={40}/>
    </MainNavigationLink>
    <MainNavigationDropDown>
      {children}
    </MainNavigationDropDown>
  </MainNavigation>

export default Navigation