// ============================================================
// utils/helpers.js
// This file contains helper functions used across multiple tests.
// A helper function is a reusable block of code that does a
// common task so you do not have to copy-paste it everywhere.
//
// For example: logging in and navigating to products is something
// many tests need to do. Instead of writing those 4 lines in every
// single test, we write it once here as loginAndGoToProducts().
// ============================================================

// Import all page objects so helpers can use them
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const ConfirmationPage = require('../pages/ConfirmationPage');
const MenuPage = require('../pages/MenuPage');

// Log in to the application and wait for the products page to load.
// This is the most common setup step across all tests.
// Parameters:
//   page     - the Playwright browser page object
//   username - the username to log in with
//   password - the password to log in with
async function loginAndGoToProducts(page, username, password) {
  // Create a LoginPage object and navigate to the login screen
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  // Type the username and password and click the Login button
  await loginPage.login(username, password);

  // Wait until the URL changes to /inventory.html (the products page)
  // This confirms login was successful and the page has loaded
  const { expect } = require('@playwright/test');
  await expect(page).toHaveURL('/inventory.html');

  // Return a ProductsPage object so the caller can interact with the page
  return new ProductsPage(page);
}

// Add a specific item to the cart from the Products page.
// Parameters:
//   page        - the Playwright browser page (must already be on products page)
//   productName - the full name of the product to add, e.g. 'Sauce Labs Backpack'
async function addItemToCart(page, productName) {
  // Create a ProductsPage object to use its addToCartByName method
  const productsPage = new ProductsPage(page);

  // Find the product by name and click its "Add to cart" button
  await productsPage.addToCartByName(productName);
}

// Complete the entire checkout process from the checkout-step-one page.
// This fills in the shipping form, continues to the overview, and clicks Finish.
// Parameters:
//   page     - the Playwright browser page (must be on checkout-step-one.html)
//   customer - an object with firstName, lastName, postalCode properties
//              e.g. { firstName: 'John', lastName: 'Doe', postalCode: '12345' }
async function completeCheckout(page, customer) {
  // Create a CheckoutPage to fill in the shipping form
  const checkoutPage = new CheckoutPage(page);

  // Fill in the First Name, Last Name, and Postal Code fields
  await checkoutPage.fillShippingDetails(
    customer.firstName,
    customer.lastName,
    customer.postalCode
  );

  // Click Continue to move to the Order Overview page
  await checkoutPage.clickContinue();

  // Click Finish to complete the order
  await checkoutPage.clickFinish();

  // Return a ConfirmationPage object so the caller can verify the success message
  return new ConfirmationPage(page);
}

// Reset the application state using the burger menu.
// This empties the cart and resets all "Add to cart" buttons.
// Useful as a cleanup step after tests that add items to the cart.
// Parameter:
//   page - the Playwright browser page (must be logged in)
async function clearCart(page) {
  // Create a MenuPage object to use its resetAppState method
  const menuPage = new MenuPage(page);

  // Open the burger menu and click "Reset App State"
  await menuPage.resetAppState();
}

// Export all helper functions so test files can import and use them.
// Example: const { loginAndGoToProducts } = require('../../utils/helpers');
module.exports = {
  loginAndGoToProducts,
  addItemToCart,
  completeCheckout,
  clearCart,
};
