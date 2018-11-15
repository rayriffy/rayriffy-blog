import React from 'react'
import { Link } from 'gatsby'

import Style from './theme.module.css'

class Template extends React.Component {
  render() {
    const { children } = this.props
    return (
      <div key={this.props.slug} className={[Style.article]}>
        <div className={[Style.articleteaser, Style.displayblock].join(' ')}>
          <Link to={this.props.slug}><img src={this.props.banner} /></Link>
        </div>
        <div className={Style.articlecontent}>
          <h1 className={Style.articletitle}>
            <Link style={{ textDecoration: 'none', color: '#000000', boxShadow: 'none' }} to={this.props.slug}>
              {this.props.title}
            </Link>
          </h1>
          <div className={Style.articlemeta}>
            Written by Phumrapee Limpianchop on {this.props.date}
          </div>
          <p className={Style.articlesubtitle}>{this.props.subtitle}</p>
        </div>
        {children}
      </div>   
    )
  }
}

export default Template
