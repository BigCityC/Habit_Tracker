import clock from './auth/images/clock-head.jpg'
import React from 'react'
import styled from 'styled-components'

const ImgWrapper = styled.div`
  text-align: center;
  margin: 24px 0 12px 0;
`

const StyledImg = styled.img`
  width: 45%;
`

const ImgRef = styled.div`
  font-size: 8px;
  font-family: sans-serif;

  a {
    text-decoration: none;
    color: black;
  }
`

const referenceLink = "https://unsplash.com/@rodolfobarreto?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"

export default function ClockPicture() {

  return (
      <ImgWrapper>
        <StyledImg src={clock} alt="clock"/>
        <ImgRef>Photo by <a href={referenceLink}>RODOLFO BARRETO</a> on Unsplash</ImgRef>
      </ImgWrapper>
      )
}

