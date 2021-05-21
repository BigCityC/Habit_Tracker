import React from 'react'
import styled from 'styled-components'
import Box from './Box'

const Container = styled.div`
  display: flex;
  align-items: center;
`
const Name = styled.div`
  flex: 2;
  background-color: rgba(86, 114, 204, 0.64);
  padding: 35px;
  margin: 1px;
  text-align: center;
`
const Boxes = styled.div`
  display: flex;
  align-items: center;
`

const Row = ({name, color}) => {
  return (
    <Container>
      <Name>{name}</Name>
      <Boxes>
        {Array.from(Array(8)).map(()=>
          <Box color={color}/>
        )}
      </Boxes>
    </Container>
  )
}

export default Row