import React, { useState, useEffect } from 'react'
import { ListItem } from './ListItem'
import Header from './Header'

const HabitList = ({ habits, inputValue, menu }) => {

  //keeps track of the active menu
  const activeMenu = menu.find((item) => item.active)
  const [filteredHabits, setFilteredHabits] = useState([])

  //copy the original habit list to filteredHabits and add checked property
  useEffect(() => {
    if (habits.length) {
      const _habits = habits.map(habit => {
        habit.checked = false
        return habit
      })

      setFilteredHabits(_habits)
    }

  }, [habits])
  console.log(filteredHabits)

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

  //updates habit and UI for if an item is checked
  function toggleChecked (item) {
    const updateChecked = filteredHabits.map(habit => {
      if (item._id === habit._id) {
        habit.checked = !habit.checked
      }
      return habit
    })
    setFilteredHabits(updateChecked)
  }

  //updates all list items to be checked: true or false
  function toggleHeader () {
    //is every checked property
    const allChecked = filteredHabits.every(habit => !habit.checked)

    const updateCheckedAll = filteredHabits.map(habit => {
      habit.checked = allChecked
      return habit
    })
    setFilteredHabits(updateCheckedAll)
  }

  return (
    <>
      <Header toggleHeader={toggleHeader}/>

      {filteredHabits.map((item, index) => (
        <ListItem
          toggleChecked={toggleChecked}
          key={index}
          item={item}
        />
      ))}
    </>
  )
}

export default HabitList