import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { getHabitList } from "../components/API"
import Row  from "../components/Row"
import Box from "../components/Box"
import { add, eachDayOfInterval, format } from "date-fns"

const Container = styled.div`
  flex-direction: column;
  margin: 0 auto;
`

const Header = styled.div`
  background-color: rgb(78, 96, 152);
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

let result = eachDayOfInterval({
  start: add(new window.Date(),{days:-7}),
  end: new window.Date()
})

function Tracker () {

  const [habits, setHabits] = useState([])

  useEffect(() => {
    async function getHabits () {
      try {
        //get habit list from server
        const res = await getHabitList()

        const names = res.data
          .filter(item=>item.category !== 'neutral' )
        setHabits(names)
      } catch (error) {
        console.log(error)
      }
    }

    getHabits()
  }, [])

  return (
    <Container>
      <Header>
        <Name>Habits</Name>
        <Boxes>
          {result.map((day, index) =>
            <Box key={index} color={"white"}>
              <Date>
                <Day>{format(day, 'LLL')}</Day>
                <Num>{format(day, 'dd')}</Num>
                <Day>{format(day, 'E')}</Day>
              </Date>
            </Box>
          )}
        </Boxes>
      </Header>

      {habits.map((habit, index) =>
        <Row
          key={index}
          habit={habit}
          result={result}
        />
      )}
    </Container>
  )
}

export default Tracker