import { IFooterTab } from '../@types/IFooterTab'

export const footerTabs: IFooterTab[] = [
  {
    name: 'general',
    navs: [
      {
        href: '/',
        internal: true,
        name: 'Home',
      },
      {
        href: '/category',
        internal: true,
        name: 'Categories',
      },
      {
        href: '/author',
        internal: true,
        name: 'Authors',
      },
    ],
  },
  {
    name: 'open source',
    navs: [
      {
        href: 'https://blog.rayriffy.com',
        name: 'Blog',
      },
      {
        href: 'https://github.com/rayriffy',
        name: 'GitHub',
      },
      {
        href: 'https://gatsbyjs.org',
        name: 'Gatsby',
      },
    ],
  },
  {
    name: 'contact',
    navs: [
      {
        href: 'mailto:contact@rayriffy.com',
        name: 'Mail',
      },
      {
        href: 'https://m.me/riffyblog',
        name: 'Messenger',
      },
      {
        href: 'https://twitter.com/rayriffy',
        name: 'Twitter',
      },
    ],
  },
]
