// ============================================================
// tests/ui/menu.spec.js
// This file tests the Burger Menu (hamburger menu).
// The burger menu is the three-line icon (≡) at the top left.
// It is available on every page after login.
//
// What does this cover?
//   - Opening the burger menu shows the menu links
//   - Clicking Logout returns to the login page
//   - Clicking "All Items" goes to the products page
//   - Clicking "Reset App State" clears the cart
// ============================================================

const { test, expect } = require('../../fixtures/base.fixture');
const { validUser } = require('../../test-data/users');
const products = require('../../test-data/products');

const LoginPage = require('../../pages/LoginPage');
const ProductsPage = require('../../pages/ProductsPage');
const MenuPage = require('../../pages/MenuPage');

test.describe('Burger Menu', () => {

  // ── SETUP: Log in before each test ───────────────────────────
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);
    await expect(page).toHaveURL('/inventory.html');
  });

  // ── TEST 1 ────────────────────────────────────────────────────
  // Open the menu and check that the links are visible.
  test('should open burger menu successfully', async ({ page }) => {
    const menuPage = new MenuPage(page);

    // Open the menu by clicking the hamburger button
    await menuPage.openMenu();

    // All four menu links should be visible after opening
    await expect(menuPage.allItemsLink).toBeVisible();
    await expect(menuPage.aboutLink).toBeVisible();
    await expect(menuPage.logoutLink).toBeVisible();
    await expect(menuPage.resetAppStateLink).toBeVisible();
  });

  // ── TEST 2 ────────────────────────────────────────────────────
  // Click Logout from the menu and verify we land on the login page.
  test('should logout from the application using menu', async ({ page }) => {
    const menuPage = new MenuPage(page);

    // Open the menu and click Logout
    await menuPage.logout();

    // We should be back on the login page
    await expect(page).toHaveURL('/');

    // The Login button should be visible
    await expect(page.getByTestId('login-button')).toBeVisible();
  });

  // ── TEST 3 ────────────────────────────────────────────────────
  // Navigate to All Items from the menu.
  // This is useful when you are on a product detail page and want to go back.
  test('should navigate to all items from menu', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const menuPage = new MenuPage(page);

    // First navigate away from the products page to a product detail page
    await productsPage.clickProductByName(products.backpack.name);
    await expect(page).toHaveURL(/inventory-item\.html/);

    // Now use the menu to go back to All Items
    await menuPage.goToAllItems();

    // We should be back on the products page
    await expect(page).toHaveURL('/inventory.html');
    await expect(page.getByTestId('title')).toHaveText('Products');
  });

  // ── TEST 4 ────────────────────────────────────────────────────
  // Add items to cart, then use "Reset App State" to clear it.
  test('should reset app state and clear cart using menu', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const menuPage = new MenuPage(page);

    // Add two items to the cart
    await productsPage.addToCartByName(products.backpack.name);
    await productsPage.addToCartByName(products.bikeLight.name);

    // The cart badge should show "2"
    await expect(productsPage.cartBadge).toHaveText('2');

    // Use the menu to reset the app state
    await menuPage.resetAppState();

    // After reset, the cart badge should be gone (cart is empty)
    await expect(productsPage.cartBadge).not.toBeVisible();
  });

});
