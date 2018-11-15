import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/layout'

import Card from '../components/blog-card'

import banner from '../assets/404.jpg'

const NotFoundPage = () => (
  <Layout>
    <Helmet
      htmlAttributes={{ lang: 'en' }}
      title='Not Found | Riffy Blog'
    />
    <Card
      banner={banner}
      title='NOT FOUND'
      subtitle='You just hit a route that doesn&#39;t exist... the sadness.'
      link={false}
    />
  </Layout>
)

export default NotFoundPage
