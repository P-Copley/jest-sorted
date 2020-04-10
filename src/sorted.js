exports.toBeSorted = (recieved, options = {}) => {
  const { descending = false, key, coerce = false } = options;
  const arrayMsg = key ? `Array(${recieved.length})` : `[${recieved}]`;
  const keyMsg = key ? `by ${key} ` : "";
  const orderMsg = descending ? "descending" : "ascending";

  let pass = true;

  for (let i = 0; i < recieved.length; i++) {
    let ele = recieved[i];
    let nextEle = recieved[i + 1];
    if (key) {
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
