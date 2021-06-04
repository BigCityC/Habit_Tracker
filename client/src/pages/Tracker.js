import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getHabitList } from '../components/API'
import Row from '../components/Row'
import { add, eachDayOfInterval, format } from 'date-fns'

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
  flex-direction: column;
  align-items: center;
`
const Day = styled.p`
  margin: 0;

`
const Num = styled.p`
  margin: 0;
  font-weight: bold;
`
const Card = styled.div`
{
  height: 80px;
  width: 90px;
  margin: 0 3px;
  background-color: white;
}
`
//initializing date array of current week
let dateArray = eachDayOfInterval({
  start: add(new window.Date(), { days: -7 }),
  end: new window.Date()
})
const formattedDateArray = dateArray.map(item => item.toISOString())

function Tracker () {

  const [habits, setHabits] = useState([])

  useEffect(() => {
    const getHabits = async () => {
      //get habit list from server
      const res = await getHabitList()
      //removes neutral habits
      const habits = res.data.filter(item => item.category !== 'neutral')
      console.log(habits)
      setHabits(habits)
    }

    getHabits()
  }, [])

//add a function here that is similar to the updateHabitAPI call that you can
//prop drill to box so that  not only the server updates when a date is added to
//completed_dates, but also there is a local update because we need to see the change without
// having to re render the page.

  if (habits.length <= 0) return <h5>no habits yet.</h5>
  return (
    <Container>
      <Header>
        <Name>Habits</Name>
        <Boxes>
          {dateArray.map((day, index) =>
            <Card key={index}>
              <Date>
                <Day>{format(day, 'LLL')}</Day>
                <Num>{format(day, 'dd')}</Num>
                <Day>{format(day, 'E')}</Day>
              </Date>
            </Card>
          )}
        </Boxes>
      </Header>

      {habits.map((habit, index) =>
        <Row
          key={index}
          habit={habit}
          formattedDateArray={formattedDateArray}
        />
      )}
    </Container>
  )
}

export default Tracker