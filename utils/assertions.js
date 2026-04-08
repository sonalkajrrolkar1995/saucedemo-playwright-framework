// ============================================================
// utils/assertions.js
// This file contains reusable assertion functions.
// An assertion is a statement that checks something is true.
// If the check fails, the test fails immediately.
//
// Instead of writing the same expect() calls in every test,
// we wrap them in named functions here. This makes tests
// read like plain English sentences.
//
// Example: instead of writing:
//   await expect(page.getByTestId('title')).toHaveText('Products');
// We write:
//   await verifyPageTitle(page, 'Products');
// ============================================================

// We need 'expect' from Playwright to write assertions
const { expect } = require('@playwright/test');

// Check that the page title element shows the expected heading text.
// This confirms you are on the right page.
// Parameters:
//   page          - the Playwright browser page object
//   expectedTitle - the exact text the title should show, e.g. 'Products'
async function verifyPageTitle(page, expectedTitle) {
  // data-test="title" is the heading element used on every page
  await expect(page.getByTestId('title')).toHaveText(expectedTitle);
}

// Check that the current page URL contains the expected text.
// This confirms navigation happened correctly.
// Parameters:
//   page    - the Playwright browser page object
//   urlPart - a string that should appear somewhere in the URL
//             e.g. 'inventory.html' or 'cart.html'
async function verifyURL(page, urlPart) {
  // toHaveURL with a string checks if the URL includes that string
  await expect(page).toHaveURL(new RegExp(urlPart));
}

// Check that the cart badge (the number on the cart icon) shows the expected count.
// Parameters:
//   page          - the Playwright browser page object
//   expectedCount - the number the badge should show, as a string e.g. '1' or '2'
async function verifyCartBadge(page, expectedCount) {
  // data-test="shopping-cart-badge" is the red number shown on the cart icon
  await expect(page.getByTestId('shopping-cart-badge')).toHaveText(expectedCount);
}

// Check that the cart badge is NOT visible (meaning the cart is empty).
// Parameter:
//   page - the Playwright browser page object
async function verifyCartIsEmpty(page) {
  // When the cart is empty, the badge element does not exist on the page
  await expect(page.getByTestId('shopping-cart-badge')).not.toBeVisible();
}

// Export all assertion functions so test files can import and use them.
// Example: const { verifyPageTitle } = require('../../utils/assertions');
module.exports = {
  verifyPageTitle,
  verifyURL,
  verifyCartBadge,
  verifyCartIsEmpty,
};
