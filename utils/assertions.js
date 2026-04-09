const { expect } = require('@playwright/test');

async function verifyPageTitle(page, expectedTitle) {
  await expect(page.getByTestId('title')).toHaveText(expectedTitle);
}

async function verifyURL(page, urlPart) {
  await expect(page).toHaveURL(new RegExp(urlPart));
}

async function verifyCartBadge(page, expectedCount) {
  await expect(page.getByTestId('shopping-cart-badge')).toHaveText(expectedCount);
}

async function verifyCartIsEmpty(page) {
  await expect(page.getByTestId('shopping-cart-badge')).not.toBeVisible();
}

module.exports = {
  verifyPageTitle,
  verifyURL,
  verifyCartBadge,
  verifyCartIsEmpty,
};
