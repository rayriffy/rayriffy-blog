import { FluidObject } from 'gatsby-image'

import { IAuthor } from '../../../../core/@types/IAuthor'
import { IBlog } from '../../../../core/@types/IBlog'

export interface IProps {
  pageContext: {
    currentPage: number
    numPages: number
    pathPrefix: string
    banner: {
      childImageSharp: {
        fluid: FluidObject
      }
    }
  }
  data: {
    allMarkdownRemark: {
      edges: {
        node: IBlog
      }[]
    }
    authorsJson: IAuthor
  } 
}
