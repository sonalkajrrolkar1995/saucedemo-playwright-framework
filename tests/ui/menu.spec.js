const { test, expect } = require('../../fixtures/base.fixture');
const { validUser } = require('../../test-data/users');
const products = require('../../test-data/products');

const LoginPage = require('../../pages/LoginPage');
const ProductsPage = require('../../pages/ProductsPage');
const MenuPage = require('../../pages/MenuPage');

test.describe('Burger Menu', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);
    await expect(page).toHaveURL('/inventory.html');
  });

  test('should open burger menu successfully', async ({ page }) => {
    const menuPage = new MenuPage(page);
    await menuPage.openMenu();
    await expect(menuPage.allItemsLink).toBeVisible();
    await expect(menuPage.aboutLink).toBeVisible();
    await expect(menuPage.logoutLink).toBeVisible();
    await expect(menuPage.resetAppStateLink).toBeVisible();
  });

  test('should logout from the application using menu', async ({ page }) => {
    const menuPage = new MenuPage(page);
    await menuPage.logout();
    await expect(page).toHaveURL('/');
    await expect(page.getByTestId('login-button')).toBeVisible();
  });

  test('should navigate to all items from menu', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const menuPage = new MenuPage(page);
    await productsPage.clickProductByName(products.backpack.name);
    await expect(page).toHaveURL(/inventory-item\.html/);
    await menuPage.goToAllItems();
    await expect(page).toHaveURL('/inventory.html');
    await expect(page.getByTestId('title')).toHaveText('Products');
  });

  test('should reset app state and clear cart using menu', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const menuPage = new MenuPage(page);
    await productsPage.addToCartByName(products.backpack.name);
    await productsPage.addToCartByName(products.bikeLight.name);
    await expect(productsPage.cartBadge).toHaveText('2');
    await menuPage.resetAppState();
    await expect(productsPage.cartBadge).not.toBeVisible();
  });

});
