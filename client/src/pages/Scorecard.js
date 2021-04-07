import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {ListItem} from '../components/ListItem'
import Modal from '../components/HabitModal'
import { getHabitList, validate } from '../components/API'

const TopSection = styled.div`
  position: relative;
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
  //border: 1px solid;
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

const Habit = styled.p`
  flex: 2;
`
const Type = styled.p`
  flex: 1;
  text-align: center;
`

const Menu = styled.li`
  border-bottom: 1px solid lightgrey;
  list-style: none;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  color: black;

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

  const activeMenu = menu.find((item) => item.active)

  useEffect(() => {
    filterHabits()
  }, [inputValue])

  //get habits list
  useEffect(() => {
    async function getList(){
      try {
        const res = await getHabitList()
        setHabits(res.data)
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    getList()
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
    updateHabitListByType(target.name)
  }

  //filters the habit list to only have the type based on the menu option
  function updateHabitListByType (type) {
    if (type === 'all') {
      setHabits(habits)
    } else {
      const updatedList = habits.filter((item) => item.type === type && item)
      setHabits(updatedList)
    }
  }

  //update the habit list based on input value
  function filterHabits () {
    if (inputValue === '') {updateHabitListByType(activeMenu.name)} else {
      const updated = habits
        //filters out any item that does not have the correct type
        .filter((item) => {
          if (activeMenu.name === 'all') {
            return true
          } else {
            return item.type === activeMenu.name && item
          }
        })
        //filters out any item that does not contain characters in the inputValue state
        .filter((habit) => habit.name.toLowerCase().includes(inputValue.toLowerCase()))

      //updates habits with this new list
      setHabits(updated)
    }

  }

  function handleChange (event) {
    const value = event.target.value
    setInputValue(value)
  }

  function handleSubmit (e) {
    if (e.keyCode === 8) {
      // updateHabitListByType(activeMenu.name)
      console.log('back')
    }
  }


  return (
    <>
      <TopSection>
        <h3>Habit Scorecard</h3>
        <SearchBar type="text" placeholder="Search" value={inputValue} onChange={handleChange}
                   onKeyDown={handleSubmit}/>
      </TopSection>

      <Main>

        <Modal
          setHabits={setHabits}
        />

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
          <Menu>
            <Habit>Habit</Habit>
            <Type>Type</Type>
            <Type>Days(Total)</Type>
          </Menu>
          {
            habits.map((item, index) => (
              <ListItem
                key={index}
                habit={item.name}
                type={item.type}
                days={item.days}/>
            ))
          }
        </HabitUl>
      </Main>
    </>
  )
}

export default Scorecard