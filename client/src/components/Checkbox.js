import styled from "styled-components"
import { HiCheck } from "react-icons/hi"

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${({ checked }) => (checked) ? "salmon" : "#d9d8d8"};
  border-radius: 3px;
  transition: all 150ms;

  ${Icon} {
    visibility: ${({ checked }) => (checked) ? "visible" : "hidden"}
  }
`

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  padding-right: 7px;
`

function Checkbox ({ checked, toggleCheckbox }) {

  return (
    <CheckboxContainer>
      <StyledCheckbox checked={checked} onClick={toggleCheckbox}>
        <Icon viewBox="-3 1 22 22">
          <HiCheck color={"white"}/>
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
  )
}

export default Checkbox