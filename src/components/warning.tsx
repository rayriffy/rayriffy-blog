import React from 'react'

import { Box, Flex } from 'rebass'

import Card from './card'

const Component: React.SFC = () => {
  return (
    <Box my={2}>
      <Flex justifyContent={`center`}>
        <Box width={[22/24, 22/24, 20/24, 10/24]}>
          <Card
            type={`listing`}
            blog={{
              subtitle: `We are removing old ServiceWorkers from every device resulting this site to load slower than normal.`,
              title: `Removing old ServiceWorkers from every devices`,
            }}
          />
        </Box>
      </Flex>
    </Box>
  )
}

export default Component
