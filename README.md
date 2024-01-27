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

# Disclaimers

- Use of `npm --force` to install [mongoose-unique-validator](https://www.npmjs.com/package/mongoose-unique-validator)

# 🚧 To Do

- Working on schemas, models
- Work on controllers
- Work on tests
- Add indexes on the models
- Include Mongoose ODM best practices
- Include Express.js best practices
- Need to account for timezone differences
