import React from 'react'
import styled from 'styled-components'

const HabitLi = styled.li`
  border-bottom: 1px solid lightgrey;
  list-style: none;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
`
const Habit = styled.p`
  flex: 2;
  color: #3C4C80;
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
  if (type === 'good') {
    return 'green'
  } else if (type === 'bad') {
    return 'red'
  } else {
    return '#cbbf10'
  }
}

const ListItem = ({ habit, type, days }) => {

  return <HabitLi>
    <Habit>{habit}</Habit>
    <Type type={type}>{type}</Type>
    <Days>{days}</Days>
  </HabitLi>
}

export {ListItem, handleColor}