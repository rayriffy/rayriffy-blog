import React from 'react'

import { graphql, useStaticQuery } from 'gatsby'
import { Helmet } from 'react-helmet'

import '../styles/index.styl'

import Card from '../../../core/components/card'
import TransparentLink from '../../../core/components/transparentLink'

import { IData } from '../@types/IData'

const NotFoundComponent: React.FC = () => {
  const data = useStaticQuery<IData>(graphql`
    query NotFoundComponentQuery {
      banner: file(relativePath: { eq: "404.jpg" }) {
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
  `)

  return (
    <React.Fragment>
      <Helmet title='Not Found' />
      <div className='template-404'>
        <div className='container'>
          <Card
            blog={{
              banner: {
                localFile: data.banner,
              },
              subtitle: `Whoops! Looks like you're lost in the woods...with Cirno.`,
              title: 'Not Found',
            }}
            type={`post`}>
            <div className='container'>
              <TransparentLink to={`/`}>Back to home</TransparentLink>
            </div>
          </Card>
        </div>
      </div>
    </React.Fragment>
  )
}

export default NotFoundComponent
