import React, { useState } from "react"

import styled from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"

const ToggleWrapper = styled.div`
  position: relative;
  border-radius: 15px;
  height: 30px;
  width: 60px;
  box-shadow: ${({ theme }): string => theme.mode.innerShadow};
`

interface ToggleHandleProps {
  checked: boolean
}

const ToggleHandle = styled.button<ToggleHandleProps>`
  border: none;
  position: absolute;
  top: 50%;
  margin-top: -20px;
  cursor: pointer;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: ${({ theme }): string => theme.mode.concaveGradient};
  box-shadow: ${({ theme }): string => theme.mode.dropShadow};
  left: ${({ checked }): string => (checked ? "25px" : "-5px")};
  transition: 0.2s ease-in-out;
`

interface ToggleButtonProps {
  onClick: () => any
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ onClick }) => {
  const [checked, setChecked] = useState(false)
  return (
    <ToggleWrapper>
      <ToggleHandle
        checked={checked}
        onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
          e.preventDefault()
          onClick()
          setChecked(!checked)
        }}
      >
        {checked ? (
          <FontAwesomeIcon icon={faMoon} color="white" />
        ) : (
          <FontAwesomeIcon icon={faSun} />
        )}
      </ToggleHandle>
    </ToggleWrapper>
  )
}

export default ToggleButton
