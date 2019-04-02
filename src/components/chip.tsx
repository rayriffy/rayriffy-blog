import React from 'react'

import chipStyle from './chip.module.css'

interface PropsInterface {
  name: string,
  desc?: string,
}
export class Chip extends React.Component<PropsInterface> {
  public render(): object {
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
