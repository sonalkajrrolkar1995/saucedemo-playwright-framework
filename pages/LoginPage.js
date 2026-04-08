// ============================================================
// pages/LoginPage.js
// This file represents the Login Page of the SauceDemo website.
// The login page is the FIRST page you see when you visit the site.
// It has a username box, a password box, and a Login button.
//
// This is a "Page Object" - it is a JavaScript class that wraps
// all the elements and actions on ONE specific page. Test files
// import this class and call its methods instead of writing raw
// Playwright code. This keeps tests clean and readable.
// ============================================================

// We need the 'expect' function from Playwright to make assertions.
// An assertion is a check that says "I expect THIS to be TRUE".
const { expect } = require('@playwright/test');

// We define a class (a blueprint) for the Login Page.
// A class groups related data (locators) and behaviour (methods) together.
class LoginPage {

  // ── CONSTRUCTOR ──────────────────────────────────────────
  // The constructor runs once when you create a new LoginPage object.
  // It receives 'page' - the Playwright browser page object.
  // We store it as this.page so all methods in this class can use it.
  constructor(page) {
    // Store the Playwright page so every method below can use it
    this.page = page;

    // ── LOCATORS ─────────────────────────────────────────────
    // A locator is a way to find an element (button, input, text) on the page.
    // We define them ALL here in one place so if the site changes,
    // we only need to update this file - not every test.

    // The box where the user types their username
    // data-test="username" is the HTML attribute that identifies this element
    this.usernameInput = page.getByTestId('username');

    // The box where the user types their password
    // data-test="password" is the HTML attribute that identifies this element
    this.passwordInput = page.getByTestId('password');

    // The green "Login" button the user clicks to submit the form
    // data-test="login-button" is the HTML attribute that identifies this element
    this.loginButton = page.getByTestId('login-button');

    // The red error message box that appears when login fails.
    // For example: "Epic sadface: Username is required"
    // data-test="error" is the HTML attribute that identifies this element
    this.errorMessage = page.getByTestId('error');
  }

  // ── METHODS ───────────────────────────────────────────────
  // A method is a function that belongs to this class.
  // Each method performs one specific action on the login page.

  // Navigate to the login page
  // This opens the SauceDemo website in the browser.
  // We use '/' which means the base URL set in playwright.config.js
  async goto() {
    await this.page.goto('/');
  }

  // Log in with a given username and password.
  // This types the username, types the password, then clicks Login.
  // Parameters:
  //   username - the username string to type (e.g. 'standard_user')
  //   password - the password string to type (e.g. 'secret_sauce')
  async login(username, password) {
    // Type the username into the username input box
    await this.usernameInput.fill(username);

    // Type the password into the password input box
    await this.passwordInput.fill(password);

    // Click the Login button to submit the form
    await this.loginButton.click();
  }

  // Check that the error message box shows the expected text.
  // This is used to verify that an invalid login shows the right error.
  // Parameter:
  //   expectedMessage - the exact error text we expect to see on screen
  async verifyErrorMessage(expectedMessage) {
    // Wait for the error message to appear and check it has the right text
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedMessage);
  }

  // Check that we have successfully landed on the products page after login.
  // This verifies the URL changed from /  to /inventory.html
  async verifyLoginSuccess() {
    // After a successful login, the URL should change to /inventory.html
    await expect(this.page).toHaveURL('/inventory.html');
  }
}

// Export the class so other files can import and use it.
// In test files we do: const LoginPage = require('../pages/LoginPage');
module.exports = LoginPage;
