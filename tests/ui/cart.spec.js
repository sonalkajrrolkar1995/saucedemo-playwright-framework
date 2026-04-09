const { test, expect } = require('../../fixtures/base.fixture');
const { validUser } = require('../../test-data/users');
const products = require('../../test-data/products');

const LoginPage = require('../../pages/LoginPage');
const ProductsPage = require('../../pages/ProductsPage');
const CartPage = require('../../pages/CartPage');

test.describe('Cart Page', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);
    await expect(page).toHaveURL('/inventory.html');
  });

  test('should show correct item in cart after adding from products page', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    await productsPage.addToCartByName(products.backpack.name);
    await productsPage.goToCart();
    await cartPage.verifyItemInCart(products.backpack.name);
  });

  test('should show two items in cart after adding two products', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    await productsPage.addToCartByName(products.backpack.name);
    await productsPage.addToCartByName(products.bikeLight.name);
    await productsPage.goToCart();
    await cartPage.verifyItemInCart(products.backpack.name);
    await cartPage.verifyItemInCart(products.bikeLight.name);
    const count = await cartPage.getCartItemCount();
    expect(count).toBe(2);
  });

  test('should remove one item from cart and verify it is gone', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    await productsPage.addToCartByName(products.backpack.name);
    await productsPage.goToCart();
    await cartPage.verifyItemInCart(products.backpack.name);
    await cartPage.removeItem(products.backpack.name);
    await cartPage.verifyItemNotInCart(products.backpack.name);
    const count = await cartPage.getCartItemCount();
    expect(count).toBe(0);
  });

  test('should show empty cart when no items have been added', async ({ page }) => {
    await page.goto('/cart.html');
    const cartPage = new CartPage(page);
    await cartPage.verifyPageLoaded();
    const count = await cartPage.getCartItemCount();
    expect(count).toBe(0);
  });

  test('should show correct price for backpack in cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    await productsPage.addToCartByName(products.backpack.name);
    await productsPage.goToCart();
    const backpackRow = page
      .getByTestId('inventory-item')
      .filter({ hasText: products.backpack.name });
    await expect(backpackRow.getByTestId('inventory-item-price')).toHaveText(products.backpack.price);
  });

  test('should go back to products page when clicking continue shopping', async ({ page }) => {
    await page.goto('/cart.html');
    const cartPage = new CartPage(page);
    await cartPage.continueShopping();
    await expect(page).toHaveURL('/inventory.html');
  });

  test('should proceed to checkout page when clicking checkout button', async ({ page }) => {
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    await productsPage.addToCartByName(products.backpack.name);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL('/checkout-step-one.html');
  });

});
