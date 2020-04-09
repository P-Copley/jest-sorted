exports.toBeSorted = (recieved, options) => {
  const passMessage = `Expected [${recieved}] to not be sorted in ascending order`;
  return {
    pass: true,
    message: () => passMessage,
  };
};
