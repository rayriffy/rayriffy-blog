[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Frayriffy%2Frayriffy-blog.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Frayriffy%2Frayriffy-blog?ref=badge_shield)

rayriffy-blog
=============

# DEPRECATED: Project has been rewritten in [this repository](https://github.com/rayriffy/rayriffy-blog-next)

All *new* Riffy Blog based on GatsbyJS generator.

Demo
----

[blog.rayriffy.com](https://blog.rayriffy.com)

Requirements
------------

-   [Node LTS](https://nodejs.org)
-   [yarn](https://yarnpkg.org)

Installation & Usage
--------------------

### 1. Configure Contentful

Create a workspace and **import content model** with [this](content/model/contentful.json) provided JSON files.

Then, create **at least** one entitly of each content model and **create an API Key** in order to get Access Token and Space ID.

### 2. Configure app

Pull a source first

```sh
$ git clone https://github.com/rayriffy/rayriffy-blog
```

Then install its dependencies

```sh
$ yarn
```

Finally customize your own favicon [here](static/favicon.ico) and [here](content/assets/logo.png), [logo](src/app/components/logo.tsx) and [site metadata](gatsby-config.js)

### 2. Developing

For development environment, we can use **Content Preview API - access token** to fetch contents

```sh
$ export CONTENTFUL_SPACE_ID=<SPACE ID HERE>
$ export CONTENTFUL_ACCESS_TOKEN=<PREVIEW TOKEN HERE>
$ yarn dev
```

Then develop it as you wish cause it is MIT license!

### 3. Deploying

In order to deploy them to production, we use `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` as same as developing but in this case access token will be **Content Delivery API - access token**

```sh
$ export CONTENTFUL_SPACE_ID=<SPACE ID HERE>
$ export CONTENTFUL_ACCESS_TOKEN=<DEPLOY TOKEN HERE>
$ yarn build
```

After build process is completed, you can use `public/` directory for publishing deployment.

Contributing
------------

We welcome all contributions by sending PR to this repository.

Need Help ?
-----------

If you need help with anything, here're following methods:

#### Create an Issue

If you have something you want to discuss in detail, or have hit an issue which you believe others will also have in deployment or development of the system, [opening an issue](https://github.com/rayriffy/rayriffy-blog/issues) is the best way to get help. It creates a permanent resource for others wishing to contribute to conversation.


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Frayriffy%2Frayriffy-blog.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Frayriffy%2Frayriffy-blog?ref=badge_large)
