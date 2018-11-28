import React from 'react'
import { Link } from 'gatsby'

import pagStyle from './pagination.module.css'

class Template extends React.Component {
  render() {
    if(this.props.numPages > 5) {
      if(this.props.currentPage - 2 < 1) {
        var pagesLen = 5
        var startFrom = 0
      }
      else if(this.props.currentPage + 2 > this.props.numPages) {
        var pagesLen = 5
        var startFrom = this.props.numPages - 5
      }
      else {
        var pagesLen = 5
        var startFrom = this.props.currentPage - 3
      }
    }
    else {
      var pagesLen = this.props.numPages
      var startFrom = 0
    }
    return (
      <ul className={pagStyle.pagination}>
      {
        Array.from({ length: pagesLen }, (_, i) => (
          <li
            key={`pagination-number${i + 1}`}
            className={startFrom + i + 1 === this.props.currentPage ? pagStyle.active : ''}
          >
            <Link 
              to={`/${startFrom + i === 0 ? '' : 'pages/' + (startFrom + i + 1)}`}
            >
              {startFrom + i + 1}
            </Link>
          </li>
        ))
      }
      </ul>
    )
  }
}

export default Template
