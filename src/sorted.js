exports.toBeSorted = (recieved, options = {}) => {
  const { descending = false, key, coerce = false, strict = true } = options;
  const arrayMsg = key ? `Array(${recieved.length})` : `[${recieved}]`;
  const orderMsg = descending ? "descending" : "ascending";
  let keyMsg = key ? `by ${key} ` : "";

  let pass = true;

  for (let i = 0; i < recieved.length; i++) {
    let ele = recieved[i];
    let nextEle = recieved[i + 1];
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

  const passMsg = pass ? "not " : "";
  const errMsg = `Expected ${arrayMsg} to ${passMsg}be sorted ${keyMsg}in ${orderMsg} order`;

  return {
    pass,
    message: () => errMsg,
  };
};

exports.toBeSortedBy = (recieved, key, options = {}, ...args) => {
  return exports.toBeSorted(recieved, { ...options, key }, ...args);
};
