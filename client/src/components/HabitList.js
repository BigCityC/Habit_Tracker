import React, { useState, useEffect } from 'react'
import { ListItem } from './ListItem'
import Header from './Header'
import { deleteHabit, getHabitList } from './API'

const HabitList = ({ habits, inputValue, menu }) => {

  //keeps track of the active menu
  const activeMenu = menu.find((item) => item.active)
  const [allChecked, setAllChecked] = useState(false)
  const [displayAllChecked, setDisplayAllChecked] = useState(false)
  const [checkedItems, setCheckedItems] = useState([])
  const [filteredHabits, setFilteredHabits] = useState([])
  console.log(checkedItems)


  useEffect(() => {
    if (allChecked) {
      setDisplayAllChecked(true)
      setCheckedItems(filteredHabits.map((item) => item._id))
    }

    else if (!allChecked && ((checkedItems.length > 0) && (checkedItems.length === habits.length))) {
      setDisplayAllChecked(false)
      setCheckedItems([])
    }
  }, [allChecked])


    //copy the original habit list to filteredHabits
  useEffect(() => {
    if (habits.length) {setFilteredHabits(habits)}
  }, [habits])


  //filters list when searching
  useEffect(() => {
    //filters out any item that does not have the correct type
    const updated = habits
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


  function addItem(itemId) {
    setCheckedItems([...checkedItems, itemId])
  }

  function removeItem(itemId){
    setCheckedItems(checkedItems.filter(id => id !== itemId))
    setAllChecked(false)
  }

  function checkItem(itemId, checked){
    if (checked) addItem(itemId)
    else removeItem(itemId)
  }

  async function deleteCheckedItems () {
    deleteHabit({ checkedItems })
      //after habits are deleted...
      .then((res) => {
          //empty the checkedItems array
          setCheckedItems([])
          //refresh the UI after deletion
          setFilteredHabits(res.data)
        }
      )
  }


  return (
    <>
      <Header
        allChecked={allChecked}
        setAllChecked={setAllChecked}
        checkedItems={checkedItems}
        deleteCheckedItems={deleteCheckedItems}
      />
      {filteredHabits.map((item, index) => (
        <ListItem
          key={index}
          item={item}
          allChecked={allChecked}
          displayAllChecked={displayAllChecked}
          checkItem={checkItem}
        />
      ))}
    </>
  )
}

export default HabitList
