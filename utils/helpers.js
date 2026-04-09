const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CheckoutPage = require('../pages/CheckoutPage');
const ConfirmationPage = require('../pages/ConfirmationPage');
const MenuPage = require('../pages/MenuPage');

async function loginAndGoToProducts(page, username, password) {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(username, password);
  const { expect } = require('@playwright/test');
  await expect(page).toHaveURL('/inventory.html');
  return new ProductsPage(page);
}

async function addItemToCart(page, productName) {
  const productsPage = new ProductsPage(page);
  await productsPage.addToCartByName(productName);
}

async function completeCheckout(page, customer) {
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.fillShippingDetails(
    customer.firstName,
    customer.lastName,
    customer.postalCode
  );
  await checkoutPage.clickContinue();
  await checkoutPage.clickFinish();
  return new ConfirmationPage(page);
}

async function clearCart(page) {
  const menuPage = new MenuPage(page);
  await menuPage.resetAppState();
}

module.exports = {
  loginAndGoToProducts,
  addItemToCart,
  completeCheckout,
  clearCart,
};
