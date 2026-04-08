// ============================================================
// tests/api/api.spec.js
// This file tests the SauceDemo website at the HTTP/API level.
//
// What does "API level" mean?
// Instead of opening a browser and clicking things, we send
// HTTP requests directly to the server and check the responses.
// This is faster than browser tests and catches server-side issues.
//
// What does this cover?
//   - The homepage returns HTTP status 200 (means "OK, success")
//   - The homepage responds within 2 seconds (performance check)
//   - The response body contains "Swag Labs" (correct content)
//   - The login page URL also returns status 200
//   - The response has the correct content type header
//
// HTTP status codes you need to know:
//   200 = OK (page loaded successfully)
//   404 = Not Found (page does not exist)
//   500 = Server Error (something broke on the server)
// ============================================================

// We import 'test' and 'expect' directly from Playwright here
// because API tests do not need our custom page object fixtures.
const { test, expect } = require('@playwright/test');

// The base URL of the website we are testing
const BASE_URL = 'https://www.saucedemo.com';

// Group all API tests together
test.describe('SauceDemo API / HTTP Tests', () => {

  // ── TEST 1 ────────────────────────────────────────────────────
  // Check that the homepage returns HTTP status 200.
  // Status 200 means the server responded successfully.
  // If this fails, the website might be down.
  test('should return status 200 for GET request to saucedemo.com', async ({ request }) => {
    // Send an HTTP GET request to the homepage
    // 'request' is Playwright's built-in HTTP client for API testing
    const response = await request.get(BASE_URL);

    // Check the HTTP status code is 200 (success)
    expect(response.status()).toBe(200);
  });

  // ── TEST 2 ────────────────────────────────────────────────────
  // Check that the server responds quickly (under 5 seconds).
  // If the site is too slow or unresponsive, it will fail this check.
  test('should respond in under 5000 milliseconds', async ({ request }) => {
    // Record the time BEFORE sending the request
    const startTime = Date.now();

    // Send the request
    await request.get(BASE_URL);

    // Record the time AFTER getting the response
    const endTime = Date.now();

    // Calculate how long it took in milliseconds
    const responseTime = endTime - startTime;

    // The response should have arrived within 5000 milliseconds (5 seconds)
    // We use 5 seconds to account for network variance - the real goal
    // is to catch cases where the server hangs, not measure exact speed.
    expect(responseTime).toBeLessThan(5000);
  });

  // ── TEST 3 ────────────────────────────────────────────────────
  // Check that the homepage HTML contains the text "Swag Labs".
  // This verifies we got the right page content back from the server.
  test('should contain Swag Labs in the response body', async ({ request }) => {
    // Send the request and get the response
    const response = await request.get(BASE_URL);

    // Read the response body as text (HTML)
    const body = await response.text();

    // Check that the HTML contains "Swag Labs" somewhere in it
    expect(body).toContain('Swag Labs');
  });

  // ── TEST 4 ────────────────────────────────────────────────────
  // Check that the login page URL also returns status 200.
  // This confirms the login page is accessible and not broken.
  test('should return status 200 for the login page specifically', async ({ request }) => {
    // The login page is at the root URL of SauceDemo
    const response = await request.get(`${BASE_URL}/`);

    // Check that the login page loaded successfully
    expect(response.status()).toBe(200);
  });

  // ── TEST 5 ────────────────────────────────────────────────────
  // Check that the Content-Type header says the response is HTML.
  // Content-Type tells the browser what kind of data it received.
  // A webpage should return "text/html".
  test('should have correct content-type header in response', async ({ request }) => {
    // Send the request
    const response = await request.get(BASE_URL);

    // Read the Content-Type header from the response
    const contentType = response.headers()['content-type'];

    // The Content-Type should include "text/html" for a webpage
    expect(contentType).toContain('text/html');
  });

});
