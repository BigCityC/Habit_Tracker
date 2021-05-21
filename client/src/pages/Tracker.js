import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getHabitList } from '../components/API'
import Row  from '../components/Row'

const Container = styled.div`
  flex-direction: column;
  border: 1px solid ;
`

const Header = styled.div`
  background-color: rgb(78, 96, 152);
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
        <Row name='Habits' color='white' date/>
      </Header>

      {names.map(name =>
        <Row name={name}/>
      )}
    </Container>
  )
}

export default Tracker