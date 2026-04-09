const { expect } = require('@playwright/test');

class ConfirmationPage {
  constructor(page) {
    this.page = page;
    this.confirmationHeader = page.getByTestId('complete-header');
    this.confirmationText = page.getByTestId('complete-text');
    this.backHomeButton = page.getByTestId('back-to-products');
    this.pageTitle = page.getByTestId('title');
  }

  async verifyOrderComplete() {
    await expect(this.confirmationHeader).toBeVisible();
    await expect(this.confirmationHeader).toHaveText('Thank you for your order!');
    await expect(this.confirmationText).toHaveText(
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
    );
  }

  async clickBackHome() {
    await this.backHomeButton.click();
    await expect(this.page).toHaveURL('/inventory.html');
  }
}

module.exports = ConfirmationPage;
