import React from 'react'

import chipStyle from './chip.module.css'

interface PropsInterface {
  name: string,
  desc?: string,
}

const Chip: React.SFC<PropsInterface> = props => {
  const {name, desc} = props

  return (
    <div className={chipStyle.container}>
      <h3 className={chipStyle.title}>{name}</h3>
      {desc && (
        <div className={chipStyle.subtitle}>{desc}</div>
      )}
    </div>
  )
}

export {Chip}
