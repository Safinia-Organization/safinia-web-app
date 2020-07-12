import React, { useState, useEffect } from "react"

import styled, { keyframes, css } from "styled-components"

import useWindowSize from "../utils/useWindowSize"

interface BarProps {
  animate: AnimateState
}

enum AnimateState {
  Initial,
  Open,
  Closed,
}

const Wrapper = styled.button`
  cursor: pointer;
  border: none;
  background: ${({ theme }): string => theme.mode.background};
  padding: 0;
  position: relative;
  height: 35px;
  width: 35px;
`

const Bar = styled.span`
  position: absolute;
  background: ${({ theme }): string => theme.mode.highContrast};
  left: 0;
  height: 3px;
  width: 36px;
  border-radius: 1.5px;
`

const Bar1AnimationOpen = keyframes`
  0% {
    top: 6.5px;
  }
  50% {
    top: 16.5px;
    transform: rotate(0deg);
  }
  100% {
    top: 16.5px;
    transform: rotate(45deg);
  }
`
const Bar1AnimationClosed = keyframes`
  0% {
    top: 16.5px;
    transform: rotate(45deg);
  }
  50% {
    top: 16.5px;
    transform: rotate(0deg);
  }
  100% {
    top: 6.5px;
  }
`

const Bar1 = styled(Bar)<BarProps>`
  top: 6.5px;
  ${({ animate }): any => {
    if (animate !== AnimateState.Initial) {
      if (animate === AnimateState.Closed) {
        return css`
          animation: ${Bar1AnimationClosed} 0.2s ease-in-out forwards;
        `
      } else {
        return css`
          animation: ${Bar1AnimationOpen} 0.2s ease-in-out forwards;
        `
      }
    }
  }}
`

const Bar2AnimationOpen = keyframes`
  50% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(45deg);
  }
`

const Bar2AnimationClosed = keyframes`
  0% {
    transform: rotate(45deg);
  }
  50% {
    transform: rotate(0deg);
  }
`
const Bar2 = styled(Bar)<BarProps>`
  top: 16.5px;
  ${({ animate }): any => {
    if (animate !== AnimateState.Initial) {
      if (animate === AnimateState.Closed) {
        return css`
          animation: ${Bar2AnimationClosed} 0.2s ease-in-out forwards;
        `
      } else {
        return css`
          animation: ${Bar2AnimationOpen} 0.2s ease-in-out forwards;
        `
      }
    }
  }}
`

const Bar3AnimationOpen = keyframes`
  0% {
    top: 26.5px;
  }
  50% {
    top: 16.5px;
    transform: rotate(0deg);
  }
  100% {
    top: 16.5px;
    transform: rotate(-45deg);
  }
`

const Bar3AnimationClosed = keyframes`
  0% {
    top: 16.5px;
    transform: rotate(-45deg);
  }
  50% {
    top: 16.5px;
    transform: rotate(0deg);
  }
  100% {
    top: 26.5px;
  }
`

const Bar3 = styled(Bar)<BarProps>`
  top: 26.5px;
  ${({ animate }): any => {
    if (animate !== AnimateState.Initial) {
      if (animate === AnimateState.Closed) {
        return css`
          animation: ${Bar3AnimationClosed} 0.2s ease-in-out forwards;
        `
      } else {
        return css`
          animation: ${Bar3AnimationOpen} 0.2s ease-in-out forwards;
        `
      }
    }
  }}
`

interface HamburgerMenuProps {
  menuState: boolean
  onClick: () => any
  className?: string
  [x: string]: any
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  menuState,
  onClick,
  className,
  ...rest
}) => {
  const [animate, setAnimate] = useState<AnimateState>(AnimateState.Initial)
  const [width] = useWindowSize()
  useEffect(() => {
    if (width >= 700) setAnimate(AnimateState.Initial)
  }, [width])
  return (
    <Wrapper
      {...rest}
      aria-label="navigation"
      onClick={(): void => {
        setAnimate(
          animate === AnimateState.Initial || animate === AnimateState.Closed
            ? AnimateState.Open
            : AnimateState.Closed
        )
        onClick()
      }}
      className={className}
    >
      <Bar1 animate={animate} />
      <Bar2 animate={animate} />
      <Bar3 animate={animate} />
    </Wrapper>
  )
}

export default HamburgerMenu
