import React from 'react'

import { Box, Flex, Link } from 'rebass'

interface IProps {
  numPages: number
  currentPage: number
  pathPrefix: string
}

const Component: React.SFC<IProps> = props => {
  const {numPages, currentPage, pathPrefix} = props

  let pagesLen: number
  let startFrom: number

  if (numPages > 5) {
    pagesLen = 5

    if (currentPage - 2 < 1) {
      startFrom = 0
    } else if (currentPage + 2 > numPages) {
      startFrom = numPages - pagesLen
    } else {
      startFrom = currentPage - (pagesLen - 2)
    }
  } else {
    pagesLen = numPages
    startFrom = 0
  }

  return (
    <Box my={4}>
      <Flex justifyContent={`center`}>
        {Array.from({length: pagesLen}, (_, i) => (
          <Link px={3} href={`${startFrom + i === 0 ? `${pathPrefix}` : `${pathPrefix === '/' ? '' : pathPrefix}/pages/${startFrom + i + 1}`}`} color={startFrom + i + 1 === currentPage ? `rgba(0, 0, 0, 1)` : `rgba(0, 0, 0, 0.5)`}>
            {startFrom + i + 1}
          </Link>
        ))}
      </Flex>
    </Box>
  )
}

export default Component
