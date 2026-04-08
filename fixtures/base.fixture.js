// ============================================================
// fixtures/base.fixture.js
// This file sets up "fixtures" for our tests.
//
// What is a fixture?
// Think of a fixture like a "setup kit" that Playwright prepares
// BEFORE your test runs, and cleans up AFTER your test finishes.
//
// For example: instead of writing login code at the start of EVERY
// single test, we create a fixture that logs in automatically.
// Tests that need to start from the Products page just use the
// 'loggedInPage' fixture and they start already logged in.
//
// All test files import 'test' and 'expect' from THIS file,
// NOT from '@playwright/test' directly.
// This ensures every test has access to our custom page objects.
// ============================================================

// We import the base 'test' function from Playwright and extend it
// with our own custom fixtures.
const { test: base, expect } = require('@playwright/test');

// Import all our page objects so we can provide them as fixtures
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const ConfirmationPage = require('../pages/ConfirmationPage');
const MenuPage = require('../pages/MenuPage');

// Import our test data so fixtures can use the standard credentials
const { validUser } = require('../test-data/users');

// ── EXTEND THE BASE TEST WITH CUSTOM FIXTURES ─────────────
// We call base.extend() to add our own fixtures to Playwright's test runner.
// Each fixture is a property that our tests can use.
const test = base.extend({

  // ── loginPage fixture ─────────────────────────────────────
  // Provides a LoginPage object connected to the current browser page.
  // Use this in tests that need to interact with the login page.
  loginPage: async ({ page }, use) => {
    // Create a new LoginPage instance connected to the browser page
    const loginPage = new LoginPage(page);
    // Give the loginPage to the test that requested it
    await use(loginPage);
    // Nothing to clean up after the test
  },

  // ── productsPage fixture ──────────────────────────────────
  // Provides a ProductsPage object connected to the current browser page.
  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },

  // ── cartPage fixture ──────────────────────────────────────
  // Provides a CartPage object connected to the current browser page.
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  // ── checkoutPage fixture ──────────────────────────────────
  // Provides a CheckoutPage object connected to the current browser page.
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },

  // ── confirmationPage fixture ──────────────────────────────
  // Provides a ConfirmationPage object connected to the current browser page.
  confirmationPage: async ({ page }, use) => {
    const confirmationPage = new ConfirmationPage(page);
    await use(confirmationPage);
  },

  // ── menuPage fixture ──────────────────────────────────────
  // Provides a MenuPage object connected to the current browser page.
  menuPage: async ({ page }, use) => {
    const menuPage = new MenuPage(page);
    await use(menuPage);
  },

  // ── loggedInPage fixture ──────────────────────────────────
  // This is the most useful fixture. It:
  //   1. Opens the browser
  //   2. Navigates to the login page
  //   3. Logs in with the standard user credentials
  //   4. Waits until the Products page is loaded
  //   5. Gives your test a Playwright 'page' object already on Products page
  //
  // Use this in any test that requires the user to already be logged in.
  loggedInPage: async ({ page }, use) => {
    // Create a LoginPage instance and navigate to the login URL
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Log in with the valid standard user credentials from test-data/users.js
    await loginPage.login(validUser.username, validUser.password);

    // Wait for the products page to load (URL changes to /inventory.html)
    await expect(page).toHaveURL('/inventory.html');

    // Give the logged-in page to the test
    await use(page);

    // After the test finishes, nothing special to clean up
    // Each test gets a fresh browser context anyway
  },
});

// Export 'test' (with our custom fixtures) and 'expect' so test files can use them.
// In test files: const { test, expect } = require('../../fixtures/base.fixture');
module.exports = { test, expect };
