const jestPreset = require('@rocket-scripts/web/jest-preset');
const path = require('path');

module.exports = {
  ...jestPreset,

  moduleNameMapper: {
    ...jestPreset.moduleNameMapper,
    '@rocket-scripts/openapi': path.join(
      __dirname,
      '../source/src/@rocket-scripts/openapi',
    ),
  },
};
