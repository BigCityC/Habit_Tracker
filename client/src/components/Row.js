import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Box from './Box'
import { GithubPicker } from 'react-color'

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`
const Name = styled.div`
  flex: 2;
  background-color: rgba(86, 114, 204, 0.64);
  padding: 35px;
  margin: 1px;
  text-align: center;
`
const Boxes = styled.div`
  display: flex;
  align-items: center;
`
const ColorWrapper = styled.div`
  position: absolute;
  z-index: 2;
`

const Row = ({ name, result }) => {
  const [color, setColor] = useState('red')
  const [colorPicker, setColorPicker] = useState(false)

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
      <Name onClick={toggleColorPicker}>
        {colorPicker &&
        <ColorWrapper>
          <GithubPicker
            color={color}
            colors={['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB']}
            onChange={handleChange}
          />
        </ColorWrapper>}
        {name}
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