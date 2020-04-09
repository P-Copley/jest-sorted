exports.toBeSorted = (recieved, options) => {
  const passMessage = `Expected [${recieved}] to not be sorted in ascending order`;
  const failMessage = `Expected [${recieved}] to be sorted in ascending order`;
  let pass = true;

  for (let i = 0; i < recieved.length; i++) {
    let ele = recieved[i];
    let nextEle = recieved[i + 1];
    if (ele > nextEle) {
      pass = false;
      break;
    }
  }

  return {
    pass,
    message: () => (pass ? passMessage : failMessage),
  };
};
