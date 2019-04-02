import {graphql} from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'

import {FluidObject} from 'gatsby-image'

import {Layout} from '../components/layout'

import {Card} from '../components/card'

interface PropsInterface {
  data: {
    site: {
      siteMetadata: {
        title: string,
      },
    },
    banner: {
      childImageSharp: {
        fluid: FluidObject,
      },
    },
  },
}
export default class NotFoundPage extends React.Component<PropsInterface> {
  public render(): object {
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <Layout>
        <Helmet
          htmlAttributes={{lang: 'en'}}
          title={`${siteTitle} · Not Found`}
        />
        <Card
          slug='/'
          banner={this.props.data.banner.childImageSharp.fluid}
          title='NOT FOUND'
          subtitle='Whoops! Looks like you&#39;re lost in the woods...with Cirno.'
          link={false}
        >
          <a href='/'>Back to home</a>
        </Card>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    banner: file(relativePath: {eq: "404.jpg"}) {
      childImageSharp {
        fluid(maxWidth: 1000, quality: 90) {
          base64
          tracedSVG
          aspectRatio
          src
          srcSet
          srcWebp
          srcSetWebp
          sizes
        }
      }
    }
  }
`
