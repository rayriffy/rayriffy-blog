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
      {Array.from({ length: pageLength }, (_, i) => (
        <div
          className={`page-item ${
            startPoint + i + 1 === currentPage ? 'active' : ''
          }`}>
          <Link
            to={`${
              startPoint + i === 0
                ? `${pathPrefix}`
                : `${pathPrefix === '/' ? '' : pathPrefix}/pages/${startPoint +
                    i +
                    1}`
            }`}>
            {startPoint + i + 1}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default PaginationComponent
