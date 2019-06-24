import React from 'react'

import Card from './card'

const Component: React.SFC = () => {
  return (
    <Card
      type={`listing`} 
      blog={{
        subtitle: 'We are removing old ServiceWorkers from every device resulting this site to load slower than normal.',
        title: 'Removing old ServiceWorkers from every devices',
      }}
    />
  )
}

export default Component
