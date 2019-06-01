import React from 'react'

import styled from 'styled-components'

const Container = styled.div`
  width: 50%;
  display: inline-table;
  margin: 20px 0;
`

const NavigationContainer: React.SFC = props => {
  const {children} = props

  return <Container>{children}</Container>
}

export { NavigationContainer }
