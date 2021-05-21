import React from 'react'
import styled from 'styled-components'
import Box from './Box'
import { eachDayOfInterval } from 'date-fns'

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

const Date = styled.div`
  display: flex;
  flex-direction:column;
  align-items:center;
`
const Day = styled.p`
  margin: 0;

`
const Num = styled.p`
  margin: 0;
  font-weight: bold;

`

const result = eachDayOfInterval({
  start: new window.Date(2021, 5, 16),
  end: new window.Date(2021, 5, 22)
})

console.log(result)
const Row = ({ name, color, date }) => {
  return (
    <Container>
      <Name>{name}</Name>
      <Boxes>
        {Array.from(Array(8).keys()).map(() =>
          <Box color={color}>
            {date &&

            <Date>
              <Day>March</Day>
              <Num>14</Num>
              <Day>MON</Day>
            </Date>

            }
          </Box>
        )}
      </Boxes>
    </Container>
  )
}

export default Row