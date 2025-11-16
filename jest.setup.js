// Setup file for Jest - matchers are now built into @testing-library/react-native v12.4+

// Mock Expo modules to prevent winter runtime errors
jest.mock('expo', () => ({
  ...jest.requireActual('expo'),
  __ExpoImportMetaRegistry: {}
}));

global.__ExpoImportMetaRegistry = {};
