module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    moduleNameMapper: {
      '^@parameterManagement/(.*)$': '<rootDir>/src/mercantil/arquetipo/parameterManagement/$1',
      '^@userManagement/(.*)$': '<rootDir>/src/mercantil/arquetipo/userManagement/$1',
      '^@crosscutting/(.*)$': '<rootDir>/src/mercantil/arquetipo/crosscutting/$1',
    },
  };