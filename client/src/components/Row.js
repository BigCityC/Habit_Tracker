import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Box from './Box'
import { GithubPicker } from 'react-color'
import { MdColorLens } from 'react-icons/md'
import { updateHabit } from './API'

const Container = styled.div`
  display: flex;
  position: relative;
`

const Icon = styled.div`
  display: none;
  position: absolute;
  top: 5px;
`

const Name = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  background-color: #538CB0;
  flex: 0 0 145px;
  max-width:145px;
  text-align: center;
  word-break: break-word;
  
  @media screen and (max-width: 420px){
    font-size: 12px;
    flex: 0 0 125px;
  }

  :hover ${Icon} {
    display: inline-block;
  }
`
const Boxes = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`
const ColorWrapper = styled.div`
  position: absolute;
  z-index: 2;
`

//sets a click event listener on the color picker
function useOuterClick (callback) {
  const callbackRef = useRef() // initialize mutable callback ref
  const innerRef = useRef() // returned to client, who sets the "border" element

  // update callback on each render, so second useEffect has most recent callback
  useEffect(() => { callbackRef.current = callback })
  useEffect(() => {
    document.addEventListener('click', handleClick)

    function handleClick (e) {
      if (innerRef.current && callbackRef.current &&
        !innerRef.current.contains(e.target)
      ) callbackRef.current(e)
    }

    return () => document.removeEventListener('click', handleClick)
  }, []) // no dependencies -> stable click listener

  return innerRef // convenience for client (doesn't need to init ref himself)
}

const presetColors = ['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#FF9E9E', '#1273DE', '#004DCF', '#5300EB']

const Row = ({ habit, formattedDateArray, updateDateCompleted, updateLocalColor }) => {
  const [color, setColor] = useState(habit.color)
  const [colorPicker, setColorPicker] = useState(false)
  const innerRef = useOuterClick(() => {setColorPicker(false)})


  //displays the color picker
  function toggleColorPicker () {
    setColorPicker(!colorPicker)
  }



  //changes color for row
  function handleChange (color) {
    setColor(color.hex)
    //update locally
    // if (guest) {
    //   updateLocalColor(color.hex, habit._id)
    // }
    // else{
      //update on database
      updateHabit({ data: color.hex, id: habit._id, action: 'update-color' })
        .then((res) => console.log(res))
        .catch(console.log)
    // }
  }

  return (
    <Container>
      <Name>
        <Icon ref={innerRef}>
          <MdColorLens onClick={toggleColorPicker} color={color}/>
        </Icon>
        {colorPicker &&
        <ColorWrapper>
          <GithubPicker
            color={color}
            colors={presetColors}
            onChange={handleChange}
          />
        </ColorWrapper>}
        {habit.name}
      </Name>

      <Boxes>
        {formattedDateArray.map((date, index) =>
          <Box
            key={index}
            date={date}
            color={color}
            completedDates={habit.completed_dates}
            id={habit._id}
            updateDateCompleted={updateDateCompleted}
          />
        )}
      </Boxes>
    </Container>
  )
}

export default Row