import React, { useContext } from "react"

import Image from "gatsby-image"
import { Link, graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

import ToggleButton from "../components/ToggleButton"
import { ThemeToggle } from "../theme"

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
  @media (min-width: 600px) {
    display: block;
  }
`

const NavbarToggle = styled.button`
  margin-left: 20px;
  cursor: pointer;
  border: none;
  display: flex;
  background: ${({ theme }): string => theme.mode.background};
  padding: 0;
  align-items: stretch;
  flex-direction: column;
  justify-content: space-between;
  height: 28px;
  width: 36px;
  @media (min-width: 600px) {
    display: none;
  }
`

const NavbarToggleBar = styled.span`
  background: ${({ theme }): string => theme.mode.text};
  height: 3px;
  border-radius: 1.5px;
`

const NavLink = styled(Link)`
  color: ${({ theme }): string => theme.mode.text};
  text-decoration: none;
  text-transform: uppercase;
  margin-right: 30px;
  font-weight: 300;
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

const Content = styled.div`
  flex-grow: 1;
  display: flex;
`

const Page = styled.div`
  background: ${({ theme }): string => theme.mode.background};
  height: 100vh;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
`

const ImageWrapper = styled.div`
  flex-grow: 1;
`

const Layout: React.FC = ({ children }) => {
  const toggleMode = useContext(ThemeToggle)
  const data = useStaticQuery(graphql`
    query MyQuery {
      file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fixed(width: 150, height: 40) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  return (
    <Page>
      <Navbar>
        <ImageWrapper>
          <Image fixed={data.file.childImageSharp.fixed} />
        </ImageWrapper>
        <NavLinkWrapper>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/team">Team</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </NavLinkWrapper>
        <ToggleButton onClick={toggleMode} />
        <NavbarToggle>
          <NavbarToggleBar />
          <NavbarToggleBar />
          <NavbarToggleBar />
        </NavbarToggle>
      </Navbar>
      <Content>{children}</Content>
      <Footer>
        <Copyright>&copy; 2020 Safinia</Copyright>
        <FooterLink to="/privacy">Privacy</FooterLink>
        <FooterLink to="/terms">Terms</FooterLink>
      </Footer>
    </Page>
  )
}
export default Layout
