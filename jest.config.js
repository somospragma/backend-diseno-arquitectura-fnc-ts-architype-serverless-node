module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    moduleNameMapper: {
      '^@parameterManagement/(.*)$': '<rootDir>/src/parameterManagement/$1',
      '^@userManagement/(.*)$': '<rootDir>/src/userManagement/$1',
      '^@crosscutting/(.*)$': '<rootDir>/src/crosscutting/$1',
    },
  };
  