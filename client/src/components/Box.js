import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { updateHabit } from './API'

const Card = styled.div`
  height: auto;
  flex: 1;
  margin: 3px;
  background-color: ${({ color }) => color && color};

  &:before {
    content: '';
    display: block;
    padding-top: 80%;
  }

  :hover {
    cursor: pointer;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Box = ({ children, color, date, completedDates, id, updateDateCompleted }) => {
  const [cardColor, setCardColor] = useState(color)
  const [completed, setCompleted] = useState(false)

  //when color updates, update any existing boxes in the row that are already complete.
  useEffect(() => {
    if (completedDates.includes(date)) {
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
      <Content>
        {children}
      </Content>
    </Card>

  )
}

export default Box
