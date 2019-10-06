import { IBlog } from '../../../../core/@types/IBlog'

export interface IProps {
  pageContext: {
    node: IBlog
    blog: {
      next: IBlog
      previous: IBlog
    }
  }
}
