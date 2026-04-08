// ============================================================
// pages/MenuPage.js
// This file represents the Burger Menu (hamburger menu).
// The burger menu is accessible from EVERY page after login.
// It appears as three horizontal lines (≡) at the top left corner.
// Clicking it opens a sidebar with these links:
//   - All Items    → goes to the products page
//   - About        → goes to the Sauce Labs website
//   - Logout       → logs out and returns to login page
//   - Reset App State → clears the cart and resets the page
//
// The menu closes when you click the X button or navigate away.
// ============================================================

const { expect } = require('@playwright/test');

class MenuPage {

  constructor(page) {
    // Store the Playwright page so all methods below can use it
    this.page = page;

    // ── LOCATORS ─────────────────────────────────────────────

    // The hamburger menu button (three lines ≡) at the top left.
    // Click this to OPEN the menu sidebar.
    // The button has aria-label "Open Menu" for accessibility.
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });

    // The "All Items" link inside the open menu.
    // Clicking it goes back to the products/inventory page.
    // data-test="inventory-sidebar-link"
    this.allItemsLink = page.getByTestId('inventory-sidebar-link');

    // The "About" link inside the open menu.
    // Clicking it opens the Sauce Labs company website.
    // data-test="about-sidebar-link"
    this.aboutLink = page.getByTestId('about-sidebar-link');

    // The "Logout" link inside the open menu.
    // Clicking it logs out the user and returns to the login page.
    // data-test="logout-sidebar-link"
    this.logoutLink = page.getByTestId('logout-sidebar-link');

    // The "Reset App State" link inside the open menu.
    // Clicking it empties the cart and resets all "Add to cart" buttons.
    // data-test="reset-sidebar-link"
    this.resetAppStateLink = page.getByTestId('reset-sidebar-link');

    // The X button to CLOSE the menu without navigating anywhere.
    // data-test="close-menu"
    this.closeMenuButton = page.getByTestId('close-menu');
  }

  // Click the hamburger menu button to open the sidebar menu.
  // After calling this, the menu links (allItemsLink, logoutLink, etc.)
  // will be visible and clickable.
  async openMenu() {
    await this.menuButton.click();
    // Wait for the All Items link to appear - this confirms the menu is open
    await expect(this.allItemsLink).toBeVisible();
  }

  // Log out of the application.
  // This opens the menu and clicks Logout.
  // After this, you are taken back to the login page.
  async logout() {
    // First open the menu so the Logout link is visible
    await this.openMenu();
    // Then click the Logout link
    await this.logoutLink.click();
    // Confirm we are back on the login page (the root URL)
    await expect(this.page).toHaveURL('/');
  }

  // Reset the application state to clear the cart.
  // This opens the menu and clicks "Reset App State".
  // After this, the cart is empty and all products show "Add to cart" again.
  async resetAppState() {
    // First open the menu
    await this.openMenu();
    // Click the Reset App State link.
    // After clicking this, the cart is emptied but the menu stays open.
    await this.resetAppStateLink.click();
    // Close the menu by clicking the X button.
    // We use a short timeout because sometimes the menu closes automatically.
    // If the close button is not clickable in 5 seconds we just continue -
    // the menu will close on its own when the next navigation happens.
    try {
      await this.closeMenuButton.click({ timeout: 5000 });
    } catch {
      // Menu may have closed already - that is fine, carry on
    }
  }

  // Navigate to the All Items (products) page using the menu.
  // This opens the menu and clicks "All Items".
  async goToAllItems() {
    // First open the menu
    await this.openMenu();
    // Click the All Items link
    await this.allItemsLink.click();
    // Confirm we are on the products/inventory page
    await expect(this.page).toHaveURL('/inventory.html');
  }
}

module.exports = MenuPage;
