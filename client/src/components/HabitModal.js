import React, { useState } from 'react'
import { addHabit } from './API'
import Message from './Message'
import { handleColor } from './ListItem'
import { IconContext } from 'react-icons'
import Modal from 'react-modal'
import { MdAddCircle, MdCheck } from 'react-icons/md'
import styled from 'styled-components'

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(96,96,96,0.75)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#182b66',
    border: 'none',
  }
}

const AddHabit = styled.button`
  background: none;
  outline: none;
  border: none;

  :hover {
    cursor: pointer;
  }
`

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  min-width: 250px;
  min-height: min-content;
`

const H2 = styled.h2`
  color: white;
  margin: 5px;
`

const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: 2px solid white;
  color: white;
  width: 200px;

  :focus {
    outline: none;
  }
`

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
  padding: 2px ;
`

const TypeBtn = styled.input.attrs({ type: 'button' })`
  border-radius: 10px;
  background: transparent;
  padding: 5px;
  border: 2px solid ${({ value }) => handleColor(value)};
  color: white;

  :focus {
    background: #DEDEDE;
    color: black;
  }
`

const SubmitDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
const Submit = styled.button.attrs({ type: 'submit' })`
  background-color: #CB6A6A;
  color: white;
  padding: 5px 7px;
  text-align: center;
  border: none;
  border-radius: 50%;

  :hover {
    background-color: #AC5252;
  }

`

const initHabitForm = {
  name: '',
  type: '',
  days: 0,
}

function HabitModal ({setHabits}) {

  const [modalIsOpen, setIsOpen] = useState(false)
  const [habitForm, setHabitForm] = useState(initHabitForm)
  const [confirmation, setConfirmation] = useState(false)
  

  function openModal () {
    setIsOpen(true)
  }

  function afterOpenModal () {
    // this function must remain for the modal to work
  }

  function closeModal () {
    setIsOpen(false)
  }

  //API call when the form is submitted to add a new habit to the list
  function handleSubmit (event) {
    event.preventDefault()
    //habit form cant be empty
    if (habitForm.name === '') {
      alert('No habit seen')
    } if (habitForm.type === '') {
      alert('You must enter a type')
    }
    else {
      addHabit({ ...habitForm })
        .then((res) => {
          setConfirmation(true)
          //adds habit with added checked property
          const _habits = res.data.map(habit => {
            habit.checked = false
            return habit
          })

          setHabits(_habits)
        })
        .catch(error => {
          alert(error.response.data)
        })
        .finally(()=>
        {
          setHabitForm(initHabitForm)
        })
    }

  }

  function handleFormUpdate (event) {
    const value = event.target.value
    const name = event.target.name
    setHabitForm({ ...habitForm, [name]: value })
  }

  return (
    <div>
      <AddHabit onClick={openModal}>
        <IconContext.Provider value={{ color: '#3C4C80' }}><MdAddCircle size={50}/></IconContext.Provider>
      </AddHabit>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add a Habit"
        appElement={document.getElementById('root')}
      >

        <Container>

          <H2>Habit</H2>

          <form onSubmit={handleSubmit}>
            <Input name="name" value={habitForm.name} onChange={handleFormUpdate}/>
            <Buttons>
              <TypeBtn type="button" name="type" value='good' onClick={handleFormUpdate}/>
              <TypeBtn type="button" name="type" value='bad' onClick={handleFormUpdate}/>
              <TypeBtn type="button" name="type" value='neutral' onClick={handleFormUpdate}/>
            </Buttons>
            <SubmitDiv >
              <Submit type="submit"><MdCheck size={20}/></Submit>
            </SubmitDiv>
          </form>

          {confirmation && <Message setConfirmation={setConfirmation} />}

        </Container>

      </Modal>
    </div>
  )
}

export default HabitModal
