import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Box from './Box'
import { GithubPicker } from 'react-color'
import { MdColorLens } from "react-icons/md"

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

const Icon = styled.div`
  display: none;
`
const Name = styled.div`
  flex: 2;
  background-color: rgba(86, 114, 204, 0.64);
  padding: 30px 10px;
  text-align: center;
  max-width: 200px;

  :hover ${Icon}{ 
    display:inline-block;
  }
`
const Boxes = styled.div`
  display: flex;
  align-items: center;
`
const ColorWrapper = styled.div`
  position: absolute;
  z-index: 2;
`

function useOuterClick(callback) {
  const callbackRef = useRef(); // initialize mutable callback ref
  const innerRef = useRef(); // returned to client, who sets the "border" element

  // update callback on each render, so second useEffect has most recent callback
  useEffect(() => { callbackRef.current = callback; });
  useEffect(() => {
    document.addEventListener("click", handleClick);

    function handleClick(e) {
      if (innerRef.current && callbackRef.current &&
        !innerRef.current.contains(e.target)
      ) callbackRef.current(e);
    }

    return () => document.removeEventListener("click", handleClick);
  }, []); // no dependencies -> stable click listener

  return innerRef; // convenience for client (doesn't need to init ref himself)
}


const Row = ({ habit, result }) => {
  const [color, setColor] = useState('lightgrey')
  const [colorPicker, setColorPicker] = useState(false)

  const innerRef = useOuterClick(() => {setColorPicker(false)});

  useEffect(() => {
    //when color changes from color picker, re render the row with existing completed to update to the color
    if (color === 'lightgrey') {
      setColor("red")
    } else {setColor(color)}
  }, [color])

  //displays the color picker
  function toggleColorPicker () {
    setColorPicker(!colorPicker)
  }

  //changes color for row
  function handleChange (color) {
    setColor(color.hex)
  }

  return (
    <Container>
      <Name>
        <Icon ref={innerRef}>
          <MdColorLens onClick={toggleColorPicker} color={color} />
        </Icon>
        {colorPicker &&
        <ColorWrapper>
          <GithubPicker
            color={color}
            colors={['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB']}
            onChange={handleChange}
          />
        </ColorWrapper>}
        {habit.name}
      </Name>

      <Boxes>
        {result.map((index) =>
          <Box key={index} color={color}/>
        )}
      </Boxes>
    </Container>
  )
}

export default Row