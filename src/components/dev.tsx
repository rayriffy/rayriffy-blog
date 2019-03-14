import React from 'react'

import devStyle from './dev.module.css'

export default class DevTemplate extends React.Component {
  render() {
    return <div className={devStyle.container} />
  }
}
