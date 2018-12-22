import React from 'react'

import categoryStyle from './category.module.css'

class Template extends React.Component {
  render() {
    return (
      <div className={categoryStyle.container}>
        <h3 className={categoryStyle.title}>{this.props.name}</h3>
        <div className={categoryStyle.subtitle}>{this.props.desc}</div>
      </div>
    )
  }
}

export default Template
