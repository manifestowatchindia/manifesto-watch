/**
 * Jest Setup File
 * Configure test environment
 */

// Set up environment variables for tests
process.env.REACT_APP_API_BASE_URL = 'http://localhost:8000';

// Mock console methods to reduce noise in test output
global.console = {
  ...console,
  // Uncomment to suppress console output in tests
  // log: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
};

// Mock fetch if not available
if (!global.fetch) {
  global.fetch = jest.fn();
}

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
});
