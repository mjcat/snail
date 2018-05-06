# snail

> A MEVN project

## Build Setup

``` bash
# install dependencies and run build
npm install

# load Vuejs client with hot reload at localhost:8080
npm run dev:client

# spin up Node Express API server with nodemon at localhost:8081 (be sure to run npm run build if using this to test client)
npm run dev:server

# build for production and view the bundle analyzer report
npm run build --report

# run client unit tests
npm run test:client

# run server unit tests
npm run test:server

# run e2e tests
npm run test:e2e

# run all tests
npm test
```

## Setup References
[MEVN Setup](https://www.djamware.com/post/5a1b779f80aca75eadc12d6e/mongo-express-vue-nodejs-mevn-stack-crud-web-application)

[Adding Pug and Stylus Loaders](https://forum.vuejs.org/t/setting-up-stylus-and-pug-in-webpack-template/1839/2)

[Webpack proxy to support local hot reloading client and server on a different port](https://medium.com/@FrancescoZ/how-to-setup-vue-dev-server-with-a-running-web-server-7532c53b3198)

[Considered this setup as well but not as clean](https://medium.com/@anaida07/mevn-stack-application-part-1-3a27b61dcae0)

[Boilerplate with Auth](https://github.com/icebob/vue-express-mongo-boilerplate)

[Multiple GitHub accounts](https://code.tutsplus.com/tutorials/quick-tip-how-to-work-with-github-and-multiple-accounts--net-22574)

## Vue.js
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Style
Server:
- async/await, use async wrapper on all routes
- use Boom on req validation and catching errors from lib functions
- keep try/catch on routes small
- inside try block and all other lib functions, throw new Error
- db should only be accessed in lib, not on routes

Client:
