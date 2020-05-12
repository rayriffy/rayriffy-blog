import { IContentfulBlogPost } from '.'

export interface IContentfulCategory {
  key: string
  name: string
  desc: string
  blog_post: IContentfulBlogPost[]
}
