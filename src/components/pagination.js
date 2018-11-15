import React from 'react'
import { Link } from 'gatsby'

import pagStyle from './pagination.module.css'

class Template extends React.Component {
  render() {
    return (
      <ul className={pagStyle.pagination}>
      {
        Array.from({ length: this.props.numPages }, (_, i) => (
          <li
            key={`pagination-number${i + 1}`}
            className={i + 1 === this.props.currentPage ? pagStyle.active : ''}
          >
            <Link 
              to={`/${i === 0 ? '' : 'pages/' + (i + 1)}`}
            >
              {i + 1}
            </Link>
          </li>
        ))
      }
      </ul>
    )
  }
}

export default Template
