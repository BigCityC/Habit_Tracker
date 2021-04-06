import React, { useState } from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'
import { MdAddCircle } from 'react-icons/md'
import { IconContext } from 'react-icons'

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(96,96,96,0.75)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: '5%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: '#3C4C80',
    border: 'none',
  }
}

const AddHabit = styled.button`
  background: none;
  outline: none;
  border: none;
  position: absolute;
  top: 20%;
  right: 15%;

  :hover {
    cursor: pointer;
  }
`

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  height: 90%;
  width: 100%;
  min-width: 300px;

  border: 1px solid red;

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
  justify-content: center;
  margin: 10px auto;
`

const TypeBtn = styled.input.attrs({ type: 'button' })`
  margin: 0 auto;
  background: transparent;
  border: 1px solid gray;
  color: white;
  padding: 8px;
`

const initHabitForm = {
  habit: '',
  type: ''
}

function HabitModal () {

  const [modalIsOpen, setIsOpen] = useState(false)
  const [habitForm, setHabitForm] = useState(initHabitForm)


  function openModal () {
    setIsOpen(true)
  }

  function afterOpenModal () {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal () {
    setIsOpen(false)
  }

  function handleSubmit(event) {
    // event.preventDefault
    console.log(event.target)
  }

  function handleChange(event) {
    const value = event.target.value
    setHabitForm({...habitForm, habit: value})
  }

  console.log(habitForm)
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
            <Input name="habitName" value={habitForm.value} onChange={handleChange}/>
            <Buttons>
              <TypeBtn type="button" name="good" value='good' />
              <TypeBtn type="button" name="bad" value='bad' />
              <TypeBtn type="button" name="neutral" value='neutral' />
            </Buttons>

            <button type="submit">Submit</button>
          </form>
        </Container>

      </Modal>
    </div>
  )
}

export default HabitModal

