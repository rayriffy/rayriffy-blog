import { IChildImageSharp } from './IChildImageSharp'

export interface ICardProps {
  blog: {
    title: string
    subtitle?: string
    date?: string
    banner?: {
      localFile: IChildImageSharp
    }
  }
  author?: {
    name: string
    user: string
  }
  slug?: string
  type: 'post' | 'listing'
  boxShadow?: string
}
