import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Layout from '../components/layout'
import Footer from '../components/footer'
import { rhythm } from '../utils/typography'
import Style from '../components/theme.module.css'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )
    const posts = get(this, 'props.data.allMarkdownRemark.edges')
    const { currentPage, numPages } = this.props.pageContext

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
        />
        {posts.map(({ node }) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug
          const img_url = 'https://storage.rayriffy.com'+node.fields.slug+'banner.jpg'
          return (
            <div key={node.fields.slug} className={[Style.article]}>
              <div className={Style.articleteaser + ' ' + Style.displayblock}>
                <Link to={node.fields.slug}><img src={img_url} /></Link>
              </div>
              <h1
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
                className={Style.articletitle}
              >
                <Link style={{ textDecoration: 'none', color: '#000000', boxShadow: 'none' }} to={node.fields.slug}>
                  {title}
                </Link>
              </h1>
              <div className={Style.articlemeta}>
                Written by Phumrapee Limpianchop {node.frontmatter.date}
              </div>
              <p className={Style.articlesubtitle}>{node.frontmatter.subtitle}</p>
            </div>
          )
        })}
        <ul className={Style.pagination}>
        {
          Array.from({ length: numPages }, (_, i) => (
            <li
              key={`pagination-number${i + 1}`}
              className={i + 1 === currentPage ? Style.active : ''}
            >
              <Link 
                to={`/${i === 0 ? '' : 'pages/' + (i + 1)}`}
              >
                {i + 1}
              </Link>
            </li>
          ))
        }
        </ul>
        <Footer />
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: $limit, skip: $skip) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            subtitle
          }
        }
      }
    }
  }
`