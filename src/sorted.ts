interface SortedOptions {
  descending?: boolean;
  key?: string;
  coerce?: boolean;
  strict?: boolean;
}

interface TestResult {
  pass: boolean;
  message: () => string;
}

export const toBeSorted = (
  received: Array<any>,
  options: SortedOptions = {},
  ...args: Array<any>
): TestResult => {
  const { descending = false, key, coerce = false, strict = true } = options;
  const arrayMsg = key ? `Array(${received.length})` : `[${received}]`;
  const orderMsg = descending ? 'descending' : 'ascending';
  let keyMsg = key ? `by ${key} ` : '';

  let pass = true;

  for (let i = 0; i < received.length; i++) {
    let ele = received[i];
    let nextEle = received[i + 1];
    if (key) {
      if (strict && !(key in ele)) {
        pass = false;
        keyMsg = `by a missing key, ${key}, `;
        break;
      }
      ele = ele[key];
      nextEle = nextEle && nextEle[key];
    }
    if (coerce) {
      ele = +ele;
      nextEle = +nextEle;
    }
    if (descending ? ele < nextEle : ele > nextEle) {
      pass = false;
      break;
    }
  }

  const passMsg = pass ? 'not ' : '';
  const errMsg = `Expected ${arrayMsg} to ${passMsg}be sorted ${keyMsg}in ${orderMsg} order`;

  return {
    pass,
    message: () => errMsg,
  };
};

export const toBeSortedBy = (
  received: Array<any>,
  key: string,
  options: SortedOptions = {},
  ...args: Array<any>
) => {
  return toBeSorted(received, { ...options, key }, ...args);
};
