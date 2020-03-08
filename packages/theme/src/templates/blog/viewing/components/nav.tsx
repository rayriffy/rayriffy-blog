import React from 'react'

import TransparentLink from '../../../../core/components/transparentLink'

import { INavProps } from '../@types/INavProps'

const NavComponent: React.FC<INavProps> = props => {
  const { next, previous } = props

  return (
    <React.Fragment>
      <div className='divider'>
        <hr />
      </div>
      <div className='nav'>
        <div className='item'>
          {previous ? (
            <React.Fragment>
              <div className='text'>PREVIOUS</div>
              <TransparentLink
                to={
                  previous.slug.startsWith('/')
                    ? previous.slug
                    : `/${previous.slug}`
                }>
                {previous.title}
              </TransparentLink>
            </React.Fragment>
          ) : null}
        </div>
        <div className='item'>
          {next ? (
            <React.Fragment>
              <div className='text'>NEXT</div>
              <TransparentLink
                to={next.slug.startsWith('/') ? next.slug : `/${next.slug}`}>
                {next.title}
              </TransparentLink>
            </React.Fragment>
          ) : null}
        </div>
      </div>
    </React.Fragment>
  )
}

export default NavComponent
