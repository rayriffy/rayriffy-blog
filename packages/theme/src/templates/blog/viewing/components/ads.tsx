import React from 'react'

import AdSense from 'react-adsense'

const AdsComponent: React.FC = () => {
  return (
    <React.Fragment>
      <div className='divider'>
        <hr />
      </div>
      <div className='ads'>
        <AdSense.Google
          client='ca-pub-2837414306121160'
          slot='7015425171'
          format='auto'
          responsive='true'
        />
      </div>
    </React.Fragment>
  )
}

export default AdsComponent
