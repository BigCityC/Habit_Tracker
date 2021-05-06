import styled from 'styled-components'
import { handleColor } from './ListItem'
import Checkbox from './Checkbox'
import React, {useState, useEffect} from 'react'
import { HiTrash } from 'react-icons/hi'
import { deleteHabit } from './API'

const HabitLi = styled.li`
  position: relative;
  border-bottom: 2px solid lightgrey;
  list-style: none;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;

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
const Icon = styled.span`
  color: #182b66;
`

const Span = styled.span`
  position: absolute;
  top: -10px;
  left: 8px;

  :hover {
    cursor: pointer;
  }


`

const Header = ({ checked, setChecked, checkedItems, setCheckedItems, setFilteredHabits, filteredHabits }) => {
  const [header, setHeader] = useState(false)
  console.log(header)

  const props = { name: 'Habits', type: 'Type', days: 'Days(Total)' }

  useEffect(() => {
    //if all of the listItems are not checked, the header's UI checkbox should be blank
    checkedItems.length < filteredHabits.length || checkedItems.length === 0 ? setHeader(false) : setHeader(true);
  }, [checkedItems])



  function toggleCheckbox () {
    setChecked(!checked)
    setHeader(!header)
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

  console.log(`header checked: ${checked}`)

  return (
    <>

      <HabitLi>
        <Span>
          {checkedItems.length > 0 && <Icon onClick={deleteCheckedItems}><HiTrash size={20}/></Icon>}
        </Span>

        <Habit>
          <Checkbox
            // checked={checked}
            toggleCheckbox={toggleCheckbox}
            header={header}
          />
          {props.name}
        </Habit>
        <Type type={props.type}>{props.type}</Type>
        <Days>{props.days}</Days>

      </HabitLi>
    </>
  )

}

export default Header