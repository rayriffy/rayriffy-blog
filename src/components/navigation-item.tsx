import { Link } from 'gatsby'
import React from 'react'

import styled from 'styled-components'

interface PropsInterface {
  meta: string
  slug: string
  title: string
}

const Meta = styled.span`
  color: #333333;
  display: block;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`

const Title = styled.span`
  display: block;
`

const NavigationItem: React.SFC<PropsInterface> = props => {
  const {slug, meta, title} = props
  return (
    <Link to={slug} rel={meta}>
      <Meta>{meta}</Meta>
      <Title>{title}</Title>
    </Link>
  )
}

export { NavigationItem }
