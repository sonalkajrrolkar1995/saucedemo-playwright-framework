// ============================================================
// pages/ProductsPage.js
// This file represents the Products Page (also called Inventory Page).
// You see this page right after you log in successfully.
// It shows a grid of 6 products with names, prices, images,
// and "Add to cart" buttons. There is also a sort dropdown
// and a shopping cart icon at the top right.
// ============================================================

const { expect } = require('@playwright/test');

class ProductsPage {

  constructor(page) {
    // Store the Playwright page so all methods below can use it
    this.page = page;

    // ── LOCATORS ─────────────────────────────────────────────

    // The "Products" heading at the top left of the page
    // data-test="title" is the HTML attribute that identifies this element
    this.pageTitle = page.getByTestId('title');

    // The container that holds ALL product cards on the page
    this.inventoryList = page.getByTestId('inventory-list');

    // ALL the individual product cards (there are 6 on the page)
    // This gives us a list of all items, not just one
    this.productItems = page.getByTestId('inventory-item');

    // The dropdown at the top right that lets you sort products
    // Options: Name A-Z, Name Z-A, Price low-high, Price high-low
    this.sortDropdown = page.getByTestId('product-sort-container');

    // The shopping cart icon at the top right of the page
    // Click it to go to the cart page
    this.cartLink = page.getByTestId('shopping-cart-link');

    // The red number badge on the cart icon showing how many items are in the cart
    // For example: "1" when one item is added, "2" when two items are added
    this.cartBadge = page.getByTestId('shopping-cart-badge');

    // The hamburger menu button (three lines) at the top left
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
  }

  // Navigate directly to the inventory/products page.
  // Usually you log in first instead of going directly here.
  async goto() {
    await this.page.goto('/inventory.html');
  }

  // Check that the Products page title is visible.
  // This confirms we are on the right page after logging in.
  async verifyPageLoaded() {
    // Wait for the "Products" heading to appear on screen
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText('Products');
  }

  // Add a product to the cart by finding it by its exact name.
  // Parameter:
  //   productName - the full name of the product, e.g. 'Sauce Labs Backpack'
  async addToCartByName(productName) {
    // Find the product card that contains this product name
    const productCard = this.page
      .getByTestId('inventory-item')
      .filter({ hasText: productName });

    // Inside that card, find and click the "Add to cart" button
    await productCard.getByRole('button', { name: 'Add to cart' }).click();
  }

  // Remove a product from the cart by finding it by its exact name.
  // This works on the products page where "Remove" buttons appear
  // after you have already added the item to the cart.
  // Parameter:
  //   productName - the full name of the product to remove
  async removeFromCartByName(productName) {
    // Find the product card that contains this product name
    const productCard = this.page
      .getByTestId('inventory-item')
      .filter({ hasText: productName });

    // Inside that card, find and click the "Remove" button
    await productCard.getByRole('button', { name: 'Remove' }).click();
  }

  // Select a sort option from the dropdown at the top right.
  // Parameter:
  //   value - the dropdown value to select (e.g. 'az', 'za', 'lohi', 'hilo')
  async sortBy(value) {
    // Click the dropdown and select the option with the given value
    await this.sortDropdown.selectOption(value);
  }

  // Count how many products are currently shown on the page.
  // Should always return 6 for a standard user on SauceDemo.
  async getProductCount() {
    // Count all the inventory-item elements on the page and return the number
    return await this.productItems.count();
  }

  // Click the cart icon to go to the shopping cart page.
  async goToCart() {
    await this.cartLink.click();
    // Wait for the URL to change to the cart page
    await expect(this.page).toHaveURL('/cart.html');
  }

  // Get all product names currently displayed on the page.
  // Returns an array of strings like ['Sauce Labs Backpack', 'Sauce Labs Bike Light', ...]
  async getProductNames() {
    // Find all elements with data-test="inventory-item-name"
    const nameElements = this.page.getByTestId('inventory-item-name');
    // Get the count so we can loop through them
    const count = await nameElements.count();
    const names = [];
    // Loop through each name element and collect its text
    for (let i = 0; i < count; i++) {
      names.push(await nameElements.nth(i).textContent());
    }
    return names;
  }

  // Get all product prices currently displayed on the page.
  // Returns an array of numbers like [29.99, 9.99, 15.99, ...]
  async getProductPrices() {
    // Find all elements with data-test="inventory-item-price"
    const priceElements = this.page.getByTestId('inventory-item-price');
    const count = await priceElements.count();
    const prices = [];
    // Loop through each price element, strip the "$" sign, and parse as a number
    for (let i = 0; i < count; i++) {
      const priceText = await priceElements.nth(i).textContent();
      // Remove the "$" symbol and convert the string to a decimal number
      prices.push(parseFloat(priceText.replace('$', '')));
    }
    return prices;
  }

  // Click on a product's name link to go to its detail page.
  // Parameter:
  //   productName - the exact name of the product to click
  async clickProductByName(productName) {
    // Find the link that contains the product name and click it
    await this.page.getByTestId('inventory-item-name').filter({ hasText: productName }).click();
  }
}

module.exports = ProductsPage;
