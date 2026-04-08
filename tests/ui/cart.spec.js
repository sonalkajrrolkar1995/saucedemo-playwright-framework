// ============================================================
// tests/ui/cart.spec.js
// This file tests the Shopping Cart page.
//
// What does this cover?
//   - The correct item appears in cart after adding from products page
//   - Two items appear when two are added
//   - Removing one item from the cart makes it disappear
//   - An empty cart shows no items
//   - Prices shown in cart match what we expect
//   - "Continue Shopping" goes back to the products page
//   - "Checkout" button takes you to the checkout page
// ============================================================

const { test, expect } = require('../../fixtures/base.fixture');
const { validUser } = require('../../test-data/users');
const products = require('../../test-data/products');

const LoginPage = require('../../pages/LoginPage');
const ProductsPage = require('../../pages/ProductsPage');
const CartPage = require('../../pages/CartPage');

test.describe('Cart Page', () => {

  // ── SETUP: Log in before each test ───────────────────────────
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);
    await expect(page).toHaveURL('/inventory.html');
  });

  // ── TEST 1 ────────────────────────────────────────────────────
  // Add one product to the cart, go to the cart page,
  // and verify the product appears there.
  test('should show correct item in cart after adding from products page', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    // Add the backpack to the cart from the products page
    await productsPage.addToCartByName(products.backpack.name);

    // Navigate to the cart page by clicking the cart icon
    await productsPage.goToCart();

    // Check that the backpack is visible in the cart
    await cartPage.verifyItemInCart(products.backpack.name);
  });

  // ── TEST 2 ────────────────────────────────────────────────────
  // Add two items and verify both appear in the cart.
  test('should show two items in cart after adding two products', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    // Add two different products
    await productsPage.addToCartByName(products.backpack.name);
    await productsPage.addToCartByName(products.bikeLight.name);

    // Go to the cart page
    await productsPage.goToCart();

    // Both items should be visible in the cart
    await cartPage.verifyItemInCart(products.backpack.name);
    await cartPage.verifyItemInCart(products.bikeLight.name);

    // The cart should show exactly 2 items
    const count = await cartPage.getCartItemCount();
    expect(count).toBe(2);
  });

  // ── TEST 3 ────────────────────────────────────────────────────
  // Add one item, go to cart, remove it, and verify it is gone.
  test('should remove one item from cart and verify it is gone', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    // Add the backpack to the cart
    await productsPage.addToCartByName(products.backpack.name);

    // Navigate to the cart
    await productsPage.goToCart();

    // Confirm it is in the cart
    await cartPage.verifyItemInCart(products.backpack.name);

    // Now remove the backpack from the cart
    await cartPage.removeItem(products.backpack.name);

    // The backpack should no longer be visible
    await cartPage.verifyItemNotInCart(products.backpack.name);

    // The cart should now be empty (0 items)
    const count = await cartPage.getCartItemCount();
    expect(count).toBe(0);
  });

  // ── TEST 4 ────────────────────────────────────────────────────
  // Go directly to the cart page without adding anything.
  // The cart should be empty.
  test('should show empty cart when no items have been added', async ({ page }) => {
    // Navigate directly to the cart page (bypassing products page)
    await page.goto('/cart.html');

    const cartPage = new CartPage(page);

    // The cart page should load with the correct title
    await cartPage.verifyPageLoaded();

    // There should be zero items in the cart
    const count = await cartPage.getCartItemCount();
    expect(count).toBe(0);
  });

  // ── TEST 5 ────────────────────────────────────────────────────
  // Check that prices shown in the cart match what we expect.
  test('should show correct price for backpack in cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Add the backpack to the cart
    await productsPage.addToCartByName(products.backpack.name);

    // Go to the cart
    await productsPage.goToCart();

    // Find the price shown for the backpack and verify it is correct
    const backpackRow = page
      .getByTestId('inventory-item')
      .filter({ hasText: products.backpack.name });

    await expect(backpackRow.getByTestId('inventory-item-price')).toHaveText(products.backpack.price);
  });

  // ── TEST 6 ────────────────────────────────────────────────────
  // Click "Continue Shopping" and verify it goes back to the products page.
  test('should go back to products page when clicking continue shopping', async ({ page }) => {
    // Navigate directly to the cart page
    await page.goto('/cart.html');

    const cartPage = new CartPage(page);

    // Click "Continue Shopping"
    await cartPage.continueShopping();

    // We should be back on the products page
    await expect(page).toHaveURL('/inventory.html');
  });

  // ── TEST 7 ────────────────────────────────────────────────────
  // Click "Checkout" and verify it goes to checkout step one.
  test('should proceed to checkout page when clicking checkout button', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    // Add an item first so the checkout button works
    await productsPage.addToCartByName(products.backpack.name);

    // Go to the cart page
    await productsPage.goToCart();

    // Click the Checkout button
    await cartPage.proceedToCheckout();

    // We should now be on checkout step 1
    await expect(page).toHaveURL('/checkout-step-one.html');
  });

});
