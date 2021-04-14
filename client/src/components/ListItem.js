import React, { useState } from 'react'
import styled from 'styled-components'
import Checkbox from './Checkbox'
import { HiTrash, HiPencilAlt } from 'react-icons/hi'

const Icon = styled.span`
  position: absolute;
  right: 10px;
  display: none;
  color: #182b66;
  

  :hover {
    cursor: pointer;
    color: #2F50B7;
    
    
  }
`

const HabitLi = styled.li`
  position: relative;
  border-bottom: 2px solid lightgrey;
  list-style: none;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;

  :hover {
    background-color: #d9d8d8;
    ${Icon} {
      display: flex;
    }
  }

`
const Habit = styled.label`
  flex: 1;
  color: ${({ text }) => (text === 'Habit') ? 'black' : '#3C4C80'};
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


function handleColor (type) {
  switch (type) {
    case ('good'):
      return 'green'
    case ('bad'):
      return 'red'
    case ('neutral'):
      return '#cbbf10'
    default:
      return 'black'
  }
}

const ListItem = ({ habit, type, days, header }) => {

  const [checked, setChecked] = useState(false)
  const [menuCheckbox, setMenuCheckbox] = useState(false)

  function handleCheckboxChange (event) {
    setChecked(event.target.checked)
  }

  function toggleMenuCheckBox () {
    habit === 'Habit' && setMenuCheckbox(!menuCheckbox)
  }


  return (
    <HabitLi>
      <Habit text={habit}>
        <Checkbox
          onClick={toggleMenuCheckBox}
          checked={checked}
          onChange={handleCheckboxChange}
        />
        {habit}
      </Habit>
      <Type type={type}>{type}</Type>
      <Days>{days}</Days>

      <Icon >
        <HiTrash size={20}/>
      </Icon>

    </HabitLi>
  )
}

export { ListItem, handleColor }