import { IContentfulCategory, IEdges } from '.'

export interface INodeGqlCategoryListingQuery {
  categories: IEdges<IContentfulCategory>
}
