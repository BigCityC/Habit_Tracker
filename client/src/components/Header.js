import styled from 'styled-components'

import Checkbox from './Checkbox'
import React from 'react'
import { HiTrash } from 'react-icons/hi'
import { deleteHabit } from './API'

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

const Type = styled.p`
  flex: 1;
  text-align: center;
`

const Days = styled.p`
  flex: 1;
  text-align: center;
`
const Icon = styled.span`
  color: #182b66;
`

const Span = styled.span`
  position: absolute;
  top: -10px;
  left: 8px;

  :hover {
    cursor: pointer;
  }
`

const Header = ({ headerChecked, toggleHeader, filteredHabits }) => {

  async function deleteCheckedItems () {
    const itemsToDelete = filteredHabits
      .filter(item => item.checked)
      .map(item =>item._id
    )
    console.log(itemsToDelete)

    deleteHabit( itemsToDelete )
      //after habits are deleted...
      .then((res) => {
          //empty the checkedItems array
          // setCheckedItems([])
          //refresh the UI after deletion
          // setFilteredHabits(res.data)
        }
      )

  }

  return (
    <>
      <HabitLi>
        <Span>
          {/*if header is checked or checked is true for any of the items, show the trash can*/}
          {<Icon onClick={deleteCheckedItems}><HiTrash size={20}/></Icon>}
        </Span>

        <Habit>
          <Checkbox
            checked={headerChecked}
            toggleCheckbox={() => {
              toggleHeader(headerChecked)
            }}/>
          Habits
        </Habit>
        <Type>Type</Type>
        <Days>Days(Total)</Days>

      </HabitLi>
    </>
  )

}

export default Header