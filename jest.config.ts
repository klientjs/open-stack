export default {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "**/src/**",
  ],
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  coverageReporters: ['clover', 'json', 'lcov', 'text', 'json-summary'],
  transform: {
    "\\.(ts)$": "ts-jest"
  },
  testMatch: ["**/tests/**/*.test.ts"],
};
