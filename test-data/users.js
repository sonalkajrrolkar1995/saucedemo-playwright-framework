// ============================================================
// test-data/users.js
// This file holds all the usernames and passwords we use in tests.
// Instead of typing "standard_user" directly in every test file,
// we store it here once and import it wherever we need it.
// That way, if a password ever changes, we only update ONE file.
// ============================================================

// module.exports makes these values available to other files
// that do: const { validUser } = require('../test-data/users');
module.exports = {

  // ── VALID USER ───────────────────────────────────────────
  // This user can log in successfully and use the full site.
  validUser: {
    username: 'standard_user',
    password: 'secret_sauce',
  },

  // ── LOCKED OUT USER ──────────────────────────────────────
  // This user exists but has been blocked from logging in.
  // Trying to log in shows: "Epic sadface: Sorry, this user has been locked out."
  lockedUser: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },

  // ── PROBLEM USER ─────────────────────────────────────────
  // This user can log in but the site shows broken images and
  // other UI problems. Useful for testing visual defects.
  problemUser: {
    username: 'problem_user',
    password: 'secret_sauce',
  },

  // ── PERFORMANCE GLITCH USER ──────────────────────────────
  // This user can log in but the site loads very slowly on purpose.
  // Useful for testing that we handle slow responses gracefully.
  performanceUser: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
  },

  // ── INVALID USER ─────────────────────────────────────────
  // These credentials do not exist in the system.
  // Logging in should show an error message.
  invalidUser: {
    username: 'wrong_user',
    password: 'wrong_pass',
  },

  // ── EMPTY USER ───────────────────────────────────────────
  // Both username and password are blank.
  // Logging in should show: "Epic sadface: Username is required"
  emptyUser: {
    username: '',
    password: '',
  },

  // ── USERNAME ONLY (NO PASSWORD) ──────────────────────────
  // Only the username is filled. Password is blank.
  // Logging in should show: "Epic sadface: Password is required"
  noPasswordUser: {
    username: 'standard_user',
    password: '',
  },
};
