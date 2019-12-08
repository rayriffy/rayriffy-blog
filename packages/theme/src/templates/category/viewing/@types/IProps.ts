import { IBlog } from '../../../../core/@types/IBlog'
import { ICategory } from '../../../../core/@types/ICategory'
import { IChildImageSharp } from '../../../../core/@types/IChildImageSharp'

export interface IProps {
  pageContext: {
    pathPrefix: string
    banner: {
      localFile: IChildImageSharp
    }
    category: ICategory
    blogs: {
      node: IBlog
    }[]
    page: {
      current: number
      max: number
    }
  }
}
