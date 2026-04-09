const { test, expect } = require('../../fixtures/base.fixture');
const { validUser, lockedUser, invalidUser, emptyUser, noPasswordUser } = require('../../test-data/users');

const LoginPage = require('../../pages/LoginPage');
const MenuPage = require('../../pages/MenuPage');

test.describe('Login Page', () => {

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login successfully with standard user and land on products page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(validUser.username, validUser.password);
    await loginPage.verifyLoginSuccess();
    await expect(page.getByTestId('title')).toHaveText('Products');
  });

  test('should show error when logging in with locked out user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(lockedUser.username, lockedUser.password);
    await loginPage.verifyErrorMessage('Epic sadface: Sorry, this user has been locked out.');
    await expect(page).toHaveURL('/');
  });

  test('should show error when logging in with wrong username and password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(invalidUser.username, invalidUser.password);
    await loginPage.verifyErrorMessage('Epic sadface: Username and password do not match');
    await expect(page).toHaveURL('/');
  });

  test('should show error when both fields are empty', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(emptyUser.username, emptyUser.password);
    await loginPage.verifyErrorMessage('Epic sadface: Username is required');
  });

  test('should show error when password field is empty', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(noPasswordUser.username, noPasswordUser.password);
    await loginPage.verifyErrorMessage('Epic sadface: Password is required');
  });

  test('should show error when username field is empty', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('', validUser.password);
    await loginPage.verifyErrorMessage('Epic sadface: Username is required');
  });

  test('should login and logout successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const menuPage = new MenuPage(page);
    await loginPage.login(validUser.username, validUser.password);
    await loginPage.verifyLoginSuccess();
    await menuPage.logout();
    await expect(page).toHaveURL('/');
    await expect(page.getByTestId('login-button')).toBeVisible();
  });

  test('should clear error message after clicking the error close button', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('', '');
    await expect(loginPage.errorMessage).toBeVisible();
    await page.locator('[data-test="error"] button').click();
    await expect(loginPage.errorMessage).not.toBeVisible();
  });

});
