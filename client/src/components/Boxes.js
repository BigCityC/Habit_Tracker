import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  //border: 1px solid;
  display: flex;
  align-items: center;
`
const Box = styled.div`
  background-color: lightgrey;
  height: 80px;
  width: 90px;
  flex: 1;
  margin: 5px;
  background-color: ${({ color }) => color  && color};

  :hover {
    cursor: pointer;
  }
`

const Boxes = ({ color="lightgrey"}) => {
  return (
    <Container>
      <Box color={color}/>
      <Box color={color}/>
      <Box color={color}/>
      <Box color={color}/>
      <Box color={color}/>
      <Box color={color}/>
      <Box color={color}/>
    </Container>

  )
}

export default Boxes