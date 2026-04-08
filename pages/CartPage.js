// ============================================================
// pages/CartPage.js
// This file represents the Shopping Cart Page.
// You get to this page by clicking the cart icon (top right).
// URL: https://www.saucedemo.com/cart.html
//
// The cart page lists all items you have added, showing their
// names and prices. You can remove items here, go back to
// continue shopping, or proceed to checkout.
// ============================================================

const { expect } = require('@playwright/test');

class CartPage {

  constructor(page) {
    // Store the Playwright page so all methods below can use it
    this.page = page;

    // ── LOCATORS ─────────────────────────────────────────────

    // The "Your Cart" heading at the top of the page
    this.pageTitle = page.getByTestId('title');

    // The container holding all the items in the cart
    this.cartList = page.getByTestId('cart-list');

    // ALL the individual item rows in the cart
    // Each item row contains the quantity, name, description, price, and Remove button
    this.cartItems = page.getByTestId('inventory-item');

    // The names of all items currently in the cart
    this.itemNames = page.getByTestId('inventory-item-name');

    // The prices of all items currently in the cart
    this.itemPrices = page.getByTestId('inventory-item-price');

    // The "Continue Shopping" button - takes you back to the products page
    this.continueShoppingButton = page.getByTestId('continue-shopping');

    // The "Checkout" button - takes you to the checkout information form
    this.checkoutButton = page.getByTestId('checkout');
  }

  // Check that the cart page is fully loaded and showing the correct title.
  async verifyPageLoaded() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText('Your Cart');
  }

  // Click the Remove button for a specific item in the cart.
  // This removes that item from the cart completely.
  // Parameter:
  //   productName - the full product name, e.g. 'Sauce Labs Backpack'
  async removeItem(productName) {
    // Find the item row that contains this product name
    const itemRow = this.page
      .getByTestId('inventory-item')
      .filter({ hasText: productName });

    // Click the Remove button inside that specific row
    await itemRow.getByRole('button', { name: 'Remove' }).click();
  }

  // Check that a specific item IS visible in the cart.
  // This confirms the item was added correctly.
  // Parameter:
  //   productName - the full product name to look for
  async verifyItemInCart(productName) {
    // Find the item by its name and confirm it is visible on screen
    await expect(
      this.itemNames.filter({ hasText: productName })
    ).toBeVisible();
  }

  // Check that a specific item is NOT in the cart.
  // This confirms an item was successfully removed.
  // Parameter:
  //   productName - the full product name that should NOT be there
  async verifyItemNotInCart(productName) {
    // The item should not be visible on screen
    await expect(
      this.itemNames.filter({ hasText: productName })
    ).not.toBeVisible();
  }

  // Count how many items are currently in the cart.
  // Returns a number like 0, 1, or 2.
  async getCartItemCount() {
    return await this.cartItems.count();
  }

  // Click "Continue Shopping" to go back to the products page.
  async continueShopping() {
    await this.continueShoppingButton.click();
    // Confirm we went back to the products/inventory page
    await expect(this.page).toHaveURL('/inventory.html');
  }

  // Click "Checkout" to proceed to the checkout information form.
  async proceedToCheckout() {
    await this.checkoutButton.click();
    // Confirm we moved to the first checkout step
    await expect(this.page).toHaveURL('/checkout-step-one.html');
  }
}

module.exports = CartPage;
