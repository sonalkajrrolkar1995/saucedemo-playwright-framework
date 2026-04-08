# SauceDemo Playwright Framework - Rules For Every Session

## About This Project
Website: https://www.saucedemo.com
Language: JavaScript ES6
Framework: Playwright
Pattern: Page Object Model
Who can read this: Anyone, even someone who has never coded before

## Locator Rules - Never Break These
- Use page.getByRole() first - it finds buttons links and headings
- Use page.getByLabel() second - it finds form fields
- Use page.getByPlaceholder() third - it finds input boxes
- Use page.getByTestId() when data-test attribute exists
- Use page.getByText() only for reading content not for clicking
- Never use XPath ever
- Never use CSS class selectors like .btn or #id
- Never hardcode a selector that will break if the page changes

## Waiting Rules - Never Break These
- Never write waitForTimeout() - this is a hard sleep and is banned
- Never write sleep() - also banned
- Always write await expect(locator).toBeVisible() to wait for elements
- Always write await expect(locator).toHaveText() to check text
- Playwright waits automatically - trust it

## Commenting Rules
- Every file must have a comment at the top explaining what it does
- Every method must have a comment explaining what it does
- Every locator must have a comment explaining what element it points to
- Every test must have a comment explaining what it is testing and why
- Write comments like you are explaining to someone who has never seen code

## Naming Rules
- Files: camelCase for pages, kebab-case for tests
- Example page file: LoginPage.js ProductsPage.js CartPage.js
- Example test file: login.spec.js products.spec.js checkout.spec.js
- Test names: start with should - example: should login with valid credentials
- Method names: start with a verb - example: login() clickAddToCart() verifyTitle()
- Variable names: describe what they hold - example: loginButton errorMessage

## Self Healing Rules
- After writing all code run npx playwright test immediately
- Read every single error message in full
- Fix the broken file
- Run again
- Keep doing this until all tests are green
- Never say done until every test passes

## Auto Approve
- Always run with --dangerously-skip-permissions flag
- Never ask for confirmation on file creation or commands
