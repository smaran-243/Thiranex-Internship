/**
 * auth.js
 * -------
 * Authentication module using localStorage.
 * Users are stored as an array; the current session is a single user object.
 */

import { getFromStorage, saveToStorage, removeFromStorage } from './storage.js';

/** localStorage keys */
const USERS_KEY = 'shopnest_users';
const CURRENT_USER_KEY = 'shopnest_currentUser';

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

/**
 * Validate an email address with a simple regex.
 * @param {string} email - The email string to validate.
 * @returns {boolean} True if the email looks valid.
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate a password (must be at least 6 characters).
 * @param {string} password - The password to validate.
 * @returns {boolean} True if the password meets the minimum length.
 */
export const validatePassword = (password) => {
  return typeof password === 'string' && password.length >= 6;
};

/**
 * Validate a user name (at least 2 non-whitespace characters after trimming).
 * @param {string} name - The name to validate.
 * @returns {boolean} True if the name is valid.
 */
export const validateName = (name) => {
  return typeof name === 'string' && name.trim().length >= 2;
};

// ---------------------------------------------------------------------------
// Auth operations
// ---------------------------------------------------------------------------

/**
 * Register a new user.
 * @param {string} name     - The user's display name.
 * @param {string} email    - The user's email address.
 * @param {string} password - The user's chosen password.
 * @returns {{ success: boolean, message: string }} Result object.
 */
export const signup = (name, email, password) => {
  // --- Input validation ---
  if (!validateName(name)) {
    return { success: false, message: 'Name must be at least 2 characters.' };
  }
  if (!validateEmail(email)) {
    return { success: false, message: 'Please enter a valid email address.' };
  }
  if (!validatePassword(password)) {
    return { success: false, message: 'Password must be at least 6 characters.' };
  }

  // --- Check for duplicate email ---
  const users = getFromStorage(USERS_KEY) || [];
  const emailExists = users.some(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );

  if (emailExists) {
    return { success: false, message: 'An account with this email already exists.' };
  }

  // --- Save the new user ---
  users.push({ name: name.trim(), email: email.toLowerCase(), password });
  saveToStorage(USERS_KEY, users);

  return { success: true, message: 'Account created successfully! You can now log in.' };
};

/**
 * Log in an existing user.
 * @param {string} email    - The user's email.
 * @param {string} password - The user's password.
 * @returns {{ success: boolean, message: string, user?: { name: string, email: string } }} Result object.
 */
export const login = (email, password) => {
  if (!validateEmail(email)) {
    return { success: false, message: 'Please enter a valid email address.' };
  }
  if (!validatePassword(password)) {
    return { success: false, message: 'Password must be at least 6 characters.' };
  }

  const users = getFromStorage(USERS_KEY) || [];

  // Find a matching user by email AND password
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    return { success: false, message: 'Invalid email or password.' };
  }

  // Store a safe copy (no password) as the current session
  const currentUser = { name: user.name, email: user.email };
  saveToStorage(CURRENT_USER_KEY, currentUser);

  return { success: true, message: 'Login successful!', user: currentUser };
};

/**
 * Log out the current user by removing the session from localStorage.
 */
export const logout = () => {
  removeFromStorage(CURRENT_USER_KEY);
};

/**
 * Get the currently logged-in user.
 * @returns {{ name: string, email: string } | null} The user object, or null if not logged in.
 */
export const getCurrentUser = () => {
  return getFromStorage(CURRENT_USER_KEY);
};

/**
 * Check whether a user is currently logged in.
 * @returns {boolean} True if a user session exists.
 */
export const isLoggedIn = () => {
  return getCurrentUser() !== null;
};
