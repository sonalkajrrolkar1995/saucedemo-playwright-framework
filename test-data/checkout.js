// ============================================================
// test-data/checkout.js
// This file holds customer information used during checkout tests.
// We store it here so every test uses the same data and we never
// have to type "John Doe" or "12345" directly inside a test.
// ============================================================

module.exports = {

  // ── VALID CUSTOMER ────────────────────────────────────────
  // A customer with all required fields filled in correctly.
  // Using this data should allow checkout to complete successfully.
  validCustomer: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345',
  },

  // ── EMPTY CUSTOMER ────────────────────────────────────────
  // All fields are empty strings.
  // Submitting this should show: "Error: First Name is required"
  emptyCustomer: {
    firstName: '',
    lastName: '',
    postalCode: '',
  },

  // ── MISSING LAST NAME ─────────────────────────────────────
  // Only first name is provided. Last name and postal code are missing.
  // Submitting this should show: "Error: Last Name is required"
  missingLastName: {
    firstName: 'John',
    lastName: '',
    postalCode: '',
  },

  // ── MISSING POSTAL CODE ───────────────────────────────────
  // First and last name provided, but no postal code.
  // Submitting this should show: "Error: Postal Code is required"
  missingPostalCode: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '',
  },

  // ── EXPECTED ERROR MESSAGES ───────────────────────────────
  // The exact text shown in the red error box for each validation failure.
  // We verified these by looking at the real website.
  errors: {
    firstNameRequired: 'Error: First Name is required',
    lastNameRequired: 'Error: Last Name is required',
    postalCodeRequired: 'Error: Postal Code is required',
  },
};
