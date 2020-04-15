const { toBeSorted, toBeSortedBy } = require("./src/sorted");

const jestExpect = global.expect;

if (jestExpect !== undefined) {
  jestExpect.extend({
    toBeSorted,
    toBeSortedBy,
  });
} else {
  /* eslint-disable no-console */
  console.error(
    "Unable to find Jest's global expect." +
      "\nPlease check you have added jest-sorted correctly to your jest configuration." +
      "\nSee https://github.com/jest-community/jest-extended#setup for help."
  );
}
