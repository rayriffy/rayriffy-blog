import React, { memo } from 'react'

import '../styles/chip.styl'

import { IChipProp } from '../@types/IChipComponent'

const ChipComponent: React.FC<IChipProp> = props => {
  const { name, desc } = props

  return (
    <div className='core-ship'>
      <div className='title'>{name}</div>
      {desc && <div className='subtitle'>{desc}</div>}
    </div>
  )
}

export default memo(ChipComponent)
