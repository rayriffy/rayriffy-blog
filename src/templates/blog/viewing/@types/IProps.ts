import { IAuthor } from '../../../../core/@types/IAuthor'
import { IBlog } from '../../../../core/@types/IBlog'

export interface IProps {
  pageContext: {
    next: {
      fields: {
        slug: string
      }
      frontmatter: {
        title: string
      }
    }
    previous: {
      fields: {
        slug: string
      }
      frontmatter: {
        title: string
      }
    }
  }
  data: {
    markdownRemark: IBlog
    authorsJson: IAuthor
  }
}
