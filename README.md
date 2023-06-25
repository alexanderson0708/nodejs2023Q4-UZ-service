# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/engine/install/)

## Downloading

```
git clone https://github.com/alexanderson0708/nodejs2023Q4-UZ-service
```

```
git checkout logging-error-handling
```

## Installing NPM modules

```
npm install
```

## Edit .env.example File


Rename file `.env.example` to `.env`


## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Docker

Build services
```
npm run docker:build
```
Start containers
```
npm run docker
```
Run tests in containers
```
npm run test:docker
```
or
```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

## Migrations

For work with migrations use console in server container:

Generate migrations:
- delete src/migrations;
- use migration:generate script
 ```
 npm run migration:generate
 ```

Manual migration running:
 ```
 npm run migration:run
 ```

Revert migration:
 ```
 npm run migration:revert
 ```