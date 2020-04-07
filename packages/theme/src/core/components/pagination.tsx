import React from 'react'

import { Link } from 'gatsby'

import '../styles/pagination.styl'

import { IPaginationProps } from '../@types/IPaginationProps'

const PaginationComponent: React.FC<IPaginationProps> = props => {
  const { numPages, currentPage, pathPrefix } = props

  const pageLength: number = numPages > 5 ? 5 : numPages
  const startPoint: number =
    numPages > 5
      ? currentPage - 2 < 1
        ? 0
        : currentPage + 2 > numPages
        ? numPages - pageLength
        : currentPage - (pageLength - 2)
      : 0

  return (
    <div className='core-pagination'>
      {Array.from({ length: pageLength }, (_, i) => {
        const page = startPoint + i + 1

        return (
          <div
            key={`page-item-${page}`}
            className={`page-item ${page === currentPage ? 'active' : ''}`}>
            <Link
              to={`${
                page === 1
                  ? `${pathPrefix}`
                  : `${
                      pathPrefix === '/' ? '' : pathPrefix
                    }/pages/${startPoint + i + 1}`
              }`}>
              {page}
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default PaginationComponent
