import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getHabitList } from '../components/API'
import Row from '../components/Row'
import { add, eachDayOfInterval, format } from 'date-fns'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const Header = styled.div`
  background-color: #3C6580;
  display: flex;
  height: 85px;
  width: 100%;
`
const Name = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
  background-color: #3C6580;
  flex: 0 0 145px;
  text-align: center;

  @media screen and (max-width: 420px) {
    font-size: 12px;
    flex: 0 0 125px;
  }
`
const Boxes = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
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
  height: auto;
  flex: 1 0 auto;
  margin: 3px;
  background-color: white;

  &:before {
    content: '';
    display: block;
  }
`

function Tracker () {
  const [habits, setHabits] = useState([])
  const [deviceSize, setDeviceSize] = useState(onWindowResize())

  function onWindowResize () {
    if (window.innerWidth <= 480) {
      return "mobile"
    }
    else if (window.innerWidth >= 481 && window.innerWidth <= 768) {
      return "tablet"
    }
    else if (window.innerWidth >= 769 && window.innerWidth <= 1100) {
      return "small-screen"
    }
    else if (window.innerWidth >= 1200 ) {
      return "large-screen"
    }
  }

  useEffect(() => {
    console.log(deviceSize, window.innerWidth)
    window.addEventListener('resize', onWindowResize)

    return () => window.removeEventListener('resize', onWindowResize)
  }, [deviceSize])

  useEffect(() => {
    const getHabits = async () => {
      //get habit list from server
      const res = await getHabitList()
      //removes neutral habits
      const habits = res.data.filter(item => item.category !== 'neutral')
      setHabits(habits)
    }

    getHabits()
  }, [])

  function showItems(size){
    switch (size) {
      case ('mobile'):
        return -2
      case ('tablet'):
        return -4
      case ('small-screen'):
        return -6
      default:
        return -7
    }
  }
  //initializing date array of current week
  let dateArray = eachDayOfInterval({
    start: add(new window.Date(), { days: showItems(deviceSize) }),
    end: new window.Date()
  })

  const formattedDateArray = dateArray.map(item => item.toISOString())

  function updateDateCompleted (id, date, action) {
    const updatedList = habits.map((habit => {
      let { completed_dates } = habit
      if (action === 'add') {
        completed_dates = [...completed_dates, date]
      } else {
        completed_dates = completed_dates.filter(completedDate => completedDate !== date)
      }

      if (habit._id === id) {
        return {
          ...habit,
          completed_dates
        }
      }

      return habit
    }))
    console.log(updatedList)
    setHabits(updatedList)
  }

  if (habits.length <= 0) return <h5>no habits yet.</h5>
  return (
    <Container>
      <Header>
        <Name>Habits</Name>
        <Boxes>
          {dateArray.map((day, index) =>
            <Card deviceSize={deviceSize} key={index}>
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
          updateDateCompleted={updateDateCompleted}
        />
      )}
    </Container>
  )
}

export default Tracker