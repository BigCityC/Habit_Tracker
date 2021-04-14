import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import HabitList from '../components/HabitList'
import Modal from '../components/HabitModal'
import { getHabitList } from '../components/API'
import { ListItem } from '../components/ListItem'

const TopSection = styled.div`
  display: flex;
  position: relative;

`
const Section1 = styled.div`
  flex: 10;
`

const Section2 = styled.div`
  flex: 1;
  align-self: center;
`

const SearchBar = styled.input`
  border-radius: 10px;
  border: none;
  background-color: #CB6A6A;
  opacity: 30%;
  padding: 5px;
  color: white;
  width: 40%;

  ::placeholder {
    color: white;
  }
`

const Main = styled.div`
  display: flex;
  flex-flow: column wrap;

`

const MenuUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding-left: 0;
  padding-bottom: -1px;
  border-bottom: 2px solid lightgray;
`

const MenuLi = styled.li`
  //Adapt the bottom border on active prop
  border-bottom: ${({ active }) => active === true && '2px solid #CB6A6A'};
  list-style: none;
  padding: 0 2px 0 5px;
  margin-left: 10px
`

const HabitUl = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  padding: 0;
`

let initMenu = [{
  name: 'all',
  active: true,
}, {
  name: 'good',
  active: false,
}, {
  name: 'bad',
  active: false,
}, {
  name: 'neutral',
  active: false,
}]

function Scorecard () {

  const [menu, setMenu,] = useState(initMenu)
  const [habits, setHabits] = useState([])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    async function getHabits () {
      try {
        const res = await getHabitList()
        setHabits(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    getHabits()
  }, [])

  //updates the active property for the menu option that is clicked
  const handleClick = (target) => {
    //for each item, update the active property
    const updatedMenu = menu.map((item) => {
      if (item.name === target.name) {
        return {
          ...item,
          active: true
        }
      } else {
        return {
          ...item,
          active: false
        }
      }
    })
    //update menu state
    setMenu(updatedMenu)
  }

  function handleChange (event) {
    const value = event.target.value
    setInputValue(value)
  }

  return (
    <>
      <TopSection>
        <Section1>
          <h3>Habit Scorecard</h3>
          <SearchBar type="text" placeholder="Search" value={inputValue} onChange={handleChange}/>
        </Section1>

        <Section2>
          <Modal setHabits={setHabits}/>
        </Section2>

      </TopSection>

      <Main>


        <MenuUl>
          {menu.map((item, index) => (
            <MenuLi
              key={index}
              active={item.active}
              onClick={() => {handleClick(item)}}
            >{item.name} habits</MenuLi>
          ))}
        </MenuUl>

        <HabitUl>
          <ListItem
            habit={'Habit'}
            type={'Type'}
            days={'Days(Total)'}
            header
          />

          <HabitList
            habits={habits}
            inputValue={inputValue}
            menu={menu}/>
        </HabitUl>
      </Main>
    </>
  )
}

export default Scorecard