import {graphql} from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'

import {FaFacebook, FaTwitter} from 'react-icons/fa'

import {Layout} from '../components/layout'

import {Card} from '../components/card'
import {Chip} from '../components/chip'

interface PropsInterface {
  location: object,
  data: {
    [key: string]: any,
    site: {
      siteMetadata: {
        title: string,
        siteUrl: string,
        author: string,
        description: string,
        fbApp: string,
      },
    },
    allAuthorsJson: {
      edges: {
        node: {
          user: string,
          name: string,
          facebook: string,
          twitter: string,
        },
      }[],
    },
  },
}
export default class AuthorListPage extends React.Component<PropsInterface> {
  public render(): object {
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteUrl = this.props.data.site.siteMetadata.siteUrl
    const siteAuthor = this.props.data.site.siteMetadata.author
    const siteDescription = this.props.data.site.siteMetadata.description
    const facebookAppID = this.props.data.site.siteMetadata.fbApp

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{lang: 'en'}}
          meta={[
            {
              content: `${siteTitle} · Authors`,
              name: 'name',
            },
            {
              content: siteDescription,
              name: 'description',
            },
            {
              content: siteAuthor,
              name: 'author',
            },
            {
              content: `${siteUrl}/default.jpg`,
              name: 'image',
            },
            {
              content: siteUrl,
              property: 'og:url',
            },
            {
              content: 'article',
              property: 'og:type',
            },
            {
              content: 'th_TH',
              property: 'og:locale',
            },
            {
              content: 'en_US',
              property: 'og:locale:alternate',
            },
            {
              content: `${siteTitle} · Authors`,
              property: 'og:title',
            },
            {
              content: siteDescription,
              property: 'og:description',
            },
            {
              content: facebookAppID,
              property: 'fb:app_id',
            },
            {
              content: 'https://facebook.com/rayriffy',
              property: 'article:author',
            },
            {
              content: `${siteUrl}/default.jpg`,
              property: 'og:image',
            },
            {
              content: `${siteUrl}/default.jpg`,
              property: 'og:image:secure_url',
            },
            {
              content: 'banner',
              property: 'og:image:alt',
            },
            {
              content: 'summary_large_image',
              name: 'twitter:card',
            },
            {
              content: '@rayriffy',
              name: 'twitter:site',
            },
            {
              content: '@rayriffy',
              name: 'twitter:creator',
            },
            {
              content: `${siteTitle} · Authors`,
              name: 'twitter:title',
            },
            {
              content: siteDescription,
              name: 'twitter:description',
            },
            {
              content: `${siteUrl}/default.jpg`,
              name: 'twitter:image',
            },
          ]}
          title={`${siteTitle} · Authors`}
        >
          <script type='application/ld+json' data-react-helmet='true'>
            {`
              {
                "@context": "http://schema.org/",
                "@type" : "Website",
                "url" : "${siteUrl}"
              }
            `}
          </script>
        </Helmet>
        <Chip name='Authors' />
        {this.props.data.allAuthorsJson.edges.map(({node}) => {
          return (
            <Card
              key={`/author/${node.user}`}
              slug={`/author/${node.user}`}
              banner={this.props.data[node.user].childImageSharp.fluid}
              title={node.name}
              status='published'
              link={true}
            >
              <FaFacebook />{' '}
              <a href={node.facebook} rel='noopener noreferrer' target='_blank'>
                {node.facebook.split('/')[3]}
              </a>
              <br />
              <FaTwitter />{' '}
              <a
                href={'https://twitter.com/' + node.twitter.split('@')[1]}
                rel='noopener noreferrer'
                target='_blank'
              >
                {node.twitter}
              </a>
            </Card>
          )
        })}
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query authorPageQuery {
    site {
      siteMetadata {
        title
        description
        author
        siteUrl
        fbApp
      }
    }
    allAuthorsJson(sort: {fields: [name], order: ASC}) {
      edges {
        node {
          user
          name
          facebook
          twitter
        }
      }
    }
    rayriffy: file(relativePath: {eq: "rayriffy.jpg"}) {
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
    SiriuSStarS: file(relativePath: {eq: "SiriuSStarS.jpg"}) {
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
