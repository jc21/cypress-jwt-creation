# Cypress JWT Creation

Create JWT tokens with ease

[![npm (scoped)](https://img.shields.io/npm/v/@jc21/cypress-jwt-creation.svg?style=for-the-badge)](https://www.npmjs.com/package/@jc21/cypress-jwt-creation)
[![npm (types)](https://img.shields.io/npm/types/@jc21/cypress-jwt-creation.svg?style=for-the-badge)](https://www.npmjs.com/package/@jc21/cypress-jwt-creation)
[![npm (licence)](https://img.shields.io/npm/l/@jc21/cypress-jwt-creation.svg?style=for-the-badge)](https://www.npmjs.com/package/@jc21/cypress-jwt-creation)


### Cypress Installation

```bash
yarn add @jc21/cypress-jwt-creation
```

Then in your cypress Plugins file:
```javascript
const {JwtCreation} = require('@jc21/cypress-jwt-creation');

module.exports = (on, config) => {
    // ...
    on('task', JwtCreation(config));
    // ...
    return config;
};
```


### Cypress Usage

```javascript
describe('Hit an authenticated endpoint', () => {
    it('Should be able to get a response', async function () {
        cy.request('/users/me').then($response => {

            const token = await cy.task('generateToken', {
                privateKey: '/path/to/private.key',
                issuer:     'cypress-tester',
                algo:       'RS256',
                expires:    '1 day',
                claims:     {
                    capabilities: 'superuser'
                }
            });

            // use token in your requests
        });
    });
});
```

### The Private Key

Due to the fact that this plugin runs on the Cypress Backend, the location of the private key file must be defined as either
the full path on disk or relative path to the running of the cypress command. You can define the file location
either with an environment variable which can apply to all tests:

`config.env.jwtPrivateKey`

or within each individial test using the options below. In addition, you can also define the JWT algorithm if different from
the default `RS256` with:

`config.env.jwtAlgo`


### Options

| Option       | Description                                                   | Optional | Default                         |
| ------------ | ------------------------------------------------------------- | -------- | ------------------------------- |
| `privateKey` | The location of the private key file                          | true     | `config.env.jwtPrivateKey`      |
| `issuer`     | Issuer string                                                 | true     | "cypress.testing"               |
| `algo`       | The request method of the endpoint                            | true     | `config.env.jwtAlgo` or `RS256` |
| `expires`    | English interval of token expiry                              | true     | "1 day"                         |
| `claims`     | An object of extra claims you might want to set               | true     | {}                              |


### Compiling Source

```bash
yarn install
yarn build
yarn test
```
