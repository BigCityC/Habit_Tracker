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

const Box = ({ children, color, date, completed_dates, id }) => {
  const [cardColor, setCardColor] = useState(color)
  const [completed, setCompleted] = useState(false)

  //when color updates, update any existing boxes in the row that are already complete.
  useEffect(() => {

      if (completed_dates.includes(date)) {
        setCompleted(true)
        setCardColor(color)
      }
      else {
        console.log(completed_dates, date)
        setCardColor('lightgrey')
      }
    },
    [color])

  function handleClick () {
    if (!completed) {
      setCardColor(color)
      updateHabit({ data: date, id: id, action: 'add-date' })
        .then((res) => console.log(res.data))

    } else {
      setCardColor('lightgrey')
      updateHabit({ data: date, id: id, action: 'remove-date' })
        .then((res) => console.log(res.data))
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