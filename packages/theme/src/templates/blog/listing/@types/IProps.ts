import { IBlog } from '../../../../core/@types/IBlog'

export interface IProps {
  pageContext: {
    blogs: {
      node: IBlog
    }[]
    featured: {
      node: IBlog
    }
    page: {
      current: number
      max: number
    }
  }
}
