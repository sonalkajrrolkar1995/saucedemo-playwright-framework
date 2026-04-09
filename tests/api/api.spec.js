const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://www.saucedemo.com';

test.describe('SauceDemo API / HTTP Tests', () => {

  test('should return status 200 for GET request to saucedemo.com', async ({ request }) => {
    const response = await request.get(BASE_URL);
    expect(response.status()).toBe(200);
  });

  test('should respond in under 5000 milliseconds', async ({ request }) => {
    const startTime = Date.now();
    await request.get(BASE_URL);
    const responseTime = Date.now() - startTime;
    expect(responseTime).toBeLessThan(5000);
  });

  test('should contain Swag Labs in the response body', async ({ request }) => {
    const response = await request.get(BASE_URL);
    const body = await response.text();
    expect(body).toContain('Swag Labs');
  });

  test('should return status 200 for the login page specifically', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/`);
    expect(response.status()).toBe(200);
  });

  test('should have correct content-type header in response', async ({ request }) => {
    const response = await request.get(BASE_URL);
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('text/html');
  });

});
