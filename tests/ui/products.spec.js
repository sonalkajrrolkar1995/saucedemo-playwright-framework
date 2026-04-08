// ============================================================
// tests/ui/products.spec.js
// This file tests the Products page (Inventory page).
// You see this page right after logging in.
//
// What does this cover?
//   - The page title shows "Products"
//   - Exactly 6 products are displayed
//   - Product names match the expected list
//   - Adding one product shows badge count of "1"
//   - Adding two products shows badge count of "2"
//   - Removing a product from products page works
//   - Sorting by Name A to Z shows correct order
//   - Sorting by Name Z to A shows correct order
//   - Sorting by Price low to high shows correct order
//   - Sorting by Price high to low shows correct order
//   - Clicking a product name opens the detail page
// ============================================================

// Import test and expect from our custom fixture
const { test, expect } = require('../../fixtures/base.fixture');

// Import test data files
const { validUser } = require('../../test-data/users');
const products = require('../../test-data/products');

// Import page objects
const LoginPage = require('../../pages/LoginPage');
const ProductsPage = require('../../pages/ProductsPage');

test.describe('Products Page', () => {

  // ── SETUP: Log in before each test ───────────────────────────
  // Every test in this file needs the user to be logged in first.
  // beforeEach runs before EACH test and logs in automatically.
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);
    await expect(page).toHaveURL('/inventory.html');
  });

  // ── TEST 1 ────────────────────────────────────────────────────
  // Check that the Products heading appears after login.
  // This confirms we landed on the correct page.
  test('should display products page title after login', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // The title element should show "Products"
    await productsPage.verifyPageLoaded();
  });

  // ── TEST 2 ────────────────────────────────────────────────────
  // Check that exactly 6 products are shown on the page.
  // SauceDemo always shows 6 products for a standard user.
  test('should display exactly 6 products on the page', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Count the number of product cards and compare with expected total
    const count = await productsPage.getProductCount();
    expect(count).toBe(products.totalCount);
  });

  // ── TEST 3 ────────────────────────────────────────────────────
  // Check that the product names on screen match our expected list.
  // The default sort is "Name A to Z" so we compare against that order.
  test('should display correct product names matching expected list', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Get all product names currently shown on the page
    const actualNames = await productsPage.getProductNames();

    // Compare with the expected names from our test data file
    expect(actualNames).toEqual(products.sortedNamesAtoZ);
  });

  // ── TEST 4 ────────────────────────────────────────────────────
  // Check that adding one product to cart shows badge "1".
  test('should add one product to cart and show badge count of 1', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Add the backpack to the cart
    await productsPage.addToCartByName(products.backpack.name);

    // The cart badge should now show "1"
    await expect(productsPage.cartBadge).toHaveText('1');
  });

  // ── TEST 5 ────────────────────────────────────────────────────
  // Check that adding two products shows badge "2".
  test('should add two products to cart and show badge count of 2', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Add two different products
    await productsPage.addToCartByName(products.backpack.name);
    await productsPage.addToCartByName(products.bikeLight.name);

    // The cart badge should now show "2"
    await expect(productsPage.cartBadge).toHaveText('2');
  });

  // ── TEST 6 ────────────────────────────────────────────────────
  // Check that removing a product from the products page removes it from cart.
  test('should remove a product from cart on the products page', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // First add the backpack
    await productsPage.addToCartByName(products.backpack.name);
    // Badge should show 1
    await expect(productsPage.cartBadge).toHaveText('1');

    // Now remove it
    await productsPage.removeFromCartByName(products.backpack.name);

    // The badge should disappear because the cart is now empty
    await expect(productsPage.cartBadge).not.toBeVisible();
  });

  // ── TEST 7 ────────────────────────────────────────────────────
  // Check that sorting by Name A to Z shows the correct order.
  test('should sort products by name A to Z correctly', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Select "Name (A to Z)" from the sort dropdown
    await productsPage.sortBy(products.sortOptions.nameAZ);

    // Get all product names after sorting
    const names = await productsPage.getProductNames();

    // Compare with expected A to Z order from our test data
    expect(names).toEqual(products.sortedNamesAtoZ);
  });

  // ── TEST 8 ────────────────────────────────────────────────────
  // Check that sorting by Name Z to A shows the correct order.
  test('should sort products by name Z to A correctly', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Select "Name (Z to A)" from the sort dropdown
    await productsPage.sortBy(products.sortOptions.nameZA);

    // Get all product names after sorting
    const names = await productsPage.getProductNames();

    // Compare with expected Z to A order from our test data
    expect(names).toEqual(products.sortedNamesZtoA);
  });

  // ── TEST 9 ────────────────────────────────────────────────────
  // Check that sorting by Price low to high shows correct order.
  test('should sort products by price low to high correctly', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Select "Price (low to high)" from the sort dropdown
    await productsPage.sortBy(products.sortOptions.priceLowHigh);

    // Get all prices after sorting
    const prices = await productsPage.getProductPrices();

    // Compare with expected price order from our test data
    expect(prices).toEqual(products.sortedPricesLowToHigh);
  });

  // ── TEST 10 ───────────────────────────────────────────────────
  // Check that sorting by Price high to low shows correct order.
  test('should sort products by price high to low correctly', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Select "Price (high to low)" from the sort dropdown
    await productsPage.sortBy(products.sortOptions.priceHighLow);

    // Get all prices after sorting
    const prices = await productsPage.getProductPrices();

    // Compare with expected price order from our test data
    expect(prices).toEqual(products.sortedPricesHighToLow);
  });

  // ── TEST 11 ───────────────────────────────────────────────────
  // Check that clicking a product name opens the product detail page.
  test('should open product detail page when clicking product name', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Click on the Sauce Labs Backpack name link
    await productsPage.clickProductByName(products.backpack.name);

    // The URL should change to a product detail page
    // SauceDemo uses hash-based routing so the URL contains "inventory-item.html"
    await expect(page).toHaveURL(/inventory-item\.html/);

    // The product name should be visible on the detail page
    await expect(page.getByTestId('inventory-item-name')).toHaveText(products.backpack.name);
  });

});
