import { IContentfulBlogPost, IEdges } from '.'
import { ISite } from '../../../core/@types/ISite'

export interface INodeGqlAPIAuthorQuery extends ISite {
  blogs: IEdges<IContentfulBlogPost>
}
