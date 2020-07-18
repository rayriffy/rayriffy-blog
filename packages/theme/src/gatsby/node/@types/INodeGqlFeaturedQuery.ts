import { IContentfulBlogPost, IEdges } from '.'

export interface INodeGqlFeaturedQuery {
  featured: IEdges<IContentfulBlogPost>
}
