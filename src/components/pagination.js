import React from 'react'
import { Link } from 'gatsby'

import pagStyle from './pagination.module.css'

class Template extends React.Component {
  render() {
    if(this.props.currentPage > this.props.numPages) {
      var pageslen = 5
      var startfrom = (this.props.numPages - 5 > 0) ? this.props.numPages - 5 : 0
    }
    else {
      var pageslen = this.props.numPages
      var startfrom = 0
    }
    return (
      <ul className={pagStyle.pagination}>
      {
        Array.from({ length: pageslen }, (_, i) => (
          <li
            key={`pagination-number${i + 1}`}
            className={startfrom + i + 1 === this.props.currentPage ? pagStyle.active : ''}
          >
            <Link 
              to={`/${startfrom + i === 0 ? '' : 'pages/' + (startfrom + i + 1)}`}
            >
              {startfrom + i + 1}
            </Link>
          </li>
        ))
      }
      </ul>
    )
  }
}

export default Template
