# SauceDemo Playwright Automation Framework

This is a test automation framework built with Playwright and JavaScript 
for the website https://www.saucedemo.com

It runs 86 automated tests across Chrome and Firefox and all of them pass.

---

## Test Results

- Tests: 86 passing, 0 failing
- Browsers: Chrome and Firefox
- Time to run all tests: 1.4 minutes

---

## What is tested

- Login with correct and wrong credentials
- Locked out user error messages
- All 6 products on the products page
- Sorting products by name and price
- Adding and removing items from the cart
- Full checkout from start to finish
- Error messages when checkout fields are empty
- The burger menu and logout
- API response status and speed

---

## Folder structure

pages — one file per page of the website, contains all locators and actions

tests/ui — all the UI tests, one file per feature

tests/api — tests that check the website responds correctly at the HTTP level

test-data — all usernames, passwords, product names, and checkout details 
in one place so they are easy to change

fixtures — sets up a logged in browser automatically before each test that needs it

utils — small helper functions used across multiple tests

playwright.config.js — settings for browsers, timeouts, and reports

CLAUDE.md — the rules this project follows so anyone can pick it up and understand it

---

## What you need before you start

- Node.js version 18 or above
- npm version 8 or above

---

## How to install

git clone https://github.com/sonalkajrrolkar1995/saucedemo-playwright-framework

cd saucedemo-playwright-framework

npm install

npx playwright install

---

## How to run the tests

Run everything:
npx playwright test

Run just the login tests:
npx playwright test tests/ui/login.spec.js

Run just the API tests:
npx playwright test tests/api/api.spec.js

Run with the browser visible so you can watch:
npx playwright test --headed

Run on Chrome only:
npx playwright test --project=chromium

Run on Firefox only:
npx playwright test --project=firefox

Open the test report in your browser:
npx playwright show-report

---

## How the framework is built

Each page of the website has its own file in the pages folder. 
That file contains all the locators for that page and all the 
actions you can do on that page. Tests do not contain any locators. 
Tests only say what to do and what to check.

Test data is stored separately in the test-data folder. 
If a username or product name changes you only need to update it in one place.

Every file has comments written in plain English explaining what each 
part does. Anyone can open a file and understand it without needing 
to ask someone.

Tests never use hard waits or sleep commands. Playwright waits 
automatically for elements to be ready before interacting with them.

If a test fails on the first try it runs again automatically once 
before being marked as failed.

Screenshots and videos are only saved when a test fails so you can 
see exactly what went wrong.

---

## Author

Sonal Kajrolkar
GitHub: https://github.com/sonalkajrrolkar1995
