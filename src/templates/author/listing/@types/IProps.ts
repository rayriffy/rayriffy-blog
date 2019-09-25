import { FluidObject } from 'gatsby-image'

import { IAuthor } from '../../../../core/@types/IAuthor'

interface IAuthorWithBanner extends IAuthor {
  banner: {
    childImageSharp: {
      fluid: FluidObject
    }
  }
}

export interface IProps {
  pageContext: {
    authors: IAuthorWithBanner[]
  }
}
