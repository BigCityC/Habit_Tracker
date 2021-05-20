import React from 'react'
import styled from 'styled-components'
import Boxes from './Boxes'

const Container = styled.div`
  //border: 1px solid;
  display: flex;
  align-items: center;
`
const Header = styled.div`
  flex: 2;
  background-color: rgba(86, 114, 204, 0.64);
  padding: 35px;
  margin: 1px;
  text-align: center;
`

const Row = ({name}) => {
  return (
    <Container>
      <Header>{name}</Header>
      <Boxes/>
    </Container>
  )
}

export default Row