import React from 'react'
import { Helmet } from 'react-helmet'

import { graphql, useStaticQuery } from 'gatsby'

const HelmetCompoent: React.FC = () => {
  const data = useStaticQuery(graphql`
    query HelmetComponentQuery {
      site {
        siteMetadata {
          title
        }
      }
    }        
  `)

  return (
    <Helmet htmlAttributes={{lang: 'en'}} titleTemplate={`${data.site.siteMetadata.title} · %s`} defaultTitle={data.site.siteMetadata.title} />
  )
}

export default HelmetCompoent
