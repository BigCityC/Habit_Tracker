import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getHabitList } from '../components/API'
import Row  from '../components/Row'
import Boxes from '../components/Boxes'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  background-color: rgb(78, 96, 152);
  margin: 1px;
  text-align: center;
`
const Title = styled.div`
  flex: 1;
  align-self: center;
`



function Tracker () {

  const [names, setNames] = useState([])

  useEffect(() => {
    async function getHabits () {
      try {
        //get habit list from server
        const res = await getHabitList()

        const names = res.data
          .filter(item=>item.category !== 'neutral' )
          .map(item => item.name)
        setNames(names)
      } catch (error) {
        console.log(error)
      }
    }

    getHabits()
  }, [])

  return (
    <Container>
      <Header>
        <Title>Habits</Title>
        <Boxes color='white' />
      </Header>

      {names.map(name =>
        <Row name={name}/>
      )}
    </Container>
  )
}

export default Tracker