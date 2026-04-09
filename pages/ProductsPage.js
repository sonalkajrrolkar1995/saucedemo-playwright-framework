const { expect } = require('@playwright/test');

class ProductsPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.getByTestId('title');
    this.inventoryList = page.getByTestId('inventory-list');
    this.productItems = page.getByTestId('inventory-item');
    this.sortDropdown = page.getByTestId('product-sort-container');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  async verifyPageLoaded() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText('Products');
  }

  async addToCartByName(productName) {
    const productCard = this.page
      .getByTestId('inventory-item')
      .filter({ hasText: productName });
    await productCard.getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeFromCartByName(productName) {
    const productCard = this.page
      .getByTestId('inventory-item')
      .filter({ hasText: productName });
    await productCard.getByRole('button', { name: 'Remove' }).click();
  }

  async sortBy(value) {
    await this.sortDropdown.selectOption(value);
  }

  async getProductCount() {
    return await this.productItems.count();
  }

  async goToCart() {
    await this.cartLink.click();
    await expect(this.page).toHaveURL('/cart.html');
  }

  async getProductNames() {
    const nameElements = this.page.getByTestId('inventory-item-name');
    const count = await nameElements.count();
    const names = [];
    for (let i = 0; i < count; i++) {
      names.push(await nameElements.nth(i).textContent());
    }
    return names;
  }

  async getProductPrices() {
    const priceElements = this.page.getByTestId('inventory-item-price');
    const count = await priceElements.count();
    const prices = [];
    for (let i = 0; i < count; i++) {
      const priceText = await priceElements.nth(i).textContent();
      prices.push(parseFloat(priceText.replace('$', '')));
    }
    return prices;
  }

  async clickProductByName(productName) {
    await this.page
      .getByTestId('inventory-item-name')
      .filter({ hasText: productName })
      .click();
  }
}

module.exports = ProductsPage;
