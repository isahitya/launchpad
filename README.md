# Launchio

Your own pathway to the internet.
_Add, Organize and Search_ your internet apps in a single place.
After using this tool you'll better manage the hundreds of sites/links you frequently (or sometimes not so frequently) visit.

## App

**Home**
![App applications at a glance](https://github.com/isahitya/launchpad/blob/materialdesign/launchpad_images/home_shadow.png?raw=true)

**Search as you type**
![enter image description here](https://github.com/isahitya/launchpad/blob/materialdesign/launchpad_images/search.gif?raw=true)

**Add your own apps**
![enter image description here](https://github.com/isahitya/launchpad/blob/materialdesign/launchpad_images/create_app_shadow.png?raw=true)

**Organize apps in sections**
![enter image description here](https://github.com/isahitya/launchpad/blob/materialdesign/launchpad_images/create_section_shadow.png?raw=true)

**Single place to access custom scripts**
![enter image description here](https://github.com/isahitya/launchpad/blob/materialdesign/launchpad_images/k2Script_shadow.png?raw=true)

## Prerequisites

1.  MongoDB ([installation instructions](https://docs.mongodb.com/manual/administration/install-community/))
2.  Node.js ([installation instructions](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm))
3.  Express

        npm install -g express

4.  Mongoose
    `npm install -g mongoose`

## Installation

You need to know 2 main directories for this process.

1. 'launchpad', the directory created when you clone this repo.
2. 'launchpad/launchpad_server', where the server is located.

```bash
# clone the alphadesign branch (where the latest development is)
git clone -b materialdesign https://github.com/isahitya/launchpad.git

# in 'launchpad_server' directory
# install dependencies and then run server
npm install
node index.js

# in 'launchpad' directory
# install dependencies and then serve locally with hot reload
npm install
npm run dev

# build /dist for production
npm run build

```

After following the above procedure, open http://localhost:3000/ in your browser to access the app.

