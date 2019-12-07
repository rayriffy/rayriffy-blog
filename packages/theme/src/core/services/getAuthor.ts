import { filter, head } from 'lodash'

import { IAuthor } from '../@types/IAuthor'

export const getAuthor = (
  authors: { node: IAuthor }[],
  author: string
): any => {
  return head(filter(authors, o => o.node.user === author))
}
