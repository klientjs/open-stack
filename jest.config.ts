export default {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['**/src/**', '!**/src/__tests__/**'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  coverageReporters: ['clover', 'json', 'lcov', 'text', 'json-summary'],
  transform: {
    '\\.(ts)$': 'ts-jest'
  },
  testMatch: ["**/*.test.ts"],
};
