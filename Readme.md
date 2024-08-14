# Basic node API

> **Disclaimer:** This application is currently in Alpha and is not ready for
> production. Please use at your own risk as things will change almost daily.

## Requirements

- [Labs Engineering Standard requirements found here](https://bloomtechlabs.gitbook.io/standards)

## Getting Started

- Fork and clone the repo to install it as your own remote.
  - **note** please [be sure to set your remote](https://help.github.jp/enterprise/2.11/user/articles/changing-a-remote-s-url/) for this repo to point to your Labs Team Repository.
  - Alternatively you can clone this repo then remove the git folder to initialize a new repo

    ```bash
    git clone --depth=1 --branch=main git@github.com:js-camps/node-pg-api-starter.git NEW-REPO-NAME
    rm -rf ./NEW-REPO-NAME/.git
    ```

- run: `npm install` to download all dependencies.
- run: `cp .env.sample .env` and update the enviornment variables to match your local setup.
- run: `npm run knex migrate:latest` to create the starting schema.
- run: `npm run knex seed:run` to populate your db with some data.
- run: `npm run tests` to confirm all is setup and tests pass.
- run: `npm run watch:dev` to start nodemon in local dev enviornment.
- run: `npm start` to start your local development server.