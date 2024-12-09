module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    'ts',
  ],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    "**/*.ts",
    "!**/node_modules/**"
  ],
  coverageDirectory: '../coverage',
  coverageReporters: ['text', 'lcov'],
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: '../coverage',
      outputName: 'test-report.xml',
    }],
  ],
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      statements: 10,
      branches: 20,
      functions: 10,
      lines: 10,
    },
  },
};
