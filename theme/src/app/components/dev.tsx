import styled from '@emotion/styled'
import { memo } from 'react'

const DevComponent = styled('div')`
  background: repeating-linear-gradient(
    45deg,
    #fdd835,
    #fdd835 20px,
    #212121 20px,
    #212121 40px
  );
  display: block;
  height: 20px;
`

export default memo(DevComponent)
