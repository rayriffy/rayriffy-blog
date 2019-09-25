import { FluidObject } from 'gatsby-image'

export interface IData {
  banner: {
    childImageSharp: {
      fluid: FluidObject
    }
  }
}
