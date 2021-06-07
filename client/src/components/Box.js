import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { updateHabit } from './API'

const Card = styled.div`
  height: 80px;
  width: 90px;
  margin: 3px;
  background-color: ${({ color }) => color && color};

  :hover {
    cursor: pointer;
  }
`

const Box = ({ children, color, date, completed_dates, id, updateDateCompleted }) => {
  const [cardColor, setCardColor] = useState(color)
  const [completed, setCompleted] = useState(false)

  //when color updates, update any existing boxes in the row that are already complete.
  useEffect(() => {
    if (completed_dates.includes(date)) {
      setCompleted(true)
      setCardColor(color)
    } else {
      setCardColor('lightgrey')
    }
  }, [color])

  function handleClick () {
    if (!completed) {
      setCardColor(color)
      //update locally
      updateDateCompleted(id, date, 'add')
      //update on database
      updateHabit({ data: date, id, action: 'add-date' })
        .then((res) => console.log)
        .catch(console.log)

    } else {
      setCardColor('lightgrey')
      //update locally
      updateDateCompleted(id, date, 'remove')
      //update on database
      updateHabit({ data: date, id, action: 'remove-date' })
        .then((res) => console.log)
        .catch(console.log)
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