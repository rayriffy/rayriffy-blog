import React from 'react'

import styled from 'styled-components'

const Container = styled.div`
  background: repeating-linear-gradient(45deg,
    #fdd835,
    #fdd835 20px,
    #212121 20px,
    #212121 40px);
  display: block;
  height: 20px;
`

const Dev: React.SFC = () => {
  return <Container />
}

export { Dev }
