exports.toBeSorted = (recieved, options = {}) => {
  const { descending = false, key } = options;
  const arrayMsg = key ? `Array(${recieved.length})` : `[${recieved}]`;
  const keyMsg = key ? `by ${key} ` : "";
  const orderMsg = descending ? "descending" : "ascending";

  let pass = true;

  for (let i = 0; i < recieved.length; i++) {
    let ele = key ? recieved[i][key] : recieved[i];
    let nextEle =
      key && recieved[i + 1] ? recieved[i + 1][key] : recieved[i + 1];
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
