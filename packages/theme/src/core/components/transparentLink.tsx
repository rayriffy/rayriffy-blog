import React from 'react'

import { GatsbyLinkProps, Link } from 'gatsby'

const TransparentLinkComponent: React.FC<Omit<
  GatsbyLinkProps<{}>,
  'ref'
>> = props => {
  return <Link className='core-transparentLink' {...props} />
}

export default TransparentLinkComponent
