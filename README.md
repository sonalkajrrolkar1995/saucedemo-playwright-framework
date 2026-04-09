# SauceDemo Playwright Automation Framework

Automated test suite for [saucedemo.com](https://www.saucedemo.com) built with Playwright and JavaScript. Covers UI and API tests across Chrome and Firefox.

**86 tests. 0 failures.**

---

## Test Coverage

- Login: valid credentials, invalid credentials, locked out user, empty fields
- Products page: product count, names, sorting by name and price
- Cart: adding items, removing items, price verification
- Checkout: full order flow, validation errors on missing fields
- Burger menu: logout, navigation, reset app state
- API: status codes, response time, content type

---

## Project Structure

```
pages/          Page object classes, one per page
tests/ui/       UI test specs, one file per feature
tests/api/      API-level HTTP tests
test-data/      Usernames, passwords, product data, checkout data
fixtures/       Shared login setup for tests that require authentication
utils/          Reusable helper and assertion functions
playwright.config.js
```

---

## Requirements

- Node.js 18+
- npm 8+

---

## Setup

```bash
git clone https://github.com/sonalkajrrolkar1995/saucedemo-playwright-framework
cd saucedemo-playwright-framework
npm install
npx playwright install
```

---

## Running Tests

```bash
# Run all tests
npx playwright test

# Run a specific spec file
npx playwright test tests/ui/login.spec.js

# Run with browser visible
npx playwright test --headed

# Chrome only
npx playwright test --project=chromium

# Firefox only
npx playwright test --project=firefox

# View HTML report after a run
npx playwright show-report
```

---

## Design Decisions

Tests follow the Page Object Model. All locators and actions are in the `pages/` folder. Test files only contain test logic, no selectors.

Test data lives in `test-data/` so credentials, product names, and expected values are defined once and imported where needed.

No hard waits. Playwright's built-in auto-waiting handles all element readiness.

Screenshots and videos are captured only on failure.

---

## Author

Sonal Kajrolkar
GitHub: [sonalkajrrolkar1995](https://github.com/sonalkajrrolkar1995)

LinkedIn: https://www.linkedin.com/in/sonalkajrolkar/
