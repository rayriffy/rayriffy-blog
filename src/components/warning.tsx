import React from 'react'

import { Box, Card, Heading, Text } from 'rebass'

const Component: React.SFC = () => {
  return (
    <Card backgroundColor={`rgb(255, 255, 255)`} borderRadius={6} boxShadow={`0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`}>
      <Box p={4}>
        <Heading>Removing old ServiceWorkers from every device</Heading>
        <Text fontSize={[16, 17]} mt={3} color={`rgba(0, 0, 0, 0.6)`}>We are removing old ServiceWorkers from every device making this site to load slower than normal.</Text>
        <Text fontSize={[16, 17]} mt={3} color={`rgba(0, 0, 0, 0.6)`}>Effective: 21 Jun - 21 Jul</Text>
      </Box>
    </Card>
  )
}

export default Component
