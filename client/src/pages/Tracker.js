import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { getHabitList } from '../components/API'
import { Table }from '../components/Table'

const Container = styled.div`
  display: flex;
  
`
const SideBar = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  background-color: hsl(226, 54%, 64%);
  max-width: 25%;
  
`

const TopSideBar = styled.div`
  flex-shrink: 0;
  text-align: center;
  padding: 10px 0;
  border-bottom: 1px solid darkgray;
  
`

const SideBarUL = styled.ul`
  padding: 0;
  margin: 5px auto;
  text-align: center;

  
`

const SideBarLi = styled.li`
  list-style: none;
  padding: 10px;
  max-height: 30px;
  border: 1px solid ;

  
  :hover {
    background-color: royalblue;
    cursor: pointer;
  }
`



const Main = styled.div`
  flex: 3;
  background-color: #d4d2d2;
`

const TopMain = styled.div`
  display: inline-flex;
  flex-shrink: 0;
  padding: 10px 0;
  border-bottom: 1px solid darkgray;
`

const Data = styled.div`
  flex-grow: 1;
  border: 1px solid ;
`





function Tracker () {

  const [names, setNames] = useState([])

  useEffect(() => {
    async function getHabits () {
      try {
        //get habit list from server
        const res = await getHabitList()

        const names = res.data.map(item => item.name)
        setNames(names)
      } catch (error) {
        console.log(error)
      }
    }

    getHabits()
  }, [])

  return (
    <Container>
      <SideBar>
        <TopSideBar>Habits</TopSideBar>
        <Data>

          <SideBarUL>
            {names.map(name=> (
              <SideBarLi>
                {name}
              </SideBarLi>
            ))}
          </SideBarUL>

        </Data>
      </SideBar>
      <Main>
        <TopMain>
          Dates
        </TopMain>
        <Data>
          <Table/>
        </Data>
      </Main>
    </Container>
  )
}

export default Tracker