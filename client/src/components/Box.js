import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
  height: 80px;
  width: 90px;
  flex: 1;
  margin: 5px;
  background-color: ${({ color }) => color  && color};

  :hover {
    cursor: pointer;
  }
`
const Box = ({color="lightgrey", children}) => {
  return (
    <Card color={color}>
      {children}
    </Card>
  )
}

export default Box