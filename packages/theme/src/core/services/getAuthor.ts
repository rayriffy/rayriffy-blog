import { IAuthor } from '../@types/IAuthor'

export const getAuthor = (
  authors: { node: IAuthor }[],
  author: string
): any => {
  return authors.filter(o => o.node.user === author)[0]
}
