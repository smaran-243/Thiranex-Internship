/**
 * storage.js
 * -----------
 * Utility module for localStorage operations.
 * All data is stored as JSON strings and parsed back on retrieval.
 *
 * Storage keys used across the app:
 *   - 'shopnest_cart'        → array of { productId, quantity }
 *   - 'shopnest_wishlist'    → array of product IDs
 *   - 'shopnest_users'       → array of user objects { name, email, password }
 *   - 'shopnest_currentUser' → current logged-in user { name, email } or null
 */

/**
 * Retrieve and parse a value from localStorage.
 * @param {string} key - The localStorage key to look up.
 * @returns {*} Parsed JSON value, or null if the key doesn't exist or parsing fails.
 */
export const getFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error reading "${key}" from localStorage:`, error);
    return null;
  }
};

/**
 * Save a value to localStorage as a JSON string.
 * @param {string} key  - The localStorage key.
 * @param {*}      data - The data to serialize and store.
 */
export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving "${key}" to localStorage:`, error);
  }
};

/**
 * Remove a key from localStorage.
 * @param {string} key - The localStorage key to remove.
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing "${key}" from localStorage:`, error);
  }
};
