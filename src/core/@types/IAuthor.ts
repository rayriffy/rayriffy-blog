import { IChildImageSharp } from './IChildImageSharp'

export interface IAuthor {
  user: string
  name: string
  twitter: string
  facebook: string
  banner: {
    localFile: IChildImageSharp
  }
}
