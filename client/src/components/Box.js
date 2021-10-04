import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { updateHabit } from './API'
import { Guest } from '../helpers/context'

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

  const { guest } = React.useContext(Guest)

  //when color or date updates, update any existing boxes in the row that are already complete.
  useEffect(() => {
    if (completedDates.includes(date)) {
      setCompleted(true)
      setCardColor(color)
    } else {
      setCardColor('lightgrey')
    }
  }, [color, date])

  function updateDaysCompleted (code) {
    //update locally
    updateDateCompleted(id, date, code)
    if (!guest) {
      //update on database
      updateHabit({ data: date, id, action: code })
        .catch(console.log)
    }
  }

  function handleClick () {
    if (!completed) {
      setCardColor(color)
      updateDaysCompleted('add-date')
    } else {
      setCardColor('lightgrey')
      updateDaysCompleted('remove-date')
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
