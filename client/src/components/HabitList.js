import React, { useState, useEffect } from 'react'
import { ListItem } from './ListItem'

const HabitList = ({ habits, inputValue, menu }) => {

  //keeps track of the active menu
  const activeMenu = menu.find((item) => item.active)

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
        if (activeMenu.name === 'all') {return true}
        else {return item.type === activeMenu.name && item}
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
    filteredHabits.map((item, index) => (
      <ListItem
        key={index}
        habit={item.name}
        type={item.type}
        days={item.days}/>
    ))
  )
}

export default HabitList