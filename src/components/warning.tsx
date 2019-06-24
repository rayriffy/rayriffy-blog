import React from 'react'

import Card from './card'

const Component: React.SFC = () => {
  return (
    <Card
      type={`listing`} 
      blog={{
        title: 'Removing old ServiceWorkers from every devices',
        subtitle: 'We are removing old ServiceWorkers from every device resulting this site to load slower than normal.'
      }}
    />
  )
}

export default Component
