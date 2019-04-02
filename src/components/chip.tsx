import React from 'react'

import chipStyle from './chip.module.css'

interface PropsInterface {
  name: string;
  desc?: string;
}
export default class ChipTemplate extends React.Component<PropsInterface> {
  render() {
    return (
      <div className={chipStyle.container}>
        <h3 className={chipStyle.title}>{this.props.name}</h3>
        {this.props.desc && (
          <div className={chipStyle.subtitle}>{this.props.desc}</div>
        )}
      </div>
    )
  }
}
