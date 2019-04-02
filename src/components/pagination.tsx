import {Link} from 'gatsby'
import React from 'react'

import paginationStyle from './pagination.module.css'

interface PropsInterface {
  numPages: number,
  currentPage: number,
  pathPrefix: string,
}
export class Pagination extends React.Component<PropsInterface> {
  public render(): object {
    let pagesLen: number
    let startFrom: number
    if (this.props.numPages > 5) {
      pagesLen = 5

      if (this.props.currentPage - 2 < 1) {
        startFrom = 0
      } else if (this.props.currentPage + 2 > this.props.numPages) {
        startFrom = this.props.numPages - pagesLen
      } else {
        startFrom = this.props.currentPage - (pagesLen - 2)
      }
    } else {
      pagesLen = this.props.numPages
      startFrom = 0
    }

    return (
      <ul className={paginationStyle.pagination}>
        {Array.from({length: pagesLen}, (_, i) => (
          <li
            key={`pagination-number${i + 1}`}
            className={
              startFrom + i + 1 === this.props.currentPage
                ? paginationStyle.active
                : ''
            }
          >
            <Link
              to={`${
                startFrom + i === 0
                  ? `${this.props.pathPrefix}`
                  : `${
                      this.props.pathPrefix === '/' ? '' : this.props.pathPrefix
                    }/pages/${startFrom + i + 1}`
              }`}
            >
              {startFrom + i + 1}
            </Link>
          </li>
        ))}
      </ul>
    )
  }
}
