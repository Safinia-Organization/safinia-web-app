import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"

import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

interface PrivacyPageProps {
  data: Record<any, any>
}

const PrivacyPage: React.FC<PrivacyPageProps> = ({ data }) => (
  <Layout>
    <SEO title="Privacy" />
    {documentToReactComponents(
      data.contentfulSiteContentPrivacyPolicyRichTextNode.json
    )}
  </Layout>
)

export default PrivacyPage

export const query = graphql`
  query PrivacyPageQuery {
    contentfulSiteContentPrivacyPolicyRichTextNode {
      json
    }
  }
`
