import { FluidObject } from 'gatsby-image'

export interface ICardProps {
  blog: {
    title: string
    subtitle?: string
    date?: string
    banner?: {
      childImageSharp: {
        fluid: FluidObject
      }
    }
  }
  author?: {
    name: string
    user: string
  }
  slug?: string
  type: 'post' | 'listing'
  boxShadow?: string
}
