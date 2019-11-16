import { ICategory } from '../../../../core/@types/ICategory'
import { IChildImageSharp } from '../../../../core/@types/IChildImageSharp'

interface ICategoryWithBanner extends ICategory {
  banner: {
    localFile: IChildImageSharp
  }
}

export interface IProps {
  pageContext: {
    categories: ICategoryWithBanner[]
  }
}
