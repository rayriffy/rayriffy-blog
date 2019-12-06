import { IAuthor } from '../../../../core/@types/IAuthor'
import { IBlog } from '../../../../core/@types/IBlog'

export interface IProps {
  pageContext: {
    author: IAuthor
    blogs: {
      node: IBlog
    }[]
    pathPrefix: string
    page: {
      current: number
      max: number
    }
  }
}
