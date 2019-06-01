import _ from 'lodash'
import React from 'react'

import styled from 'styled-components'

interface PropsInterface {
  align: string
  keys: string
  tabs: {
    name: string
    href: string
    newtab: boolean
  }[]
}

interface NavInterface {
  left?: boolean,
  center?: boolean,
  right?: boolean,
}

const Container = styled.nav`
  background: transparent;
  color: #6f6f6f;
  margin: 0 0;
  display: flex;
  justify-content: center;

  &::before, &::after {
    content: "";
    display: table;
  }

  &::after {
    clear: both;
  }

  ${(props: NavInterface) => props.left && `
    display: flex;
    justify-content: flex-start;
  `}

  ${(props: NavInterface) => props.center && `
    display: flex;
    justify-content: center;
  `}

  ${(props: NavInterface) => props.right && `
    display: flex;
    justify-content: flex-end;
  `}
`

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  float: left;

  &>li {
    float: left;
    position: relative;
  }
  
  &>li>a {
    display: block;
    box-sizing: border-box;
    text-decoration: none;
    padding: 0 20px;
    color: #222;
    font-size: 13px;
    font-family: 'Lato', Helvetica, Arial, sans-serif;
    font-weight: normal;
    text-transform: uppercase;
    -webkit-transition: color .2s ease-in-out;
    transition: color .2s ease-in-out;
  }
  
  &>li>a[href='#'] {
    cursor: text;
  }
  
  &>li:hover>a,
  .nav>li>a:focus,
  .nav>li.uk-open>a {
    background-color: transparent;
    color: rgba(34, 34, 34, 0.5);
    outline: none;
  }
  
  &>li>a:active {
    background-color: transparent;
    color: #222;
  }
  
  &>li.active>a {
    background-color: transparent;
    color: rgba(34, 34, 34, 0.5);
  }
`

const Navbar: React.SFC<PropsInterface> = props => {
  const {tabs, keys, align} = props

  const processedTabs: object[] = []
  _.each(tabs, tab => {
    if (tab.newtab === false) {
      processedTabs.push(
        <li key={`${keys}-${tab.name}`}>
          <a href={tab.href}>{tab.name}</a>
        </li>
      )
    } else {
      processedTabs.push(
        <li key={`${keys}-${tab.name}`}>
          <a href={tab.href} rel="noopener noreferrer" target="_blank">
            {tab.name}
          </a>
        </li>
      )
    }
  })

  return (
    <Container key={keys} left={align === 'left'} right={align === 'right'} center={align === 'center'}>
      <List>{processedTabs}</List>
    </Container>
  )
}

export { Navbar }
