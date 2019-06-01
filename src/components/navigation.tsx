import React from 'react'

import styled from 'styled-components'

const Container = styled.div`
  margin: 30px 0 30px 0;
`

const Navigation: React.SFC = props => {
  const {children} = props

  return <Container>{children}</Container>
}

export { Navigation }
