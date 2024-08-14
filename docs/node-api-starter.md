# Node API Starter

-   generate `.gitignore`
```sh
npx gitignore node
```

## setup a basic express server

-   install `dependencies`
```sh
npm install --save  express dotenv morgan helmet debug http-errors cookie-parser
```

-   install `devDependencies`
```sh
npm install --save-dev nodemon cross-env
```

-   Add "start" scripts to the `package.json` file
```json
  "scripts": {
    "start": "node server.js",
    "server": "nodemon server.js"
  },
```

## setup Jest 

-   install `devDependencies` for Jest
```sh
npm install --save-dev supertest jest
```

-   update "start" scripts to the `package.json` file
```json
  "scripts": {
    "start": "node server.js",
    "server": "nodemon server.js",
    "test": "npx jest --watch"
  },
```

## add environment support variables: `.env`, `secret/index.js`
- .env
```
PORT=8000
```

-    /secret/index.js
```
require('dotenv').config() 

module.exports = {
  BCRYPT_ROUNDS: process.env.BCRYPT_ROUNDS || 8,
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 9000,
  // JWT_SECRET: process.env.TOKEN_SECRET || 'ssh'
  JWT_SECRET: process.env.JWT_SECRET || 'keep it secret!!!!!'
}
```

## initial RDBMS and make first-migration

- Install `dependencies`
```
npm i --save knex pg 
```

- create `config/knexfile.js` with the following config settings.
  - `knexfile.js`
```
const dotenv = require('dotenv');
dotenv.config({path: '../.env'});

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    migrations: { directory: "../data/migrations" },
    seeds: { directory: "../data/seeds" },
    pool: {
      min: 2, 
      max: 10
    }
  },

  test: {
    client: "pg",
    connection: process.env.PG_CONNECTION_STRING,
    migrations: { directory: "../data/migrations" },
    seeds: { directory: "../data/seeds" },
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
  },
};
```

- Create `data/db-config.js` file
  - `db-config.js`
```js
require("dotenv").config();
const knex = require("knex");
const dbEnvironment = process.env.NODE_ENV || "development";
const knexConfig = require("../config/knexfile")[dbEnvironment];
module.exports = knex(knexConfig);
```

- Plug `data/db-config.js` into `api/models/userModel.js`.
  - `userModel.js`
```js
const db = require("../../data/db-config");

module.exports = { get };

function get() {
  return db("users");
}
```

## setup postgres

Use docker. [Install](https://docs.docker.com/get-docker/) for your platform

- run: `docker-compose up -d` to start up the postgresql database and pgadmin.

- Open a browser to [pgadmin](http://localhost:5050/) and you should see the Dev server already defined.

- If you need to start over you will need to delete the folder `$ rm -rf ./data/pg` as this is where all of the server data is stored.
  - if the database `api-dev` was not created then start over.
- Generate a new migration executing: `npx knex migrate:make [migration-name]`
```    
npx knex migrate:make first-migration
```  