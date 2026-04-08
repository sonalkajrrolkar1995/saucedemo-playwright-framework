# SauceDemo Playwright Automation Framework

This is a complete automated testing framework for [SauceDemo](https://www.saucedemo.com) built with [Playwright](https://playwright.dev) and JavaScript.

It is designed to be so clearly written and well-commented that anyone — even someone who has never written code before — can open any file and understand exactly what it does just by reading the comments.

---

## What Does This Framework Test?

The framework tests the SauceDemo e-commerce website end-to-end, covering:

| Test Area | What It Tests |
|-----------|--------------|
| **Login** | Valid login, invalid login, locked users, empty fields, logout |
| **Products** | Product listing, sorting, adding/removing items, cart badge |
| **Cart** | Viewing cart, removing items, empty cart, prices |
| **Checkout** | Full order flow, form validation, order total, confirmation |
| **Menu** | Burger menu, logout, all items navigation, cart reset |
| **API** | HTTP status codes, response time, page content |

---

## Requirements

Before running the tests, make sure you have these installed:

- [Node.js](https://nodejs.org) version 18 or higher
- npm (comes with Node.js automatically)

To check if Node.js is installed, open a terminal and type:
```
node --version
```

---

## Quick Start (How To Run The Tests)

### Step 1: Clone the repository
```bash
git clone <your-repo-url>
cd saucedemo-framework
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Install the browsers Playwright needs
```bash
npx playwright install chromium firefox
```

### Step 4: Run all the tests
```bash
npx playwright test
```

That's it! Playwright will open Chrome and Firefox and run all the tests automatically.

---

## Viewing The Test Results

After the tests finish, open the visual HTML report:
```bash
npx playwright show-report
```

This opens a beautiful webpage showing which tests passed, which failed, and screenshots/videos of any failures.

---

## Running Specific Tests

Run only the login tests:
```bash
npx playwright test tests/ui/login.spec.js
```

Run only on Chrome:
```bash
npx playwright test --project=chromium
```

Run only on Firefox:
```bash
npx playwright test --project=firefox
```

Run tests matching a keyword:
```bash
npx playwright test --grep "should login"
```

Run in headed mode (watch the browser):
```bash
npx playwright test --headed
```

---

## Project Structure

```
saucedemo-framework/
│
├── pages/                    ← Page Object Model classes
│   ├── LoginPage.js          ← Everything on the login page
│   ├── ProductsPage.js       ← Everything on the products/inventory page
│   ├── CartPage.js           ← Everything on the shopping cart page
│   ├── CheckoutPage.js       ← Everything on the checkout pages (step 1 & 2)
│   ├── ConfirmationPage.js   ← Everything on the order confirmation page
│   └── MenuPage.js           ← The burger menu on every page
│
├── tests/
│   ├── ui/                   ← Browser-based UI tests
│   │   ├── login.spec.js     ← Login page tests
│   │   ├── products.spec.js  ← Products page tests
│   │   ├── cart.spec.js      ← Shopping cart tests
│   │   ├── checkout.spec.js  ← Checkout flow tests
│   │   └── menu.spec.js      ← Burger menu tests
│   └── api/
│       └── api.spec.js       ← HTTP/API level tests
│
├── test-data/                ← Test data (usernames, products, checkout info)
│   ├── users.js              ← All usernames and passwords
│   ├── products.js           ← All product names, prices, descriptions
│   └── checkout.js           ← Customer data for checkout forms
│
├── fixtures/
│   └── base.fixture.js       ← Reusable setup (provides page objects to tests)
│
├── utils/
│   ├── helpers.js            ← Reusable helper functions
│   └── assertions.js         ← Reusable assertion/check functions
│
├── playwright.config.js      ← Main Playwright configuration
├── CLAUDE.md                 ← Rules for AI assistants working on this project
└── README.md                 ← This file
```

---

## Key Design Principles

### Page Object Model (POM)
All locators (how to find buttons, inputs, etc.) live in the `pages/` folder. Tests never contain raw locators. If the website changes, you only update the page object file — not every test.

### No Hardcoded Waits
We never use `waitForTimeout()` or `sleep()`. Playwright automatically waits for elements to appear and actions to complete. Our tests are fast and reliable.

### Test Data Separation
Usernames, passwords, and product details are stored in `test-data/` files, not inside test files. Change data in one place, it updates everywhere.

### Every Line Commented
Every file, class, method, and locator has a plain-English comment explaining exactly what it does. No experience needed to understand the code.

---

## Troubleshooting

**Tests are failing with "element not found" errors:**
1. Run `npx playwright show-report` to see screenshots of the failures
2. Check if the website has changed its HTML structure
3. Update the locator in the relevant `pages/` file

**Browser did not open:**
- Make sure you ran `npx playwright install chromium firefox`

**"Cannot find module" error:**
- Make sure you ran `npm install`

---

## Credentials Used In Tests

| User | Username | Password | Notes |
|------|----------|----------|-------|
| Standard | `standard_user` | `secret_sauce` | Normal user, all features work |
| Locked Out | `locked_out_user` | `secret_sauce` | Cannot log in |
| Problem | `problem_user` | `secret_sauce` | UI shows broken images |
| Performance | `performance_glitch_user` | `secret_sauce` | Site loads slowly |
