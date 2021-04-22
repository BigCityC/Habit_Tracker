import React, { useState, useEffect } from 'react'
import { handleColor, ListItem } from './ListItem'
import Checkbox from './Checkbox'
import { HiTrash } from 'react-icons/hi'
import styled from 'styled-components'


const HabitList = ({ habits, inputValue, menu }) => {

  //keeps track of the active menu
  const activeMenu = menu.find((item) => item.active)
  const [checked, setChecked] = useState(false)

  const [filteredHabits, setFilteredHabits] = useState([])

  //copy the original habit list to filteredHabits
  useEffect(() => {
    if (habits.length) {setFilteredHabits(habits)}

  }, [habits])

  //filters list when searching
  useEffect(() => {
    //filters out any item that does not have the correct type
    const updated = habits
      .filter((item) => {
        if (activeMenu.name === 'all') {return true} else {return item.type === activeMenu.name && item}
      })
      //filters out any item that does not contain characters in the inputValue state
      .filter((habit) => habit.name.toLowerCase().includes(inputValue.toLowerCase()))

    //updates habits with this new list
    setFilteredHabits(updated)

  }, [inputValue])

  //filters the habit list to only show habits based on the menu (good,bad,neutral)
  useEffect(() => {
    if (activeMenu.name === 'all') {
      setFilteredHabits(habits)
    } else {
      const updatedList = habits.filter((item) => item.type === activeMenu.name && item)
      setFilteredHabits(updatedList)
    }
  }, [menu])

  return (
    <>
      <Header checked={checked}
              setChecked={setChecked}/>

      {filteredHabits.map((item, index) => (
      <ListItem
        key={index}
        item={item}
        habits={filteredHabits}
        checked={checked}
        setChecked={setChecked}
      />
    ))}
    </>
  )
}
const HabitLi = styled.li`
  position: relative;
  border-bottom: 2px solid lightgrey;
  list-style: none;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;

 
  }

`
const Habit = styled.label`
  flex: 1;
  color: ${({ header }) => header ? 'black' : '#3C4C80'};
`

const Type = styled.p`
  /* Adapt the colors based on primary prop */
  color: ${({ type }) => handleColor(type)};
  flex: 1;
  text-align: center;
`

const Days = styled.p`
  flex: 1;
  text-align: center;
`

const Header = ({checked, setChecked}) => {
  const props = {name: 'Habits', type: 'Type', days:'Days(Total)'};


  function handleCheckboxChange(event) {
    setChecked(true)
  }

  return (
    <HabitLi>
      <Habit>
        <Checkbox
          checked={checked}
          onChange={handleCheckboxChange}
          // onClick={toggleChecked}
          //without the arrow syntax, i was creating an infinite loop.
        />
        {props.name}
      </Habit>
      <Type type={props.type}>{props.type}</Type>
      <Days>{props.days}</Days>

    </HabitLi>
  )

};

export {HabitList, Header}