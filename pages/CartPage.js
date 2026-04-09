const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.getByTestId('title');
    this.cartList = page.getByTestId('cart-list');
    this.cartItems = page.getByTestId('inventory-item');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.itemPrices = page.getByTestId('inventory-item-price');
    this.continueShoppingButton = page.getByTestId('continue-shopping');
    this.checkoutButton = page.getByTestId('checkout');
  }

  async verifyPageLoaded() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText('Your Cart');
  }

  async removeItem(productName) {
    const itemRow = this.page
      .getByTestId('inventory-item')
      .filter({ hasText: productName });
    await itemRow.getByRole('button', { name: 'Remove' }).click();
  }

  async verifyItemInCart(productName) {
    await expect(this.itemNames.filter({ hasText: productName })).toBeVisible();
  }

  async verifyItemNotInCart(productName) {
    await expect(this.itemNames.filter({ hasText: productName })).not.toBeVisible();
  }

  async getCartItemCount() {
    return await this.cartItems.count();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
    await expect(this.page).toHaveURL('/inventory.html');
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
    await expect(this.page).toHaveURL('/checkout-step-one.html');
  }
}

module.exports = CartPage;
