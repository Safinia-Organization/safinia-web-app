import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/SEO"

import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

interface TermsPageProps {
  data: Record<any, any>
}

const TermsPage: React.FC<TermsPageProps> = ({ data }) => (
  <Layout>
    <SEO title="Privacy" />
    {documentToReactComponents(
      data.contentfulSiteContentTermsAndConditionsRichTextNode.json
    )}
  </Layout>
)

export default TermsPage

export const query = graphql`
  query TermsPageQuery {
    contentfulSiteContentTermsAndConditionsRichTextNode {
      json
    }
  }
`
