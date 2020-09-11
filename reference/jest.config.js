const jestPreset = require('@rocket-scripts/web/jest-preset');
const path = require('path');

module.exports = {
  ...jestPreset,

  testTimeout: 50000,

  moduleNameMapper: {
    ...jestPreset.moduleNameMapper,
    '@rocket-scripts/openapi': path.join(
      __dirname,
      '../packages/src/@rocket-scripts/openapi',
    ),
    '@rocket-scripts/mockup': path.join(
      __dirname,
      '../packages/src/@rocket-scripts/mockup',
    ),
  },
};
