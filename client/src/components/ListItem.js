import React from 'react'
import styled from 'styled-components'
import Checkbox from './Checkbox'


const HabitLi = styled.li`
  position: relative;
  border-bottom: 2px solid lightgrey;
  list-style: none;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;

  :hover {
    background-color: ${({ header }) => header ? 'white' : '#eeecec'};
  }

`
const Habit = styled.label`
  flex: 1;
  display: flex;
  color: ${({ header }) => header ? 'black' : '#3C4C80'};
`

const Category = styled.p`
  /* Adapt the colors based on primary prop */
  color: ${({ category }) => handleColor(category)};
  flex: 1;
  text-align: center;
`

const Days = styled.p`
  flex: 1;
  text-align: center;
`

function handleColor (category) {
  switch (category) {
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

const ListItem = ({ item, toggleChecked }) => {

  return (
    <HabitLi>
      <Habit>
        <Checkbox
          checked={item.checked}
          toggleCheckbox={() => {toggleChecked(item)}}
        />
        {item.name}
      </Habit>
      <Category category={item.category}>{item.category}</Category>
      <Days>{item.days}</Days>
    </HabitLi>
  )
}

export { ListItem, handleColor }