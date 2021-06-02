import styled, { keyframes } from "styled-components"
import { useEffect } from "react"
import BaseAnimation from "./BaseAnimation"

const FadeOutAnimation = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

const FadeOut = styled(BaseAnimation)`
  animation-name: ${FadeOutAnimation};
`

const Response = styled.p`
  color: white;
  position: absolute;
  bottom: 0;
  left: 10px;
`

function Message ({ setConfirmation }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      setConfirmation(false)
    }, 2500)
    return () => {clearTimeout(timer)}
  }, [])

  return (
    <FadeOut>
      <Response>Habit Added...</Response>
    </FadeOut>
  )
}

export default Message