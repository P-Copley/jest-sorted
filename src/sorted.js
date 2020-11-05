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
  const {
    descending = false,
    key,
    coerce = false,
    strict = true,
    compare = defaultCompare,
  } = options;
  const descMult = descending ? -1 : 1;
  const arrayMsg = key ? `Array(${received.length})` : `[${received}]`;
  const orderMsg = descending ? 'descending' : 'ascending';
  let keyMsg = key ? `by ${key} ` : '';

  let pass = true;

  // we're accessing the next element where we would compare with undefined.
  for (let i = 0; i < received.length - 1; i++) {
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
    if (descMult * compare(ele, nextEle) > 0) {
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

exports.toBeSortedBy = (recieved, key, options = {}, ...args) => {
  return exports.toBeSorted(recieved, { ...options, key }, ...args);
};
