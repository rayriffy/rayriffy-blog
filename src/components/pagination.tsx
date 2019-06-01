import { Link } from 'gatsby'
import React from 'react'

import styled from 'styled-components'

interface PropsInterface {
  numPages: number
  currentPage: number
  pathPrefix: string
}

interface ItemInterface {
  active: boolean,
}

const Container = styled.ul`
  padding: 0;
  list-style: none;
  text-align: center;
  font-size: .001px;
  margin-top: 25px;

  &:before,
  &:after {
    content: "";
    display: table;
  }

  &:after {
    clear: both;
  }

  &>li {
    display: inline-block;
    font-size: 1rem;
    vertical-align: top;
  }

  &>li:nth-child(n+2) {
    margin-left: 5px;
  }

  &>li>a,
  &>li>span {
    display: inline-block;
    min-width: 26px;
    padding: 5px 5px;
    line-height: 26px;
    text-decoration: none;
    box-sizing: content-box;
    text-align: center;
  }

  &>li>a {
    background: transparent;
    color: #A5A5A5;
  }

  &>li>a:hover,
  &>li>a:focus {
    background-color: transparent;
    color: #222;
    outline: none;
  }

  &>li>a:active {
    background-color: transparent;
    color: #222;
  }
`

const Item = styled.li`
  ${(props: ItemInterface) => props.active && `
    background: transparent;
    color: #222;
  `}
`

const Pagination: React.SFC<PropsInterface> = props => {
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
    <Container>
      {Array.from({length: pagesLen}, (_, i) => (
        <Item key={`pagination-number${i + 1}`} active={startFrom + i + 1 === currentPage}>
          <Link
            to={`${
              startFrom + i === 0 ? `${pathPrefix}` : `${pathPrefix === '/' ? '' : pathPrefix}/pages/${startFrom + i + 1}`
            }`}>
            {startFrom + i + 1}
          </Link>
        </Item>
      ))}
    </Container>
  )
}

export { Pagination }
