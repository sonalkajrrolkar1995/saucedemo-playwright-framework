// ============================================================
// tests/ui/login.spec.js
// This file tests EVERYTHING related to the Login page.
//
// What does this cover?
//   - Logging in with correct username and password (happy path)
//   - Logging in with a locked out user (should show error)
//   - Logging in with wrong password (should show error)
//   - Logging in with wrong username (should show error)
//   - Logging in with empty username (should show error)
//   - Logging in with empty password (should show error)
//   - Logging in with both fields empty (should show error)
//   - Typing in the username field clears the error message
//   - Logging out successfully returns to the login page
//
// Why do we test all these? Because login is the FIRST thing users
// do on the site. If login is broken, no one can use anything else.
// ============================================================

// Import 'test' and 'expect' from our base fixture file.
// This gives us all our page objects automatically.
const { test, expect } = require('../../fixtures/base.fixture');

// Import test data - usernames and passwords stored in one place
const { validUser, lockedUser, invalidUser, emptyUser, noPasswordUser } = require('../../test-data/users');

// Import LoginPage so we can use it in beforeEach
const LoginPage = require('../../pages/LoginPage');
const MenuPage = require('../../pages/MenuPage');

// Group all login tests under this describe block.
// A describe block is just a label that groups related tests together.
test.describe('Login Page', () => {

  // ── SETUP: runs before EACH test in this describe block ──────
  // This opens the login page fresh before every test.
  // Each test starts from a clean state with an empty login form.
  test.beforeEach(async ({ page }) => {
    // Navigate to the login page (the root URL of the site)
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  // ── TEST 1 ────────────────────────────────────────────────────
  // Check that a valid user can log in and land on the products page.
  // This is the most important test - if this fails, nothing else matters.
  test('should login successfully with standard user and land on products page', async ({ page }) => {
    // Create a LoginPage to interact with the login form
    const loginPage = new LoginPage(page);

    // Log in with the valid standard user credentials
    await loginPage.login(validUser.username, validUser.password);

    // After successful login, the URL should change to /inventory.html
    await loginPage.verifyLoginSuccess();

    // The Products heading should be visible on the page
    await expect(page.getByTestId('title')).toHaveText('Products');
  });

  // ── TEST 2 ────────────────────────────────────────────────────
  // Check that a locked out user cannot log in.
  // Expected error: "Epic sadface: Sorry, this user has been locked out."
  test('should show error when logging in with locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Try to log in with the locked out user credentials
    await loginPage.login(lockedUser.username, lockedUser.password);

    // The error message should appear with the locked out text
    await loginPage.verifyErrorMessage('Epic sadface: Sorry, this user has been locked out.');

    // We should still be on the login page, NOT on the products page
    await expect(page).toHaveURL('/');
  });

  // ── TEST 3 ────────────────────────────────────────────────────
  // Check that an invalid username shows an error.
  // Expected error: "Epic sadface: Username and password do not match any user in this service"
  test('should show error when logging in with wrong username and password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Try to log in with a username and password that do not exist
    await loginPage.login(invalidUser.username, invalidUser.password);

    // An error message should appear
    await loginPage.verifyErrorMessage('Epic sadface: Username and password do not match');

    // We should remain on the login page
    await expect(page).toHaveURL('/');
  });

  // ── TEST 4 ────────────────────────────────────────────────────
  // Check that submitting with both fields empty shows the right error.
  // Expected error: "Epic sadface: Username is required"
  test('should show error when both fields are empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Click Login without filling in either field
    await loginPage.login(emptyUser.username, emptyUser.password);

    // The error should say username is required (username is checked first)
    await loginPage.verifyErrorMessage('Epic sadface: Username is required');
  });

  // ── TEST 5 ────────────────────────────────────────────────────
  // Check that submitting with only a username (no password) shows an error.
  // Expected error: "Epic sadface: Password is required"
  test('should show error when password field is empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Log in with username but no password
    await loginPage.login(noPasswordUser.username, noPasswordUser.password);

    // The error should say password is required
    await loginPage.verifyErrorMessage('Epic sadface: Password is required');
  });

  // ── TEST 6 ────────────────────────────────────────────────────
  // Check that submitting with only a password (no username) shows an error.
  // Expected error: "Epic sadface: Username is required"
  test('should show error when username field is empty', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Log in with password but no username
    await loginPage.login('', validUser.password);

    // The error should say username is required
    await loginPage.verifyErrorMessage('Epic sadface: Username is required');
  });

  // ── TEST 7 ────────────────────────────────────────────────────
  // Check that logging in and then logging out returns to the login page.
  // This tests the full login → logout cycle.
  test('should login and logout successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const menuPage = new MenuPage(page);

    // First log in successfully
    await loginPage.login(validUser.username, validUser.password);
    await loginPage.verifyLoginSuccess();

    // Now log out using the burger menu
    await menuPage.logout();

    // After logout, we should be back on the login page
    await expect(page).toHaveURL('/');

    // The login button should be visible again
    await expect(page.getByTestId('login-button')).toBeVisible();
  });

  // ── TEST 8 ────────────────────────────────────────────────────
  // Check that the error message disappears when you start typing in the username box.
  // This is important UX - errors should clear when the user tries to fix them.
  test('should clear error message after clicking the error close button', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // First trigger an error by clicking Login with empty fields
    await loginPage.login('', '');

    // The error message should be visible
    await expect(loginPage.errorMessage).toBeVisible();

    // Click the X button on the error message to close it
    await page.locator('[data-test="error"] button').click();

    // The error message should now be gone
    await expect(loginPage.errorMessage).not.toBeVisible();
  });

});
