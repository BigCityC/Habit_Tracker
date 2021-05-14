import React, { useState, useEffect } from 'react'
import { ListItem } from './ListItem'
import Header from './Header'

const HabitList = ({ habits, inputValue, menu }) => {

  //keeps track of the active menu
  const activeMenu = menu.find((item) => item.active)
  const [filteredHabits, setFilteredHabits] = useState([])
  const [headerChecked, setHeaderChecked] = useState(false)

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

  function handleChecked (boolean, func) {
    //make array of checked property
    const arrayOfChecked = filteredHabits.map((item) => item.checked)
    if (func === 'some') {
      return arrayOfChecked.some(item => item === boolean)
    } else {
      return arrayOfChecked.every(item => item === boolean)
    }
  }

  function updateHeader () {
    if (filteredHabits.length === 0) return
    //if any are false, uncheck the header
    if (handleChecked(false, 'some')) {
      setHeaderChecked(false)
      //if they are all true, header should be checked
    } else if (handleChecked(true,)) {
      setHeaderChecked(true)
    }
  }

  function itemChecked (item) {
    //updates habit list and UI for if an item is checked
    const updateChecked = filteredHabits.map(habit => {
      if (item._id === habit._id) {
        habit.checked = !habit.checked
      }
      return habit
    })
    setFilteredHabits(updateChecked)

    updateHeader()
  }

  //updates all list items to be checked: true or false
  function toggleHeader (headerChecked) {
    //toggle header UI
    setHeaderChecked(!headerChecked)

    const updateCheckedAll = filteredHabits.map(habit => {
      habit.checked = !headerChecked
      return habit
    })
    setFilteredHabits(updateCheckedAll)

  }

  return (
    <>
      <Header
        headerChecked={headerChecked}
        toggleHeader={toggleHeader}
        filteredHabits={filteredHabits}
      />

      {filteredHabits.map((item, index) => (
        <ListItem
          toggleChecked={itemChecked}
          key={index}
          item={item}
        />
      ))}
    </>
  )
}

export default HabitList;