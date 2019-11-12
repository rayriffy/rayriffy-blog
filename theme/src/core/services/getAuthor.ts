import filter from 'lodash/filter'
import head from 'lodash/head'

import { IAuthor } from '../@types/IAuthor'

export const getAuthor = (authors: {node: IAuthor}[], author: string): any => {
  return head(filter(authors, o => o.node.user === author))
}
