const defaultCompare = (a, b) => {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
};

exports.toBeSorted = (received, options = {}) => {
  if (!received[Symbol.iterator]) {
    return {
      pass: false,
      message: () => `${received} is not iterable and cannot be sorted`,
    };
  }
  const iterable = [...received];

  const {
    descending = false,
    key,
    coerce = false,
    strict = true,
    compare = defaultCompare,
  } = options;
  const descMult = descending ? -1 : 1;
  const arrayMsg = key ? `Array(${iterable.length})` : `[${iterable}]`;
  const orderMsg = descending ? 'descending' : 'ascending';
  let keyMsg = key ? `by ${key} ` : '';
  let failingElements = '';

  let pass = true;

  // we're accessing the next element where we would compare with undefined.
  for (let i = 0; i < iterable.length - 1; i++) {
    let ele = iterable[i];
    let nextEle = iterable[i + 1];
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
    if (descMult * compare(ele, nextEle) > 0) {
      pass = false;
      const eleOrder = descending ? 'before' : 'after';
      const strEle = JSON.stringify(ele);
      const strNextEle = JSON.stringify(nextEle);
      const elePositioner = descending ? [strNextEle, strEle] : [strEle, strNextEle]
      failingElements = `\nExpected ${elePositioner[0]} to be ${eleOrder} ${elePositioner[1]}`; 
      break;
    }
  }

  const passMsg = pass ? 'not ' : '';
  const errMsg = `Expected ${arrayMsg} to ${passMsg}be sorted ${keyMsg}in ${orderMsg} order${failingElements}`;
  return {
    pass,
    message: () => errMsg,
  };
};

exports.toBeSortedBy = (recieved, key, options = {}, ...args) => {
  return exports.toBeSorted(recieved, { ...options, key }, ...args);
};
