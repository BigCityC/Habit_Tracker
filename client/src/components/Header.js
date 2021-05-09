import styled from 'styled-components'
import { handleColor } from './ListItem'
import Checkbox from './Checkbox'
import React, { useState, useEffect } from 'react'
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
  color: ${({ header }) => header ? 'black' : '#3C4C80'};
`

const Type = styled.p`
  /* Adapt the colors based on primary prop */
  color: ${({ type }) => handleColor(type)};
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

const Header = ({ allChecked, setAllChecked, checkedItems, deleteCheckedItems }) => {
  const props = { name: 'Habits', type: 'Type', days: 'Days(Total)' }

  return (
    <>
      <HabitLi>
        <Span>
          {(checkedItems.length > 0) && <Icon onClick={deleteCheckedItems}>
            <HiTrash size={20}/>
          </Icon>}
        </Span>

        <Habit>
          <Checkbox
            toggleCheckbox={() => {setAllChecked(!allChecked)}}
            checked={allChecked}
          />
          {props.name}
        </Habit>
        <Type type={props.type}>{props.type}</Type>
        <Days>{props.days}</Days>
      </HabitLi>
    </>
  )

}

export default Header