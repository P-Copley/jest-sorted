exports.toBeSorted = (recieved, options = {}) => {
  const { descending = false } = options;
  const passMessage = `Expected [${recieved}] to not be sorted in ${
    descending ? "descending" : "ascending"
  } order`;
  const failMessage = `Expected [${recieved}] to be sorted in ${
    descending ? "descending" : "ascending"
  } order`;
  let pass = true;

  for (let i = 0; i < recieved.length; i++) {
    let ele = recieved[i];
    let nextEle = recieved[i + 1];
    if (descending ? ele < nextEle : ele > nextEle) {
      pass = false;
      break;
    }
  }

  return {
    pass,
    message: () => (pass ? passMessage : failMessage),
  };
};
