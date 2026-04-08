// ============================================================
// test-data/products.js
// This file holds the real product data from the SauceDemo website.
// We verified every name, price, and description by looking at
// the actual website with Playwright MCP before writing this file.
// Never change these values unless the website itself changes.
// ============================================================

module.exports = {

  // ── ALL 6 PRODUCTS (in the order shown on the site A-Z) ──

  // Sauce Labs Backpack - the most expensive bag in the store
  backpack: {
    name: 'Sauce Labs Backpack',
    price: '$29.99',
    priceNumber: 29.99,
    description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
    // The data-test ID used in the add-to-cart button on the products page
    addToCartTestId: 'add-to-cart-sauce-labs-backpack',
    // The data-test ID used in the remove button (on cart and products page)
    removeTestId: 'remove-sauce-labs-backpack',
  },

  // Sauce Labs Bike Light - a small cheap accessory
  bikeLight: {
    name: 'Sauce Labs Bike Light',
    price: '$9.99',
    priceNumber: 9.99,
    description: "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
    addToCartTestId: 'add-to-cart-sauce-labs-bike-light',
    removeTestId: 'remove-sauce-labs-bike-light',
  },

  // Sauce Labs Bolt T-Shirt - a mid-priced shirt
  boltTShirt: {
    name: 'Sauce Labs Bolt T-Shirt',
    price: '$15.99',
    priceNumber: 15.99,
    description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.',
    addToCartTestId: 'add-to-cart-sauce-labs-bolt-t-shirt',
    removeTestId: 'remove-sauce-labs-bolt-t-shirt',
  },

  // Sauce Labs Fleece Jacket - the most expensive item in the store
  fleeceJacket: {
    name: 'Sauce Labs Fleece Jacket',
    price: '$49.99',
    priceNumber: 49.99,
    description: "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
    addToCartTestId: 'add-to-cart-sauce-labs-fleece-jacket',
    removeTestId: 'remove-sauce-labs-fleece-jacket',
  },

  // Sauce Labs Onesie - the cheapest item in the store
  onesie: {
    name: 'Sauce Labs Onesie',
    price: '$7.99',
    priceNumber: 7.99,
    description: 'Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won\'t unravel.',
    addToCartTestId: 'add-to-cart-sauce-labs-onesie',
    removeTestId: 'remove-sauce-labs-onesie',
  },

  // Test.allTheThings() T-Shirt (Red) - same price as Bolt T-Shirt
  redTShirt: {
    name: 'Test.allTheThings() T-Shirt (Red)',
    price: '$15.99',
    priceNumber: 15.99,
    description: 'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.',
    addToCartTestId: 'add-to-cart-test.allthethings()-t-shirt-(red)',
    removeTestId: 'remove-test.allthethings()-t-shirt-(red)',
  },

  // ── PRODUCT NAMES IN SORTED ORDER ────────────────────────

  // Names as shown when sorted "Name (A to Z)" - the default sort
  sortedNamesAtoZ: [
    'Sauce Labs Backpack',
    'Sauce Labs Bike Light',
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Fleece Jacket',
    'Sauce Labs Onesie',
    'Test.allTheThings() T-Shirt (Red)',
  ],

  // Names as shown when sorted "Name (Z to A)"
  sortedNamesZtoA: [
    'Test.allTheThings() T-Shirt (Red)',
    'Sauce Labs Onesie',
    'Sauce Labs Fleece Jacket',
    'Sauce Labs Bolt T-Shirt',
    'Sauce Labs Bike Light',
    'Sauce Labs Backpack',
  ],

  // Prices as shown when sorted "Price (low to high)"
  sortedPricesLowToHigh: [7.99, 9.99, 15.99, 15.99, 29.99, 49.99],

  // Prices as shown when sorted "Price (high to low)"
  sortedPricesHighToLow: [49.99, 29.99, 15.99, 15.99, 9.99, 7.99],

  // ── SORT DROPDOWN OPTIONS ─────────────────────────────────
  // These are the exact text values shown in the sort dropdown
  sortOptions: {
    nameAZ: 'az',       // value attribute for "Name (A to Z)"
    nameZA: 'za',       // value attribute for "Name (Z to A)"
    priceLowHigh: 'lohi', // value attribute for "Price (low to high)"
    priceHighLow: 'hilo', // value attribute for "Price (high to low)"
  },

  // Total number of products displayed on the inventory page
  totalCount: 6,
};
