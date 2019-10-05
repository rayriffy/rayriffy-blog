import { FluidObject } from 'gatsby-image'

export interface IBlog {
  fields: {
    slug: string
  }
  frontmatter: {
    title: string
    subtitle: string
    author: string
    date: string
    featured: boolean
    banner: {
      childImageSharp: {
        fluid: FluidObject
      }
    }
  }
  html: string
}
