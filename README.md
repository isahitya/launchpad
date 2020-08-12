# Launchio

Your own pathway to the internet.
_Add, Organize and Search_ your internet apps in a single place.
After using this tool you'll better manage the hundreds of sites/links you frequently (or sometimes not so frequently) visit.

## Prerequisites

1.  MongoDB ([installation instructions](https://docs.mongodb.com/manual/administration/install-community/))
2.  Node.js ([installation instructions](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm))
3.  Express

        npm install -g express

4.  Mongoose
    `npm install -g mongoose`

## Installation

You need to know 3 main directories for this process.

1. 'launchpad', the directory created when you clone this repo.
2. 'launchpad/launchpad_server', where the express server is located
3. 'launchpad/launchpad_server/launchpad_populate', to initialize the database

```bash
# clone the alphadesign branch (where the latest development is)
git clone -b materialdesign https://github.com/isahitya/launchpad.git

# in 'launchpad_populate' directory
# populate database
node run_this.js

# in 'launchpad_server' directory
# install dependencies
npm install
# then run server
node index.js

# in 'launchpad' directory
# install dependencies
npm install
# serve locally with hot reload
npm run dev

# build /dist for production
npm run generate

```

After following the above procedure, open http://localhost:3000/ in your browser to access the app.
