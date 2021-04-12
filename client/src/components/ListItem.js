import React, {useState} from 'react'
import styled from 'styled-components'
import Checkbox from './Checkbox';

const HabitLi = styled.li`
  border-bottom: 1px solid lightgrey;
  list-style: none;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;
`
const Habit = styled.label`
  flex: 2;
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
  switch (type){
    case ('good'):
      return 'green';
    case ('bad'):
      return 'red';
    case ('neutral'):
      return '#cbbf10';
    default:
      return 'black';
  }
}

const ListItem = ({ habit, type, days }) => {

  const [checked, setChecked] = useState(false)

  function handleCheckboxChange(event){
    setChecked(event.target.checked)
  }

  return <HabitLi>

      <Habit text={habit}>

        <Checkbox
          checked={checked}
          onChange={handleCheckboxChange}
        />
        {habit}

      </Habit>


    <Type type={type}>{type}</Type>
    <Days>{days}</Days>
  </HabitLi>
}

export {ListItem, handleColor}