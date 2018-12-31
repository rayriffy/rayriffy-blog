import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'gatsby'

import paginationStyle from './pagination.module.css'

class PaginationTemplate extends React.Component {
  render() {
    var pagesLen
    var startFrom
    if (this.props.numPages > 5) {
      if (this.props.currentPage - 2 < 1) {
        pagesLen = 5
        startFrom = 0
      } else if (this.props.currentPage + 2 > this.props.numPages) {
        pagesLen = 5
        startFrom = this.props.numPages - 5
      } else {
        pagesLen = 5
        startFrom = this.props.currentPage - 3
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
            }>
            <Link
              to={`/${
                startFrom + i === 0
                  ? this.props.pathPrefix
                  : this.props.pathPrefix + '/pages/' + (startFrom + i + 1)
              }`}>
              {startFrom + i + 1}
            </Link>
          </li>
        ))}
      </ul>
    )
  }
}

export default PaginationTemplate

PaginationTemplate.propTypes = {
  numPages: PropTypes.number,
  currentPage: PropTypes.number,
  pathPrefix: PropTypes.string,
}
