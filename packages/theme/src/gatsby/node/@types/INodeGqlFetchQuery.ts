import {
  IContentfulAuthor,
  IContentfulBlogPost,
  IContentfulCategory,
  IEdges,
} from './'

export interface INodeGqlFetchQuery {
  blogs: IEdges<IContentfulBlogPost>
  authors: IEdges<IContentfulAuthor>
  categories: IEdges<IContentfulCategory>
}
