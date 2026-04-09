module.exports = {
  validCustomer: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345',
  },
  emptyCustomer: {
    firstName: '',
    lastName: '',
    postalCode: '',
  },
  missingLastName: {
    firstName: 'John',
    lastName: '',
    postalCode: '',
  },
  missingPostalCode: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '',
  },
  errors: {
    firstNameRequired: 'Error: First Name is required',
    lastNameRequired: 'Error: Last Name is required',
    postalCodeRequired: 'Error: Postal Code is required',
  },
};
