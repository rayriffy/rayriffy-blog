import { IAuthor } from '../../../../core/@types/IAuthor'
import { IChildImageSharp } from '../../../../core/@types/IChildImageSharp'

interface IAuthorWithBanner extends IAuthor {
  banner: {
    localFile: IChildImageSharp
  }
}

export interface IProps {
  pageContext: {
    authors: IAuthorWithBanner[]
  }
}
