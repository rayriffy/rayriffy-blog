import React from 'react'

import styled from 'styled-components'

interface PropsInterface {
  name: string
  desc?: string
}

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
`

const Subtitle = styled.div`
  color: #6f6f6f;
  font-size: 18px;
`

const Component: React.SFC<PropsInterface> = props => {
  const {name, desc} = props

  return (
    <Container>
      <Title>{name}</Title>
      {desc && <Subtitle>{desc}</Subtitle>}
    </Container>
  )
}

export default Component
