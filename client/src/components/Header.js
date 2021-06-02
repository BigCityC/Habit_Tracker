import styled from "styled-components"
import Checkbox from "./Checkbox"
import React from "react"

const HabitLi = styled.li`
  position: relative;
  border-bottom: 2px solid lightgrey;
  list-style: none;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;
`
const Habit = styled.label`
  flex: 1;
`

const MenuDetail = styled.p`
  flex: 1;
  text-align: center;
`

const Header = ({ headerChecked, toggleHeader }) => {

  return (
    <>
      <HabitLi>

        <Habit>
          <Checkbox
            checked={headerChecked}
            toggleCheckbox={() => {
              toggleHeader(headerChecked)
            }}/>
          Habits
        </Habit>
        <MenuDetail>Category</MenuDetail>
        <MenuDetail>Days(Total)</MenuDetail>

      </HabitLi>
    </>
  )

}

export default Header