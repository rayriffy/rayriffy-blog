import React from 'react'

import { Helmet } from 'react-helmet-async'

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
    <Helmet
      htmlAttributes={{ lang: 'en' }}
      titleTemplate={`${data.site.siteMetadata.title} · %s`}
      defaultTitle={data.site.siteMetadata.title}
      link={[
        {
          rel: 'stylesheet',
          media: 'print,screen',
          href:
            'https://fonts.googleapis.com/css?family=Niramit|Kanit&display=swap',
        },
      ]}
    />
  )
}

export default HelmetCompoent
