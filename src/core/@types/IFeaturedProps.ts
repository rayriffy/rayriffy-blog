import { IChildImageSharp } from './IChildImageSharp'

export interface IFeaturedProps {
  title: string
  subtitle?: string
  slug?: string
  banner: IChildImageSharp
  featured?: boolean
}
