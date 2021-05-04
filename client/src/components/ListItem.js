import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Checkbox from './Checkbox'
import { HiTrash, HiPencilAlt } from 'react-icons/hi'
import { deleteHabit, deleteOneHabit } from './API'

const Icon = styled.span`
  position: absolute;
  right: 10px;
  display: none;
  color: #182b66;


  :hover {
    cursor: pointer;
    color: #2F50B7;


  }
`

const IconComponent = ({ icon, action, id }) => {
  async function handleClick (e) {
    console.log(e.target)
    if (action === 'delete') {
      deleteHabit().then(res => console.log(res.data))
    }
  }

  return (
    <Icon onClick={handleClick}>
      {icon}
    </Icon>
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

  :hover {
    background-color: ${({ header }) => header ? 'white' : '#eeecec'};

    ${Icon} {
      display: flex;
    }
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

function handleColor (type) {
  switch (type) {
    case ('good'):
      return 'green'
    case ('bad'):
      return 'red'
    case ('neutral'):
      return '#cbbf10'
    default:
      return 'black'
  }
}

const ListItem = ({item, checked, checkedItems, setCheckedItems }) => {

  const [itemChecked, setItemChecked] = useState(false)
  console.log(`list item ${item.name} itemChecked: ${itemChecked}`)

  useEffect(() => {
    //header is NOT checked and single listItem checked = item goes into checkedItems array
    if (!checked) {
      itemChecked ? setCheckedItems(habits => [...habits, item._id]) : setCheckedItems(habits => habits.filter((id) => (id !== item._id)));
      //if header is checked but a item is unchecked, remove that single item from checkedItems array
    } else if (checked && !itemChecked) {
      setCheckedItems(habits => habits.filter((id) => (id !== item._id)))
    }


  }, [itemChecked])

  // this clears the listItem's itemChecked state from continuing to be checked after top trash can is clicked
  useEffect(()=>{
    checked ? setItemChecked(true) : setItemChecked(false)
    console.log(checked)
  },[checked])



  function toggleCheckboxChange () {
    setItemChecked(!itemChecked)
  }

  // async function deleteHabit(id){
  //   deleteOneHabit({id})
  //     .then(res => console.log(res.data))
  // }



  return (
    <HabitLi>
      <Habit>
        <Checkbox
          checked={checked}
          itemChecked={itemChecked}
          toggleCheckbox={toggleCheckboxChange}
          // onClick={toggleChecked}
          //without the arrow syntax, i was creating an infinite loop.
        />
        {item.name}
      </Habit>
      <Type type={item.type}>{item.type}</Type>
      <Days>{item.days}</Days>
      {/*hides the side trash cans when they are selected.*/}
      {checked || !itemChecked && <IconComponent id={item.id} icon={<HiTrash size={20}/>} action={'delete'}/>}

    </HabitLi>
  )
}

export { ListItem, handleColor }