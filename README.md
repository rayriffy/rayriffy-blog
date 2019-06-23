rayriffy-blog
=============

All *new* Riffy Blog based on GatsbyJS generator.

Demo
----

[blog.rayriffy.com](https://blog.rayriffy.com)

Requirements
------------

-   Node LTS

Installation
------------

```sh
$ npm install
$ npm run dev
```

or just use yarn

```sh
$ yarn
$ yarn dev
```

Creating Articles
-----------------

You can create articles by using Markdown language. I provided you an example articles [here](content/blog/review-halozy/index.md). Good Luck

Adding new author
-----------------

In order to add a new author, please floowing these steps below.

### Create a branch

All authors in **rayriffy/rayriffy-blog** are required to create their own branch on repository by cloning **rayriffy/rayriffy-blog** and create branch called `author/{USERNAME}` from `master` branch

### Create your metadata

Create a file `./content/database/authors/{USERNAME}.json` and fill an information like [this example](content/database/authors/rayriffy.json)

### Add an image

Create you own author image with the dimension of **1500*788 px** and pixel density at **72 ppi** in **.jpg** format and then renaming file to `auhtor.{USERNAME}.jpg` and put it into folder `./content/assets`

### Create a blog

Before starting an development server please create at **least 1 article** for new author in order to prevent server from crashing.

Contributing
------------

We welcome all contributions by sending PR to this repository.

Need Help ?
-----------

If you need help with anything, here're following methods:

#### Create an Issue

If you have something you want to discuss in detail, or have hit an issue which you believe others will also have in deployment or development of the system, [opening an issue](https://github.com/rayriffy/rayriffy-blog/issues) is the best way to get help. It creates a permanent resource for others wishing to contribute to conversation.
