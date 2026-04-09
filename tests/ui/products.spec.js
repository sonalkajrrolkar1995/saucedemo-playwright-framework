const { test, expect } = require('../../fixtures/base.fixture');
const { validUser } = require('../../test-data/users');
const products = require('../../test-data/products');

const LoginPage = require('../../pages/LoginPage');
const ProductsPage = require('../../pages/ProductsPage');

test.describe('Products Page', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);
    await expect(page).toHaveURL('/inventory.html');
  });

  test('should display products page title after login', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.verifyPageLoaded();
  });

  test('should display exactly 6 products on the page', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const count = await productsPage.getProductCount();
    expect(count).toBe(products.totalCount);
  });

  test('should display correct product names matching expected list', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const actualNames = await productsPage.getProductNames();
    expect(actualNames).toEqual(products.sortedNamesAtoZ);
  });

  test('should add one product to cart and show badge count of 1', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.addToCartByName(products.backpack.name);
    await expect(productsPage.cartBadge).toHaveText('1');
  });

  test('should add two products to cart and show badge count of 2', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.addToCartByName(products.backpack.name);
    await productsPage.addToCartByName(products.bikeLight.name);
    await expect(productsPage.cartBadge).toHaveText('2');
  });

  test('should remove a product from cart on the products page', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.addToCartByName(products.backpack.name);
    await expect(productsPage.cartBadge).toHaveText('1');
    await productsPage.removeFromCartByName(products.backpack.name);
    await expect(productsPage.cartBadge).not.toBeVisible();
  });

  test('should sort products by name A to Z correctly', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.sortBy(products.sortOptions.nameAZ);
    const names = await productsPage.getProductNames();
    expect(names).toEqual(products.sortedNamesAtoZ);
  });

  test('should sort products by name Z to A correctly', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.sortBy(products.sortOptions.nameZA);
    const names = await productsPage.getProductNames();
    expect(names).toEqual(products.sortedNamesZtoA);
  });

  test('should sort products by price low to high correctly', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.sortBy(products.sortOptions.priceLowHigh);
    const prices = await productsPage.getProductPrices();
    expect(prices).toEqual(products.sortedPricesLowToHigh);
  });

  test('should sort products by price high to low correctly', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.sortBy(products.sortOptions.priceHighLow);
    const prices = await productsPage.getProductPrices();
    expect(prices).toEqual(products.sortedPricesHighToLow);
  });

  test('should open product detail page when clicking product name', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.clickProductByName(products.backpack.name);
    await expect(page).toHaveURL(/inventory-item\.html/);
    await expect(page.getByTestId('inventory-item-name')).toHaveText(products.backpack.name);
  });

});
