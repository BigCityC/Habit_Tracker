import React, {useState, useEffect} from "react"
import styled from "styled-components"
import { updateHabit } from "./API"


const Card = styled.div`
  height: 80px;
  width: 90px;
  margin: 0 3px;
  background-color: ${({ color }) => color  && color};

  :hover {
    cursor: pointer;
  }
`

const Box = ({children, color, date, habit, result }) => {

  const [cardColor, setCardColor] = useState(color)
  const [completed, setCompleted] = useState(false)

  //when color updates, update any existing boxes in the row that are already complete.
  useEffect(() => {
    if (completed) {
      setCardColor(color)
    }
    },
    [color])

  function handleClick() {
    if (!completed) {

      setCardColor(color)
      updateHabit({date, name: habit.name, code: "add"})
        .then((res)=>console.log(res.data))

    } else {
      updateHabit({date, name: habit.name, code: "remove"})
        .then((res)=>console.log(res.data))
      setCardColor("lightgrey")
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