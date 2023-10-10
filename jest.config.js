module.exports = {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  modulePaths: ["<rootDir>/src"],
};
