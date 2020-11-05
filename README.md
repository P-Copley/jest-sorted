# Jest Sorted

Inspired by chai sorted and jest-extended. This packages extends jest.expect with 2 custom matchers, `toBeSorted` and `toBeSortedBy`

Examples

```js
expect([1, 2, 3]).toBeSorted();
expect([3, 2, 1]).toBeSorted({ descending: true });

expect([{ id: 1 }, { id: 2 }, { id: 3 }]).toBeSortedBy('id');
expect([{ count: '10' }, { count: '5' }]).toBeSortedBy('count', {
  descending: true,
  coerce: true,
});
```

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

For example, add the following to your `package.json` at the root level. See [configuring jest](https://jestjs.io/docs/en/configuration) for more info.

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
require('jest-sorted');
require('jest-chain');
require('any other test framework libraries you are using');
```

Then in your Jest config:

```json
"jest": {
  "setupTestFrameworkScriptFile": "./testSetup.js"
}
```

### Typescript

- Coming soon...

## Usage

### `toBeSorted`

Passes if the array is sorted in ascending order.

```js
expect([1, 2, 3]).toBeSorted();
```

#### options

The following options can be passed as an object to alter the assertions behaviour

- **descending** : boolean - Asserts the array is sorted in descending order. (Defaults to false)

```js
expect([3, 2, 1]).toBeSorted({ descending: true });
```

- **coerce** : boolean - Coereces values to numbers before comparison. (Defaults to false) Note: consecutive NaN values after co-ercion are considered to be sorted

```js
expect(['2', '12']).toBeSorted({ coerce: true });
```

- **key** : string - Will use the value from the passed key in an array of objects. (Used internally by the toBeSortedBy method)

```js
expect([{ id: 1 }, { id: 2 }, { id: 3 }]).toBeSorted({ key: 'id' });
```

- **strict** : boolean - Fails the assertion if a passed key option does not exist in the object. (Defaults to true) Note: will use undefined for all missing keys and equal values are considered sorted.

```js
expect([{ id: 1 }, { id: 2 }, { id: 3 }]).toBeSorted({
  key: 'nothing',
  strict: false,
});
```

- **compare** : function - A custom function to use for comparison. (Default comparison is a simple greater / less than). In some cases you may want to check values are sorted by a different condition. The function will take 2 elements from the array (a,b) and should return:

  - A negative number if a comes first.
  - A positive number if b comes first.
  - 0 if the values are sorted equally.

See the compareFunction of [Array.prototype.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) for more info.

```js
const doubleDigitsFirst = (a, b) => {
  if (a >= 10 && b < 10) {
    return -1;
  }
  if (b >= 10 && a < 10) {
    return 1;
  }
  return 0;
};

expect([10, 20, 1, 2]).toBeSorted({
  compare: doubleDigitsFirst,
});
```

### `toBeSortedBy`

Passes if the array of objects is sorted in ascending order by the passed key. (Alias for toBeSorted({ key }))

```js
expect([{ id: 1 }, { id: 2 }, { id: 3 }]).toBeSortedBy('id');
```

#### options

The following options can be passed as an object to alter the assertions behaviour

- **descending** : boolean - Asserts the array is sorted in descending order. (Defaults to false)

```js
expect([{ id: 3 }, { id: 2 }, { id: 1 }]).toBeSortedBy('id', {
  descending: true,
});
```

- **coerce** : boolean - Coereces values to numbers before comparison. (Defaults to false) Note: consecutive NaN values after co-ercion are considered to be sorted

```js
expect([{ count: '2' }, { count: '12' }]).toBeSortedBy('count', {
  coerce: true,
});
```

- **strict** : boolean - Fails the assertion if a passed key option does not exist in the object. (Defaults to true) Note: will use undefined for all missing keys and equal values are considered sorted.

```js
expect([{ id: 3 }, { id: 2 }, { id: 1 }]).toBeSortedBy('nothing', {
  strict: false,
});
```

- **compare** : function - A custom function to use for comparison. (Default comparison is a simple greater / less than). In some cases you may want to check values are sorted by a different condition. The function will take 2 values from the specified keys (a,b) and should return:

  - A negative number if a comes first.
  - A positive number if b comes first.
  - 0 if the values are sorted equally.

See the compareFunction of [Array.prototype.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) for more info.

```js
const doubleDigitsFirst = (a, b) => {
  if (a >= 10 && b < 10) {
    return -1;
  }
  if (b >= 10 && a < 10) {
    return 1;
  }
  return 0;
};

expect([{ count: 10 }, { count: 20 }, { count: 1 }, { count: 2 }]).toBeSortedBy(
  'count',
  {
    compare: doubleDigitsFirst,
  }
);
```
