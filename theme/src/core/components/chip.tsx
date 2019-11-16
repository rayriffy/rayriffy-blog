import React from 'react'

import styled from 'styled-components'

import { IChipProp } from '../@types/IChipComponent'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`

const Title = styled.h3`
  display: flex;
  justify-content: flex-start;
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 6px;

  color: rgba(0, 0, 0, 0.8);

  @media (prefers-color-scheme: dark) {
    color: rgb(255, 255, 255);
  }
`

const Subtitle = styled.div`
  color: rgb(192, 192, 192);
  font-size: 18px;
`

const ChipComponent: React.FC<IChipProp> = props => {
  const { name, desc } = props

  return (
    <Container>
      <Title>{name}</Title>
      {desc && <Subtitle>{desc}</Subtitle>}
    </Container>
  )
}

export default ChipComponent
