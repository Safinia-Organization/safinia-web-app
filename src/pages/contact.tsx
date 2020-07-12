import React, { useState } from "react"
import { graphql } from "gatsby"

import { Header1, Body } from "../components/Typography"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

import styled from "styled-components"

const StyledHeader1 = styled(Header1)`
  margin-top: 40px;
  margin-bottom: 20px;
`

const ContactForm = styled.form`
  margin-top: 20px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr;
  @media (min-width: 600px) {
    grid-template-columns: 100px 1fr;
  }
  align-items: center;
`

const ContactLabel = styled.label`
  font-weight: 700;
`

const ContactSubject = styled.input`
  box-shadow: ${({ theme }): string => theme.mode.innerShadow};
  background: ${({ theme }): string => theme.mode.background};
  color: ${({ theme }): string => theme.mode.text};
  border: none;
  &:focus {
    outline: none;
  }
  border-radius: 17.5px;
  padding: 0 17.5px;
  font-size: 14px;
  height: 35px;
  @media (min-width: 600px) {
    border-radius: 25px;
    padding: 0 25px;
    font-size: 18px;
    height: 50px;
  }
`

const ContactBody = styled.textarea`
  resize: none;
  box-shadow: ${({ theme }): string => theme.mode.innerShadow};
  background: ${({ theme }): string => theme.mode.background};
  color: ${({ theme }): string => theme.mode.text};
  border: none;
  &:focus {
    outline: none;
  }
  border-radius: 17.5px;
  padding: 17.5px 17.5px;
  font-size: 14px;
  @media (min-width: 600px) {
    border-radius: 25px;
    padding: 25px 25px;
    font-size: 18px;
  }
`

const ContactSubmit = styled.button`
  @media (min-width: 600px) {
    grid-column-start: 2;
  }
  background: ${({ theme }): string => theme.common.palette.brandGradient};
  box-shadow: ${({ theme }): string => theme.common.palette.brandGlow};
  color: #fff;
  border: none;
  height: 50px;
  width: 140px;
  justify-self: end;
  border-radius: 25px;
  padding: 0 20px;
  cursor: pointer;
  @media (min-width: 600px) {
    justify-self: start;
    height: 60px;
    border-radius: 30px;
    padding: 0 30px;
    width: 150px;
  }
  &:active {
    background: ${({ theme }): string =>
      theme.common.palette.brandGradientActive};
  }
`

interface ContactPageProps {
  data: Record<any, any>
}

const ContactPage: React.FC<ContactPageProps> = ({ data }) => {
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")

  const sendEmail = (): void => {
    window.location.href = `mailto:support@safinia.com?subject=${subject}&body=${body}`
  }
  return (
    <Layout>
      <SEO title="Contact" />
      <StyledHeader1>Contact</StyledHeader1>
      <Body>{data.contentfulSiteContentContactTextTextNode.contactText}</Body>
      <ContactForm>
        <ContactLabel>Subject:</ContactLabel>
        <ContactSubject
          value={subject}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            setSubject(e.target.value)
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>): void => {
            if (e.keyCode === 13) {
              e.preventDefault()
              sendEmail()
            }
          }}
        />
        <ContactLabel>Message:</ContactLabel>
        <ContactBody
          rows={10}
          value={body}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => {
            setBody(e.target.value)
          }}
        />
        <ContactSubmit onClick={sendEmail}>Submit</ContactSubmit>
      </ContactForm>
    </Layout>
  )
}

export default ContactPage

export const query = graphql`
  query ContactPage {
    contentfulSiteContentContactTextTextNode {
      contactText
    }
  }
`
