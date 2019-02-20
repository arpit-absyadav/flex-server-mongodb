## Welcome to the Flex Server stack

The flex server is intended to provide a simple and fun starting point for developeing javascript applications server.

- **M**ongoDB : Document database – used by your back-end application to store its data as JSON (JavaScript Object Notation) documents
- **E**xpress (sometimes referred to as Express.js): Back-end web application framework running on top of Node.js
- **N**ode.js : JavaScript runtime environment – lets you implement your application back-end in JavaScript

### Pre-requisites

- git - [Installation guide](https://www.linode.com/docs/development/version-control/how-to-install-git-on-linux-mac-and-windows/) .
- node.js - [Download page](https://nodejs.org/en/download/) .
- npm - comes with node or download yarn - [Download page](https://yarnpkg.com/lang/en/docs/install) .
- mongodb - [Download page](https://www.mongodb.com/download-center/community) .

### Client

- Angular Client with this server compatibility
  [Angular Client](https://github.com/3dch/3dch-school-cleint)

### Installation

```
git clone https://github.com/3dch/3dch-school-server.git
cd flex-server-mongodb
npm install
npm start (for development)
npm run start:prod (for https `production`)
```

### Docker based

```
git clone https://github.com/3dch/3dch-school-server.git
cd flex-server-mongodb
npm install
docker-compose up -d
```

### Other commands

```bash
> `npm run test`  #testing.

> `npm run coverage` #to open coverage in html (change `xdg-open` to `open` for mac).

> `npm run docs:build` #build documentation.

> `npm run docs:open` #open documentation. (change `xdg-open` to `open` for mac)
```
