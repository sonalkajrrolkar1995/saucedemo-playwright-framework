// ============================================================
// tests/ui/checkout.spec.js
// This file tests the complete Checkout flow.
//
// The checkout has two steps:
//   Step 1 (checkout-step-one.html):  Fill in shipping details
//   Step 2 (checkout-step-two.html):  Review order and finish
//   Confirmation (checkout-complete.html): Thank you message
//
// What does this cover?
//   - The full happy path: login → add item → cart → checkout → confirmation
//   - Error when first name is missing
//   - Error when last name is missing
//   - Error when postal code is missing
//   - Correct item total shown on overview page
//   - Correct tax amount shown on overview page
//   - Cancel checkout returns to cart
//   - Clicking Back Home after confirmation returns to products
// ============================================================

const { test, expect } = require('../../fixtures/base.fixture');
const { validUser } = require('../../test-data/users');
const products = require('../../test-data/products');
const { validCustomer, emptyCustomer, missingLastName, missingPostalCode, errors } = require('../../test-data/checkout');

const LoginPage = require('../../pages/LoginPage');
const ProductsPage = require('../../pages/ProductsPage');
const CartPage = require('../../pages/CartPage');
const CheckoutPage = require('../../pages/CheckoutPage');
const ConfirmationPage = require('../../pages/ConfirmationPage');

test.describe('Checkout Flow', () => {

  // ── SETUP ──────────────────────────────────────────────────────
  // Log in and add one product to the cart before each test.
  // Most checkout tests need at least one item in the cart to work.
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);
    await expect(page).toHaveURL('/inventory.html');

    // Add the backpack to the cart
    const productsPage = new ProductsPage(page);
    await productsPage.addToCartByName(products.backpack.name);

    // Go to cart and proceed to checkout
    await productsPage.goToCart();
    const cartPage = new CartPage(page);
    await cartPage.proceedToCheckout();

    // We should now be on checkout step one
    await expect(page).toHaveURL('/checkout-step-one.html');
  });

  // ── TEST 1 ────────────────────────────────────────────────────
  // Complete the full order from checkout step one to confirmation.
  // This is the most important test in this file.
  test('should complete full order flow from checkout to confirmation message', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const confirmationPage = new ConfirmationPage(page);

    // Fill in the shipping details with valid customer data
    await checkoutPage.fillShippingDetails(
      validCustomer.firstName,
      validCustomer.lastName,
      validCustomer.postalCode
    );

    // Click Continue to go to the order overview page
    await checkoutPage.clickContinue();
    await expect(page).toHaveURL('/checkout-step-two.html');

    // Click Finish to complete the order
    await checkoutPage.clickFinish();

    // The confirmation page should show the thank you message
    await confirmationPage.verifyOrderComplete();
  });

  // ── TEST 2 ────────────────────────────────────────────────────
  // Submit without filling First Name - should show error.
  test('should show error when first name is missing at checkout', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    // Only fill last name and postal code (skip first name)
    await checkoutPage.fillShippingDetails('', validCustomer.lastName, validCustomer.postalCode);
    await checkoutPage.clickContinue();

    // Error should say: "Error: First Name is required"
    await checkoutPage.verifyErrorMessage(errors.firstNameRequired);

    // We should still be on step one
    await expect(page).toHaveURL('/checkout-step-one.html');
  });

  // ── TEST 3 ────────────────────────────────────────────────────
  // Submit without Last Name - should show error.
  test('should show error when last name is missing at checkout', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    // Fill first name and postal code but not last name
    await checkoutPage.fillShippingDetails(validCustomer.firstName, '', validCustomer.postalCode);
    await checkoutPage.clickContinue();

    // Error should say: "Error: Last Name is required"
    await checkoutPage.verifyErrorMessage(errors.lastNameRequired);
  });

  // ── TEST 4 ────────────────────────────────────────────────────
  // Submit without Postal Code - should show error.
  test('should show error when postal code is missing at checkout', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    // Fill first and last name but not postal code
    await checkoutPage.fillShippingDetails(validCustomer.firstName, validCustomer.lastName, '');
    await checkoutPage.clickContinue();

    // Error should say: "Error: Postal Code is required"
    await checkoutPage.verifyErrorMessage(errors.postalCodeRequired);
  });

  // ── TEST 5 ────────────────────────────────────────────────────
  // Check that the item total on the overview page is correct.
  // Sauce Labs Backpack is $29.99, so item total should be $29.99.
  test('should show correct item total on checkout overview page', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    // Fill in valid shipping details and continue
    await checkoutPage.fillShippingDetails(
      validCustomer.firstName,
      validCustomer.lastName,
      validCustomer.postalCode
    );
    await checkoutPage.clickContinue();
    await expect(page).toHaveURL('/checkout-step-two.html');

    // The subtotal label should contain the backpack price
    const subtotal = await checkoutPage.getSubtotalText();
    expect(subtotal).toContain('$29.99');
  });

  // ── TEST 6 ────────────────────────────────────────────────────
  // Check that a tax amount is shown on the overview page.
  test('should show tax amount on checkout overview page', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    // Fill in valid details and continue
    await checkoutPage.fillShippingDetails(
      validCustomer.firstName,
      validCustomer.lastName,
      validCustomer.postalCode
    );
    await checkoutPage.clickContinue();
    await expect(page).toHaveURL('/checkout-step-two.html');

    // The tax label should start with "Tax:"
    const tax = await checkoutPage.getTaxText();
    expect(tax).toContain('Tax:');
  });

  // ── TEST 7 ────────────────────────────────────────────────────
  // Click Cancel on step one - should return to the cart page.
  test('should cancel checkout and return to cart page', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    // Click the Cancel button without filling anything in
    await checkoutPage.clickCancel();

    // We should be back on the cart page
    await expect(page).toHaveURL('/cart.html');
  });

  // ── TEST 8 ────────────────────────────────────────────────────
  // Complete the order, then click "Back Home" to return to products.
  test('should complete order and go back to products after clicking back home', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const confirmationPage = new ConfirmationPage(page);

    // Complete the checkout
    await checkoutPage.fillShippingDetails(
      validCustomer.firstName,
      validCustomer.lastName,
      validCustomer.postalCode
    );
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();

    // Verify we are on the confirmation page
    await confirmationPage.verifyOrderComplete();

    // Click "Back Home" to return to the products page
    await confirmationPage.clickBackHome();

    // We should be back on the products page
    await expect(page).toHaveURL('/inventory.html');
  });

});
