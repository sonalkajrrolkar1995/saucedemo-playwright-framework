const { expect } = require('@playwright/test');

class CheckoutPage {
  constructor(page) {
    this.page = page;

    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue'); // INPUT type=submit
    this.cancelButton = page.getByTestId('cancel');
    this.errorMessage = page.getByTestId('error');

    this.subtotalLabel = page.getByTestId('subtotal-label');
    this.taxLabel = page.getByTestId('tax-label');
    this.totalLabel = page.getByTestId('total-label');
    this.finishButton = page.getByTestId('finish');
    this.pageTitle = page.getByTestId('title');
  }

  async fillShippingDetails(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }

  async verifyErrorMessage(expectedMessage) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedMessage);
  }

  async verifyOverviewLoaded() {
    await expect(this.pageTitle).toHaveText('Checkout: Overview');
  }

  async getSubtotalText() {
    return await this.subtotalLabel.textContent();
  }

  async getTaxText() {
    return await this.taxLabel.textContent();
  }

  async getTotalText() {
    return await this.totalLabel.textContent();
  }

  async clickFinish() {
    await this.finishButton.click();
    await expect(this.page).toHaveURL('/checkout-complete.html');
  }
}

module.exports = CheckoutPage;
