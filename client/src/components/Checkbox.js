import styled from 'styled-components';
import { HiCheck } from 'react-icons/hi'

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  // Hide checkbox visually but remain accessible to screen readers.
  // Source: https://polished.js.org/docs/#hidevisually
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${props => props.checked ? 'salmon' : '#d9d8d8'};
  border-radius: 3px;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px #efc8cf;
  }

  ${Icon} {
    visibility: ${props => props.checked ? 'visible' : 'hidden'}
  }
`


const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  padding-right: 7px;
`

function Checkbox({ className, checked, ...props }) {


  return (
    <CheckboxContainer className={className}>
      <HiddenCheckbox checked={checked} {...props} />
      <StyledCheckbox checked={checked} >
        <Icon viewBox="-3 1 22 22">
          <HiCheck color={'white'} />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
  )
}
export default Checkbox;