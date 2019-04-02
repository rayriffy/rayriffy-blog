import React from 'react'

import devStyle from './dev.module.css'

export class Dev extends React.Component {
  public render(): object {
    return <div className={devStyle.container} />
  }
}
