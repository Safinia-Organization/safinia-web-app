import React, { useContext, useState, useEffect } from "react"

import Image from "gatsby-image"
import { Link, graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

import HamburgerMenu from "../components/HamburgerMenu"
import ToggleButton from "../components/ToggleButton"
import { ThemeToggle, ThemeMode } from "../theme"
import useWindowSize from "../utils/useWindowSize"

const Navbar = styled.nav`
  display: flex;
  height: 50px;
  align-items: center;
  font-size: 16px;
`

const Footer = styled.footer`
  height: 50px;
  display: flex;
  align-items: center;
  font-size: 12px;
`

const NavLinkWrapper = styled.div`
  display: none;
  @media (min-width: 700px) {
    display: block;
  }
`

const NavLink = styled(Link)`
  text-decoration: none;
  text-transform: uppercase;
  margin-right: 30px;
  font-weight: 300;
  color: inherit;
`

const NavOverlayLink = styled(Link)`
  pointer-events: auto;
  text-decoration: none;
  text-transform: uppercase;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 300;
  color: inherit;
`

const Copyright = styled.div`
  color: ${({ theme }): string => theme.mode.secondaryText};
  flex-grow: 1;
`

const FooterLink = styled(Link)`
  color: ${({ theme }): string => theme.mode.secondaryText};
  text-decoration: none;
  margin-right: 20px;
`

const Page = styled.main`
  background: ${({ theme }): string => theme.mode.background};
  min-height: 100vh;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
`

const ContentWrapper = styled.div`
  flex-grow: 1;
  display: flex;
`

const Content = styled.div`
  align-self: stretch;
  display: flex;
  justify-content: center;
  width: 100%;
`

const InnerContent = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
`

const ImageLink = styled(Link)`
  flex-grow: 1;
`

const StyledHamburgerMenu = styled(HamburgerMenu)`
  z-index: 2;
  margin-left: 20px;
  @media (min-width: 700px) {
    display: none;
  }
`

interface NavOverlayProps {
  menuState: boolean
}

const NavOverlay = styled.div<NavOverlayProps>`
  pointer-events: none;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: opacity 0.2s ease-in-out;
  opacity: ${({ menuState }): string => (menuState ? "100%" : "0%")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }): string => theme.mode.background};
`

const Layout: React.FC = ({ children }) => {
  const modeContext = useContext(ThemeToggle)
  const [menuState, setMenuState] = useState(false)
  const toggleMenuState = (): void => {
    setMenuState(!menuState)
  }
  const [width] = useWindowSize()
  useEffect(() => {
    if (width >= 700) setMenuState(false)
  }, [width])

  const data = useStaticQuery(graphql`
    query LayoutQuery {
      file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fixed(width: 142, height: 30) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  return (
    <Page>
      <Navbar>
        <ImageLink aria-label="home" to="/">
          <Image fixed={data.file.childImageSharp.fixed} />
        </ImageLink>
        <NavLinkWrapper>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/team">Team</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </NavLinkWrapper>
        <ToggleButton
          aria-label="toggle light/dark mode"
          onClick={modeContext.toggleMode}
          checked={modeContext.mode === ThemeMode.Dark}
        />
        <StyledHamburgerMenu
          role="navigation"
          aria-labelledby="nav-overlay"
          menuState={menuState}
          onClick={toggleMenuState}
        />
        <NavOverlay id="nav-overlay" menuState={menuState}>
          {menuState && (
            <React.Fragment>
              <NavOverlayLink to="/">Home</NavOverlayLink>
              <NavOverlayLink to="/about">About</NavOverlayLink>
              <NavOverlayLink to="/team">Team</NavOverlayLink>
              <NavOverlayLink to="/contact">Contact</NavOverlayLink>
            </React.Fragment>
          )}
        </NavOverlay>
      </Navbar>
      <ContentWrapper>
        <Content>
          <InnerContent>{children}</InnerContent>
        </Content>
      </ContentWrapper>
      <Footer>
        <Copyright>&copy; 2020 Safinia</Copyright>
        <FooterLink to="/privacy">Privacy</FooterLink>
        <FooterLink to="/terms">Terms</FooterLink>
      </Footer>
    </Page>
  )
}
export default Layout
