import React from 'react'

import { Box, Flex, Link } from 'rebass'
import styled from 'styled-components'

interface IProps {
  numPages: number
  currentPage: number
  pathPrefix: string
}

const Page = styled(Link)`
  @media (prefers-color-scheme: dark) {
    & {
      color: rgb(255, 255, 255);
    }
  }
`

const Component: React.SFC<IProps> = props => {
  const {numPages, currentPage, pathPrefix} = props

  const pageLength: number = numPages > 5 ? 5 : numPages
  const startPoint: number = numPages > 5 ? currentPage - 2 < 1 ? 0 : currentPage + 2 > numPages ? numPages - pageLength : currentPage - (pageLength - 2) : 0

  return (
    <Box my={4}>
      <Flex justifyContent={`center`}>
        {Array.from({length: pageLength}, (_, i) => (
          <Page key={`pagination-${startPoint + i}`} px={3} href={`${startPoint + i === 0 ? `${pathPrefix}` : `${pathPrefix === '/' ? '' : pathPrefix}/pages/${startPoint + i + 1}`}`} color={startPoint + i + 1 === currentPage ? `rgba(0, 0, 0, 1)` : `rgba(0, 0, 0, 0.5)`}>
            {startPoint + i + 1}
          </Page>
        ))}
      </Flex>
    </Box>
  )
}

export default Component
