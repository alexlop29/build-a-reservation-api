## About

Contains a REST API to facilitate booking appointments between providers and clients

## 🏄 Getting Started

```
docker-compose up --build -d
docker-compose down
```

### 🔧 Core libraries

- [Node 20.11.0](https://nodejs.org/en)
- [Mongoose ODM](https://mongoosejs.com/)
- [Express.js](https://expressjs.com/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [mongoose-unique-validator](https://www.npmjs.com/package/mongoose-unique-validator)
- [Validator.js](https://github.com/validatorjs/validator.js)
- [Moment.js](https://momentjs.com)
- [bullmq](https://bullmq.io)
- [@bull-board/express](https://www.npmjs.com/package/@bull-board/express)
- [sentry](https://docs.sentry.io/platforms/node/guides/express/)

### 💻 Development Libraries

- [eslint](https://eslint.org)
- [Jest](https://jestjs.io)
- [ts-jest](https://www.npmjs.com/package/ts-jest)
- [Prettier](https://prettier.io)
- [ts-node](https://www.npmjs.com/package/ts-node)
- [Typescript](https://www.typescriptlang.org/)
- [Sinon.js](https://sinonjs.org)
- [nodemon](https://nodemon.io)
- [typedoc](https://typedoc.org)
- [postman](https://www.postman.com)
- [docker](https://docs.docker.com/)

### 📛 Types

- [@types/express](https://www.npmjs.com/package/@types/express)
- [@types/jest](https://www.npmjs.com/package/@types/jest)
- [@types/redis-info](https://www.npmjs.com/package/@types/redis-info)
- [@types/sinon](https://www.npmjs.com/package/@types/sinon)
- [@types/validator](https://www.npmjs.com/package/@types/validator)

## 🏭 Running Tests

Run all unit tests

```
jest --config=src/tests/jest.config.json  --testPathPattern=src/tests/unit/ --forceExit
```

Run an individual unit test

```
 jest --config=src/tests/jest.config.json  --testPathPattern=src/tests/unit/client.test.ts --forceExit
```

Run an indivudal integration test

```
jest --config=src/tests/jest.config.json  --testPathPattern=src/tests/integration/provider.test.ts --forceExit
```

- Requires launching the application via Docker.

## 💎 Postman Collection

[Click here to access the postman collection.](https://app.getpostman.com/join-team?invite_code=ae9e7ef85d41be2cdb7ceec4042fa885&target_code=0c7fc7577760072734a4059e9275fa12)

## 🚧 To Do

Improvement:

- Implement health checks to gracefully start and stop the application. (e.g. src/config/mongoose)
- Improve application performance by leveraging indexes on the mongoose models.

## 📑 Additional Readings

- [Slow Trains in MongoDB and Node.js](https://thecodebarbarian.com/slow-trains-in-mongodb-and-nodejs)
- [Express.js - Best Practices Performance](https://expressjs.com/en/advanced/best-practice-performance.html)
- [Express.js - Best Practices Security](https://expressjs.com/en/advanced/best-practice-security.html)
