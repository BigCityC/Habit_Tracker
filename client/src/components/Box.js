import React, {useState} from 'react'
import styled from 'styled-components'


const Card = styled.div`
  height: 80px;
  width: 90px;
  margin: 5px;
  background-color: ${({ color }) => color  && color};

  :hover {
    cursor: pointer;
  }
`

const Box = ({children, color}) => {

  const [cardColor, setCardColor] = useState("lightgrey")

  function handleClick() {
    // console.log(color.hex)
    setCardColor(color)
  }

  return (
    <Card color={cardColor} onClick={handleClick}>
      {children}
    </Card>

  )
}

export default Box