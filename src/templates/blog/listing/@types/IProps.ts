import { IAuthor } from '../../../../core/@types/IAuthor'
import { IBlog } from '../../../../core/@types/IBlog'

export interface IProps {
  pageContext: {
    currentPage: number
    numPages: number
    featured: {
      node: IBlog
    }
  }
  data: {
    allMarkdownRemark: {
      edges: {
        node: IBlog
      }[]
    }
    allAuthorsJson: {
      edges: {
        node: IAuthor
      }[]
    }
  }
}