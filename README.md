# reservation-api


Contains a REST API to facilitate booking appointments between providers and clients


## 🏄 Getting Started

```
docker-compose up --build -d --force-recreate
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
- npm i express @bull-board/express

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
- [sentry](https://docs.sentry.io/platforms/node/guides/express/?original_referrer=https%3A%2F%2Fwww.google.com%2F)
- [postman](https://www.postman.com)
- [docker](https://docs.docker.com/)

### 📛 Types

- [@types/jest](https://www.npmjs.com/package/@types/jest)
- [@types/express](https://www.npmjs.com/package/@types/express)
- [@types/sinon](https://www.npmjs.com/package/@types/sinon)
- [@types/validator](https://www.npmjs.com/package/@types/validator)
- npm i --save-dev @types/redis-info

# Disclaimers

- Use of `npm --force` to install [mongoose-unique-validator](https://www.npmjs.com/package/mongoose-unique-validator)

Improvements:

- Add necessary CRUD operations.

# 🚧 To Do

Left Off:

- Work on routing tests in postman
- bug: get provider availability is not correctly storing the bookings
- Work on bull mq
- Work on tests
- Add indexes on the models
- Include Mongoose ODM best practices
- Include Express.js best practices
- Need to account for timezone differences
- Set up CI/CD in github
- Rename
- Clean up the readme
- Clean up the code!

```
 jest --config=src/tests/jest.config.json  --testPathPattern=src/tests/integration/provider.test.ts --forceExit

 jest --config=src/tests/jest.config.json  --testPathPattern=src/tests/integration/booking.test.ts --forceExit


 jest --config=src/tests/jest.config.json  --testPathPattern=src/tests/integration/client.test.ts --forceExit


 jest --config=src/tests/jest.config.json  --testPathPattern=src/tests/routes/provider.test.ts --forceExit
```
