import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import HabitList from '../components/HabitList'
import HabitModal from '../components/HabitModal'
import { getHabitList } from '../components/API'
import { User } from '../helpers/context'
import Loader from '../components/Loader'

const Container = styled.div`
  @media screen and (min-device-width: 481px) {
    /* styles for browsers larger than 481px; */
    width: 90%;
    margin: 0 auto;
  }
`
const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`

const Title = styled.h3`
  margin-bottom: 0;
`

const SearchBarDiv = styled.div`
  display: flex;
`

const ModalDiv = styled.div`
  align-self: center;
  margin-left: 15px;
`

const SearchBar = styled.input`
  border-radius: 10px;
  border: none;
  align-self: center;
  background-color: #CB6A6A;
  opacity: 30%;
  padding: 5px;
  color: white;
  width: 50%;
  min-width: 150px;

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
  flex-wrap: nowrap;
  padding-left: 0;
  text-align: center;
`

const MenuLi = styled.li`
  //Adapt the bottom border on active prop
  border-bottom: ${({ active }) => active === true && '2px solid #CB6A6A'};
  list-style: none;
  padding: 0 2px 0 5px;
  margin-left: 10px;
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

const sampleData = [
  {
    name: 'habit1',
    category: 'good',
    color: '#B80000',
    _id: 1,
    date_added: new Date(),
    completed_dates: [],
  },
  {
    name: 'habit2',
    category: 'bad',
    color: '#B80000',
    _id: 2,
    date_added: new Date(),
    completed_dates: [],
  }
]

function Scorecard () {

  const [menu, setMenu,] = useState(initMenu)
  const [habits, setHabits] = useState([])
  const [inputValue, setInputValue] = useState('')
  const { user } = React.useContext(User)

  useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem('tracker.habits'))
    if (user.type === 'guest') {
      if (!habits.length) {
        setHabits(sampleData)
      }
      if (storedHabits) {
        setHabits(storedHabits)
      }
    } else {
      async function getHabits () {
        try {
          //get habit list from server
          const res = await getHabitList()
          setHabits(res.data)
        } catch (error) {
          console.log(error)
        }
      }

      getHabits()
    }
  }, [])

  useEffect(() => {
    if (user.type === 'guest') {
      localStorage.setItem('tracker.habits', JSON.stringify(habits))
    }
  }, [habits])

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
    <Container>
      <TopSection>
        <Title>Habit Scorecard</Title>
        <SearchBarDiv>
          <SearchBar type="text" placeholder="Search" value={inputValue} onChange={handleChange}/>
          <ModalDiv>
            <HabitModal setHabits={setHabits}/>
          </ModalDiv>
        </SearchBarDiv>
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
        {!habits.length ? <Loader/> :
          <HabitList
            habits={habits}
            setHabits={setHabits}
            inputValue={inputValue}
            menu={menu}/>
        }
      </Main>
    </Container>
  )
}

export default Scorecard