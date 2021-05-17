import React, { useState, useEffect } from 'react'
import { ListItem } from './ListItem'
import Header from './Header'
import { HiTrash } from 'react-icons/hi'
import { deleteHabit } from './API'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
`

const Icon = styled.span`
  color: #182b66;
`

const DeleteButton = styled.span`
  position: absolute;
  top: -10px;
  left: 8px;

  :hover {
    cursor: pointer;
  }
`

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
    //filters out any item that does not have the correct category
    const updated = habits
      .filter((item) => {
        if (activeMenu.name === 'all') {return true} else {return item.category === activeMenu.name && item}
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
      const updatedList = habits.filter((item) => item.category === activeMenu.name && item)
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

  async function deleteCheckedItems () {
    //returns an array of checked Ids
    const itemsToDelete = filteredHabits
      .filter(item => item.checked)
      .map(item => item._id
      )

    deleteHabit(itemsToDelete)
      //after habits are deleted...
      .then((res) => {
          //toggle header UI
          headerChecked && setHeaderChecked(false)
          //refresh the UI after deletion
          setFilteredHabits(res.data)
        }
      )
  }

  //create a function that returns true if any of the list items are checked

  return (
    <Wrapper>
      <DeleteButton>
        {/*if header is checked or checked is true for any of the items, show the trash can*/}
        {<Icon onClick={deleteCheckedItems}><HiTrash size={20}/></Icon>}
      </DeleteButton>

      <Header
        headerChecked={headerChecked}
        toggleHeader={toggleHeader}
        filteredHabits={filteredHabits}
        setFilteredHabits={setFilteredHabits}
      />

      {filteredHabits.map((item, index) => (
        <ListItem
          toggleChecked={itemChecked}
          key={index}
          item={item}
        />
      ))}
    </Wrapper>
  )
}

export default HabitList