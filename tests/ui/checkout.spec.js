const { test, expect } = require('../../fixtures/base.fixture');
const { validUser } = require('../../test-data/users');
const products = require('../../test-data/products');
const { validCustomer, errors } = require('../../test-data/checkout');

const LoginPage = require('../../pages/LoginPage');
const ProductsPage = require('../../pages/ProductsPage');
const CartPage = require('../../pages/CartPage');
const CheckoutPage = require('../../pages/CheckoutPage');
const ConfirmationPage = require('../../pages/ConfirmationPage');

test.describe('Checkout Flow', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);
    await expect(page).toHaveURL('/inventory.html');

    const productsPage = new ProductsPage(page);
    await productsPage.addToCartByName(products.backpack.name);
    await productsPage.goToCart();

    const cartPage = new CartPage(page);
    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL('/checkout-step-one.html');
  });

  test('should complete full order flow from checkout to confirmation message', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const confirmationPage = new ConfirmationPage(page);
    await checkoutPage.fillShippingDetails(validCustomer.firstName, validCustomer.lastName, validCustomer.postalCode);
    await checkoutPage.clickContinue();
    await expect(page).toHaveURL('/checkout-step-two.html');
    await checkoutPage.clickFinish();
    await confirmationPage.verifyOrderComplete();
  });

  test('should show error when first name is missing at checkout', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillShippingDetails('', validCustomer.lastName, validCustomer.postalCode);
    await checkoutPage.clickContinue();
    await checkoutPage.verifyErrorMessage(errors.firstNameRequired);
    await expect(page).toHaveURL('/checkout-step-one.html');
  });

  test('should show error when last name is missing at checkout', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillShippingDetails(validCustomer.firstName, '', validCustomer.postalCode);
    await checkoutPage.clickContinue();
    await checkoutPage.verifyErrorMessage(errors.lastNameRequired);
  });

  test('should show error when postal code is missing at checkout', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillShippingDetails(validCustomer.firstName, validCustomer.lastName, '');
    await checkoutPage.clickContinue();
    await checkoutPage.verifyErrorMessage(errors.postalCodeRequired);
  });

  test('should show correct item total on checkout overview page', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillShippingDetails(validCustomer.firstName, validCustomer.lastName, validCustomer.postalCode);
    await checkoutPage.clickContinue();
    await expect(page).toHaveURL('/checkout-step-two.html');
    const subtotal = await checkoutPage.getSubtotalText();
    expect(subtotal).toContain('$29.99');
  });

  test('should show tax amount on checkout overview page', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillShippingDetails(validCustomer.firstName, validCustomer.lastName, validCustomer.postalCode);
    await checkoutPage.clickContinue();
    await expect(page).toHaveURL('/checkout-step-two.html');
    const tax = await checkoutPage.getTaxText();
    expect(tax).toContain('Tax:');
  });

  test('should cancel checkout and return to cart page', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.clickCancel();
    await expect(page).toHaveURL('/cart.html');
  });

  test('should complete order and go back to products after clicking back home', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);
    const confirmationPage = new ConfirmationPage(page);
    await checkoutPage.fillShippingDetails(validCustomer.firstName, validCustomer.lastName, validCustomer.postalCode);
    await checkoutPage.clickContinue();
    await checkoutPage.clickFinish();
    await confirmationPage.verifyOrderComplete();
    await confirmationPage.clickBackHome();
    await expect(page).toHaveURL('/inventory.html');
  });

});
