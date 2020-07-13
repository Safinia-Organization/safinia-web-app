import React from "react"
import { graphql } from "gatsby"

import { Header1, Body } from "../components/Typography"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Image from "gatsby-image"

import styled from "styled-components"

const StyledHeader1 = styled(Header1)`
  margin-top: 40px;
  margin-bottom: 20px;
`

const Team = styled.div`
  margin-top: 30px;
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 1fr 1fr;
  @media (min-width: 600px) {
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (min-width: 800px) {
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`

const CardBorder = styled.div`
  overflow: hidden;
  border-radius: 25px;
  padding: 5px;
  box-shadow: ${({ theme }): string => theme.mode.innerShadow};
`

const Card = styled.div`
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${({ theme }): string => theme.mode.convexGradient};
  box-shadow: ${({ theme }): string => theme.mode.plainDropShadow};
`

const CardMedia = styled(Image)`
  width: 100%;
  height: 0;
  padding-top: 120%;
`
const CardDetails = styled.div`
  padding: 15px;
`
const CardName = styled.p`
  margin: 0;
  margin-bottom: 3px;
  font-weight: 700;
  font-size: 14px;
  @media (min-width: 600px) {
    font-size: 16px;
  }
`

const CardPosition = styled.p`
  margin: 0;
  font-weight: 100;
  font-size: 12px;
  @media (min-width: 600px) {
    font-size: 14px;
  }
`

interface TeamPageProps {
  data: Record<any, any>
}

const TeamPage: React.FC<TeamPageProps> = ({ data }) => {
  data.allContentfulTeam.edges.sort((a: any, b: any) => {
    return a.node.order - b.node.order
  })
  return (
    <Layout>
      <SEO title="Team" />
      <StyledHeader1>Meet the Team</StyledHeader1>
      <Body>{data.contentfulSiteContentTeamTextTextNode.teamText}</Body>
      <Team>
        {data.allContentfulTeam.edges.map(
          (edge: Record<any, any>, index: number) => (
            <CardBorder key={index}>
              <Card>
                <CardMedia fluid={edge.node.headshot.fluid} />
                <CardDetails>
                  <CardName>{edge.node.name}</CardName>
                  <CardPosition>{edge.node.position}</CardPosition>
                </CardDetails>
              </Card>
            </CardBorder>
          )
        )}
      </Team>
    </Layout>
  )
}

export default TeamPage

export const query = graphql`
  query TeamPageQuery {
    allContentfulTeam {
      edges {
        node {
          headshot {
            fluid(maxWidth: 500) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          name
          position
          order
        }
      }
    }
    contentfulSiteContentTeamTextTextNode {
      teamText
    }
  }
`
