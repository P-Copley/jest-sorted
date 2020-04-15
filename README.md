# Jest Sorted

Inspired by chai sorted and jest-extended.

## Installation

With npm:

```sh
npm install --save-dev jest-sorted
```

With yarn:

```sh
yarn add -D jest-sorted
```

## Setup

### Jest >v24

Add `jest-sorted` to your Jest `setupFilesAfterEnv` configuration. [See for help](https://jestjs.io/docs/en/configuration.html#setupfilesafterenv-array)

```json
"jest": {
  "setupFilesAfterEnv": ["jest-sorted"]
}
```

### Jest <v23

```json
"jest": {
  "setupTestFrameworkScriptFile": "jest-sorted"
}
```

If you are already using another test framework, like [jest-chain](https://github.com/mattphillips/jest-chain), then you should create a test setup file and `require` each of the frameworks you are using.

For example:

```js
// ./testSetup.js
require("jest-sorted");
require("jest-chain");
require("any other test framework libraries you are using");
```

Then in your Jest config:

```json
"jest": {
  "setupTestFrameworkScriptFile": "./testSetup.js"
}
```

### Typescript

- Coming soon...
