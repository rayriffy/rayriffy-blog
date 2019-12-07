import { IAuthor } from './IAuthor'
import { IChildImageSharp } from './IChildImageSharp'

export interface IBlog {
  slug: string
  title: string
  subtitle: string
  author: IAuthor
  date: string
  featured: boolean
  banner: {
    localFile: IChildImageSharp
  }
  content: {
    childMarkdownRemark: {
      html: string
    }
  }
}
