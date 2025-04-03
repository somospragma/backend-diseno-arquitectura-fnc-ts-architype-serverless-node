module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    moduleNameMapper: {
      '^@parameterManagement/(.*)$': '<rootDir>/src/pragma/arquetipo/parameterManagement/$1',
      '^@userManagement/(.*)$': '<rootDir>/src/pragma/arquetipo/userManagement/$1',
      '^@crosscutting/(.*)$': '<rootDir>/src/pragma/arquetipo/crosscutting/$1',
    },
  };