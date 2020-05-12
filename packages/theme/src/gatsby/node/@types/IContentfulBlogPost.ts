import { FluidObject } from 'gatsby-image'

export interface IContentfulBlogPost {
  slug: string
  title: string
  subtitle: string
  date: string
  featured: string
  content: {
    childMarkdownRemark: {
      html: string
    }
  }
  author: {
    user: string
    name: string
  }
  banner: {
    localFile: {
      childImageSharp: {
        fluid: FluidObject
      }
    }
  }
}
