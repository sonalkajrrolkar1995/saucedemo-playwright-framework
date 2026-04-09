const { expect } = require('@playwright/test');

class MenuPage {
  constructor(page) {
    this.page = page;
    // The menu button has no data-test attribute, so we use aria-label
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.allItemsLink = page.getByTestId('inventory-sidebar-link');
    this.aboutLink = page.getByTestId('about-sidebar-link');
    this.logoutLink = page.getByTestId('logout-sidebar-link');
    this.resetAppStateLink = page.getByTestId('reset-sidebar-link');
    this.closeMenuButton = page.getByTestId('close-menu');
  }

  async openMenu() {
    await this.menuButton.click();
    await expect(this.allItemsLink).toBeVisible();
  }

  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
    await expect(this.page).toHaveURL('/');
  }

  async resetAppState() {
    await this.openMenu();
    await this.resetAppStateLink.click();
    // Close button sometimes disappears on its own after reset
    try {
      await this.closeMenuButton.click({ timeout: 5000 });
    } catch {
      // menu already closed, carry on
    }
  }

  async goToAllItems() {
    await this.openMenu();
    await this.allItemsLink.click();
    await expect(this.page).toHaveURL('/inventory.html');
  }
}

module.exports = MenuPage;
