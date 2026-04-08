// ============================================================
// pages/ConfirmationPage.js
// This file represents the Order Confirmation Page.
// URL: https://www.saucedemo.com/checkout-complete.html
//
// You see this page AFTER clicking "Finish" in the checkout overview.
// It shows a big green checkmark, a "Thank you for your order!" heading,
// a message saying your order has been dispatched, and a "Back Home" button
// that takes you back to the products page.
//
// The cart badge disappears on this page because the cart is now empty.
// ============================================================

const { expect } = require('@playwright/test');

class ConfirmationPage {

  constructor(page) {
    // Store the Playwright page so all methods below can use it
    this.page = page;

    // ── LOCATORS ─────────────────────────────────────────────

    // The big "Thank you for your order!" heading in the middle of the page
    // data-test="complete-header" is the HTML attribute for this element
    this.confirmationHeader = page.getByTestId('complete-header');

    // The smaller text below the heading that says the order is on its way
    // Exact text: "Your order has been dispatched, and will arrive just as
    //              fast as the pony can get there!"
    this.confirmationText = page.getByTestId('complete-text');

    // The "Back Home" button at the bottom of the page
    // Clicking it takes you back to the products/inventory page
    this.backHomeButton = page.getByTestId('back-to-products');

    // The page title showing "Checkout: Complete!"
    this.pageTitle = page.getByTestId('title');
  }

  // Check that the order confirmation page is fully loaded and shows
  // the correct "Thank you for your order!" heading.
  async verifyOrderComplete() {
    // Wait for the confirmation heading to appear
    await expect(this.confirmationHeader).toBeVisible();
    // Verify the exact text of the heading
    await expect(this.confirmationHeader).toHaveText('Thank you for your order!');
    // Verify the message below the heading
    await expect(this.confirmationText).toHaveText(
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
    );
  }

  // Click the "Back Home" button to return to the products page.
  async clickBackHome() {
    await this.backHomeButton.click();
    // Confirm we returned to the inventory/products page
    await expect(this.page).toHaveURL('/inventory.html');
  }
}

module.exports = ConfirmationPage;
