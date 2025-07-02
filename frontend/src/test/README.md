# Testing Guide

This document outlines the testing approach and best practices for the BLRY frontend application.

## 🧪 Testing Stack

- **Vitest** - Fast unit test runner
- **React Testing Library** - Component testing utilities
- **Jest DOM** - Custom Jest matchers for DOM elements
- **User Event** - Utilities for simulating user interactions

## 🚀 Running Tests

```bash
# Run tests in watch mode
npm run test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## 📁 Test Structure

```
src/
├── components/
│   └── __tests__/          # Component tests
├── pages/
│   └── __tests__/          # Page component tests
├── config/
│   └── __tests__/          # Configuration tests
└── test/
    ├── setup.js            # Test setup and configuration
    └── README.md           # This file
```

## ✅ Testing Best Practices

### Component Testing

- Test component rendering and behavior
- Test user interactions (clicks, form inputs)
- Test props and state changes
- Use semantic queries (getByRole, getByLabelText)

### Example Test Structure

```javascript
describe('ComponentName', () => {
  it('renders correctly', () => {
    // Test basic rendering
  });

  it('handles user interactions', () => {
    // Test clicks, form submissions, etc.
  });

  it('displays correct content', () => {
    // Test text content, attributes, etc.
  });
});
```

### Router Testing

For components using React Router, wrap them in BrowserRouter:

```javascript
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};
```

### Form Testing

Use userEvent for realistic user interactions:

```javascript
const user = userEvent.setup();
await user.type(input, 'test value');
await user.click(button);
```

## 🔧 Test Configuration

### Setup File (`setup.js`)

- Imports Jest DOM matchers
- Mocks environment variables
- Configures global test utilities

### Vitest Config (`vitest.config.js`)

- Uses jsdom environment for DOM testing
- Enables globals for describe/it/expect
- Loads setup file automatically

## 📊 Coverage

Run `npm run test:coverage` to generate coverage reports. Aim for:

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

## 🚫 What NOT to Test

- Implementation details (internal state, private methods)
- Third-party library functionality
- Styling (unless it affects behavior)
- Browser-specific behavior

## 🔮 Future Enhancements

When Django backend is integrated:

- Add API mocking with MSW (Mock Service Worker)
- Integration tests for API calls
- End-to-end tests with Playwright or Cypress
