import React from 'react'
import styled from 'styled-components'
import Checkbox from './Checkbox'
import { HiTrash } from 'react-icons/hi'
import { deleteHabit } from './API'

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

const IconComponent = ({ icon, action, id }) => {
  async function handleClick (e) {
    console.log(e.target)
    if (action === 'delete') {
      deleteHabit().then(res => console.log(res.data))
    }
  }

  return (
    <Icon onClick={handleClick}>
      {icon}
    </Icon>
  )
}

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

    ${Icon} {
      display: flex;
    }
  }

`
const Habit = styled.label`
  flex: 1;
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

const ListItem = ({ header, item, toggleChecked }) => {

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

      {!header && <IconComponent id={item.id} icon={<HiTrash size={20}/>} action={'delete'}/>}

    </HabitLi>
  )
}

export { ListItem, handleColor }