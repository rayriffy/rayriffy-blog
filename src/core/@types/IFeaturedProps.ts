import { IChildImageSharp } from './IChildImageSharp'

export interface IFeaturedProps {
  title: string
  subtitle?: string
  slug?: string
  banner: {
    localFile: IChildImageSharp
  }
  featured?: boolean
}
