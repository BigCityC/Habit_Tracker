import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { updateHabit } from './API'

const Card = styled.div`
  height: 80px;
  width: 90px;
  margin: 0 3px;
  background-color: ${({ color }) => color && color};

  :hover {
    cursor: pointer;
  }
`

const Box = ({ children, color, date, habit }) => {
  const [cardColor, setCardColor] = useState(color)
  const [completed, setCompleted] = useState(false)

  //when color updates, update any existing boxes in the row that are already complete.
  useEffect(() => {
      //this runs 40 times every render
      console.log("box useEffect runs")
      if (habit.completed_dates.includes(date)) {
        setCardColor(color)
      } else {
        setCardColor("lightgrey")
      }
    },
    [color])

  function handleClick () {
    if (!completed) {
      setCardColor(color)
      updateHabit({ data: date, id: habit._id, action: 'add-date' })
        .then((res) => console.log(res.data))

    } else {
      updateHabit({ data: date, id: habit._id, action: 'remove-date' })
        .then((res) => console.log(res.data))
      setCardColor('lightgrey')
      // habit.completed_dates = habit.completed_dates.filter(d => d !== date)
    }

    setCompleted(!completed)
  }

  return (
    <Card color={cardColor} onClick={handleClick}>
      {children}
    </Card>

  )
}

export default Box