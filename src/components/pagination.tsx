import {Link} from 'gatsby'
import React from 'react'

import paginationStyle from './pagination.module.css'

interface PropsInterface {
  numPages: number
  currentPage: number
  pathPrefix: string
}

const Pagination: React.SFC<PropsInterface> = props => {
  const {numPages, currentPage, pathPrefix} = props

  let pagesLen: number
  let startFrom: number

  if (numPages > 5) {
    pagesLen = 5
    if (currentPage - 2 < 1) {
      startFrom = 0
    } else if (currentPage + 2 > numPages) {
      startFrom = numPages - pagesLen
    } else {
      startFrom = currentPage - (pagesLen - 2)
    }
  } else {
    pagesLen = numPages
    startFrom = 0
  }

  return (
    <ul className={paginationStyle.pagination}>
      {Array.from({length: pagesLen}, (_, i) => (
        <li key={`pagination-number${i + 1}`} className={startFrom + i + 1 === currentPage ? paginationStyle.active : ''}>
          <Link
            to={`${
              startFrom + i === 0 ? `${pathPrefix}` : `${pathPrefix === '/' ? '' : pathPrefix}/pages/${startFrom + i + 1}`
            }`}>
            {startFrom + i + 1}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export {Pagination}
