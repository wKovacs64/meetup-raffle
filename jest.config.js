module.exports = {
  collectCoverageFrom: [
    'src/client/**/*.js{,x}',
    'src/functions/**/*.js',
    '!src/client/dev-tools/**/*.js{,x}',
    '!**/index.js',
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/src/client/__mocks__/style-mock.js',
  },
  resetMocks: false,
  setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
  snapshotSerializers: ['@emotion/jest/serializer'],
};
