import React from "react"
import { graphql } from "gatsby"

import { Header1, Body } from "../components/Typography"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Image from "gatsby-image"

import styled from "styled-components"

const StyledHeader1 = styled(Header1)`
  margin-bottom: 20px;
`

const AboutWrapper = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 30px;
  align-items: center;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
`

const AboutDetails = styled.div``

const AboutImage = styled(Image)`
  height: 0;
  width: 100%;
  padding-top: 100%;
`

interface AboutPageProps {
  data: Record<any, any>
}

const AboutPage: React.FC<AboutPageProps> = ({ data }) => (
  <Layout>
    <SEO title="About" />
    <AboutWrapper>
      <AboutDetails>
        <StyledHeader1>About</StyledHeader1>
        <Body>{data.contentfulSiteContentAboutTextTextNode.aboutText}</Body>
      </AboutDetails>
      <AboutImage fluid={data.contentfulSiteContent.aboutImage.fluid} />
    </AboutWrapper>
  </Layout>
)

export default AboutPage

export const query = graphql`
  query AboutPage {
    contentfulSiteContentAboutTextTextNode {
      aboutText
    }
    contentfulSiteContent {
      aboutImage {
        fluid(maxWidth: 600) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
  }
`
