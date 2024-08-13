# Node API Starter

## setup a basic express server

-   install dependencies and `.gitignore`
```sh
npx gitignore node
```

```sh
npm install --save  express http-errors morgan helmet debug cookie-parser
```

```
npm install --save-dev nodemon cross-env
```

-   Add "start" scripts to the `package.json` file
```json
  "scripts": {
    "start": "node server.js",
    "server": "nodemon server.js"
  },
```

- Add Jest to the project

```
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

## setup a RDBMS

-   update "start" scripts to the `package.json` file
```json
  "scripts": {
    "start": "node server.js",
    "server": "nodemon server.js",
    "test": "npx jest --watch",
    "knex": "npx knex --knexfile config/knexfile.js",
    "migrate": "npx knex migrate:latest --knexfile config/knexfile.js",
    "rollback": "npx knex migrate:rollback --knexfile config/knexfile.js",
    "seed": "npx knex seed:run --knexfile config/knexfile.js",
    "resetdb": "npm run rollback && npm run migrate && npm run seed"
  },
```

- Install dependencies
```
npm i --save knex pg dotenv 
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

- Generate a new migration executing: `npx knex migrate:make [migration-name]`
```    
npx knex migrate:make first-migration
```  

## setup a RDBMS