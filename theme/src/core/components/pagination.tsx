import React from 'react'

import { Link } from 'gatsby'

import styled from '@emotion/styled'
import { Box, Flex } from 'rebass'

import { IPaginationProps } from '../@types/IPaginationProps'

interface IPage {
  start: number
  index: number
  current: number
}

const Page = styled(Link)<IPage>`
  ${(props: IPage) => {
    const { start, index, current } = props

    if (start + index + 1 === current) {
      return `color: rgba(0, 0, 0, 1);`
    } else {
      return `color: rgba(0, 0, 0, 0.5);`
    }
  }}

  @media (prefers-color-scheme: dark) {
    color: rgb(255, 255, 255);
  }
`

const PaginationComponent: React.FC<IPaginationProps> = props => {
  const { numPages, currentPage, pathPrefix } = props

  const pageLength: number = numPages > 5 ? 5 : numPages
  const startPoint: number =
    numPages > 5
      ? currentPage - 2 < 1
        ? 0
        : currentPage + 2 > numPages
        ? numPages - pageLength
        : currentPage - (pageLength - 2)
      : 0

  return (
    <Box my={4}>
      <Flex justifyContent={`center`}>
        {Array.from({ length: pageLength }, (_, i) => (
          <Box key={`pagination-${startPoint + i}`} px={3}>
            <Page
              to={`${
                startPoint + i === 0
                  ? `${pathPrefix}`
                  : `${
                      pathPrefix === '/' ? '' : pathPrefix
                    }/pages/${startPoint + i + 1}`
              }`}
              start={startPoint}
              index={i}
              current={currentPage}>
              {startPoint + i + 1}
            </Page>
          </Box>
        ))}
      </Flex>
    </Box>
  )
}

export default PaginationComponent
