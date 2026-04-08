// ============================================================
// pages/CheckoutPage.js
// This file handles TWO checkout pages:
//
// Step 1 - Checkout Information (checkout-step-one.html):
//   You fill in your First Name, Last Name, and Postal Code here.
//   Click Continue to move to the order summary.
//   Click Cancel to go back to the cart.
//
// Step 2 - Checkout Overview (checkout-step-two.html):
//   You review your items, see the item total, tax, and grand total.
//   Click Finish to complete the order.
//   Click Cancel to go back to the products page.
//
// Both steps live in this one class because they are part of
// the same checkout flow and share the same cancel behaviour.
// ============================================================

const { expect } = require('@playwright/test');

class CheckoutPage {

  constructor(page) {
    // Store the Playwright page so all methods below can use it
    this.page = page;

    // ── STEP 1 LOCATORS (checkout-step-one.html) ─────────────

    // The "First Name" input box in the checkout form
    // data-test="firstName" is the HTML attribute for this field
    this.firstNameInput = page.getByTestId('firstName');

    // The "Last Name" input box in the checkout form
    this.lastNameInput = page.getByTestId('lastName');

    // The "Zip/Postal Code" input box in the checkout form
    this.postalCodeInput = page.getByTestId('postalCode');

    // The "Continue" button (this is an INPUT type=submit, not a regular button)
    // It submits the form and moves to the Order Overview page
    this.continueButton = page.getByTestId('continue');

    // The "Cancel" button on step 1 - returns to the cart page
    this.cancelButton = page.getByTestId('cancel');

    // The red error message box shown when a required field is empty
    // Example text: "Error: First Name is required"
    this.errorMessage = page.getByTestId('error');

    // ── STEP 2 LOCATORS (checkout-step-two.html) ─────────────

    // The line showing the sum of all item prices before tax
    // Example: "Item total: $39.98"
    this.subtotalLabel = page.getByTestId('subtotal-label');

    // The line showing the calculated tax amount
    // Example: "Tax: $3.20"
    this.taxLabel = page.getByTestId('tax-label');

    // The line showing the grand total including tax
    // Example: "Total: $43.18"
    this.totalLabel = page.getByTestId('total-label');

    // The "Finish" button that completes the order and goes to the confirmation page
    this.finishButton = page.getByTestId('finish');

    // The page title element (shows "Checkout: Your Information" or "Checkout: Overview")
    this.pageTitle = page.getByTestId('title');
  }

  // ── STEP 1 METHODS ────────────────────────────────────────

  // Fill in all three fields on the checkout information form.
  // Parameters:
  //   firstName  - the customer's first name, e.g. 'John'
  //   lastName   - the customer's last name, e.g. 'Doe'
  //   postalCode - the customer's postal/zip code, e.g. '12345'
  async fillShippingDetails(firstName, lastName, postalCode) {
    // Type the first name into the First Name input box
    await this.firstNameInput.fill(firstName);

    // Type the last name into the Last Name input box
    await this.lastNameInput.fill(lastName);

    // Type the postal code into the Zip/Postal Code input box
    await this.postalCodeInput.fill(postalCode);
  }

  // Click the Continue button to submit the checkout form.
  // If all fields are filled, this moves to checkout step 2 (overview).
  // If a field is missing, an error message appears instead.
  async clickContinue() {
    await this.continueButton.click();
  }

  // Click the Cancel button to go back to the cart page.
  async clickCancel() {
    await this.cancelButton.click();
  }

  // Check that the error message shows the expected text.
  // Used to verify that missing fields produce the correct error.
  // Parameter:
  //   expectedMessage - the exact error text to check for
  async verifyErrorMessage(expectedMessage) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedMessage);
  }

  // ── STEP 2 METHODS ────────────────────────────────────────

  // Check that the overview page title is visible.
  async verifyOverviewLoaded() {
    await expect(this.pageTitle).toHaveText('Checkout: Overview');
  }

  // Read and return the item total text from the overview page.
  // Returns the full string like "Item total: $39.98"
  async getSubtotalText() {
    return await this.subtotalLabel.textContent();
  }

  // Read and return the tax text from the overview page.
  // Returns the full string like "Tax: $3.20"
  async getTaxText() {
    return await this.taxLabel.textContent();
  }

  // Read and return the order total text from the overview page.
  // Returns the full string like "Total: $43.18"
  async getTotalText() {
    return await this.totalLabel.textContent();
  }

  // Click the Finish button to complete the order.
  // This takes you to the order confirmation page.
  async clickFinish() {
    await this.finishButton.click();
    // Confirm we reached the confirmation page
    await expect(this.page).toHaveURL('/checkout-complete.html');
  }
}

module.exports = CheckoutPage;
