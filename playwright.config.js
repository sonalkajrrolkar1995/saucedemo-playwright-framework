// ============================================================
// playwright.config.js
// This is the main configuration file for the entire test suite.
// Think of it like the control panel for all our tests.
// It tells Playwright WHERE to test, HOW to run tests,
// and WHAT to do when tests fail.
// ============================================================

// We import the defineConfig helper from Playwright.
// This gives us nice autocomplete and error checking in our editor.
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({

  // ── WHERE ARE THE TESTS? ────────────────────────────────
  // This tells Playwright to look for test files inside the tests/ folder.
  // Any file ending in .spec.js is treated as a test file.
  testDir: './tests',

  // ── RUN TESTS IN PARALLEL ───────────────────────────────
  // fullyParallel: true means all tests run at the same time
  // instead of one after another. This makes the suite faster.
  fullyParallel: true,

  // ── STOP ON FIRST FAILURE? ──────────────────────────────
  // forbidOnly: true means if someone accidentally commits a
  // test.only() call (which only runs one test), CI will fail.
  // We don't want that in production.
  forbidOnly: !!process.env.CI,

  // ── HOW MANY TIMES TO RETRY A FAILED TEST? ──────────────
  // On CI (continuous integration server): retry once if a test fails.
  // Locally (your laptop): do not retry, fail fast so you fix it now.
  retries: process.env.CI ? 1 : 0,

  // ── HOW MANY TESTS RUN AT ONCE? ─────────────────────────
  // This is the number of parallel workers (browser tabs) running tests.
  // undefined means Playwright picks the best number for your machine.
  workers: process.env.CI ? 1 : undefined,

  // ── REPORTING ───────────────────────────────────────────
  // 'html' creates a beautiful visual HTML report you can open in a browser.
  // Run: npx playwright show-report to view it after tests finish.
  reporter: 'html',

  // ── SHARED SETTINGS FOR ALL TESTS ───────────────────────
  // These settings apply to every single test unless overridden.
  use: {

    // The base URL of the website we are testing.
    // When we write page.goto('/'), Playwright goes to this URL.
    baseURL: 'https://www.saucedemo.com',

    // When Playwright looks for elements by data-test="xxx",
    // this setting tells it to look for the "data-test" attribute.
    testIdAttribute: 'data-test',

    // headless: false means we can SEE the browser running.
    // Set to true if you want tests to run invisibly in the background.
    headless: false,

    // Take a screenshot ONLY when a test fails.
    // This helps you see exactly what the page looked like when it broke.
    screenshot: 'only-on-failure',

    // Record a video ONLY when a test fails.
    // You can replay it like a movie to see what went wrong.
    video: 'retain-on-failure',

    // Record a trace (detailed step-by-step log) on the FIRST retry.
    // Open it with: npx playwright show-trace trace.zip
    trace: 'on-first-retry',

    // How long to wait for any single action (like clicking a button)
    // before giving up. 30 seconds is generous for a slow network.
    actionTimeout: 30000,

    // How long to wait for a page to finish loading.
    navigationTimeout: 30000,
  },

  // ── HOW LONG CAN A SINGLE TEST RUN? ─────────────────────
  // If a test takes longer than 60 seconds, it is killed and marked as failed.
  // We use 60 seconds to give Firefox (which is slower to start) enough time.
  timeout: 60000,

  // ── WHICH BROWSERS TO RUN TESTS ON? ─────────────────────
  // We run every test on BOTH Chrome and Firefox to catch browser-specific bugs.
  projects: [
    {
      // Run tests in Google Chrome (called "chromium" in Playwright)
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      // Run tests in Mozilla Firefox.
      // We use headless: true for Firefox because Firefox in headed mode
      // is significantly slower and causes tests to time out on some machines.
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], headless: true },
    },
  ],
});
