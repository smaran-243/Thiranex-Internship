/**
 * wishlist.js
 * -----------
 * Wishlist management module.
 * The wishlist is stored in localStorage as a flat array of product IDs.
 */

import { getFromStorage, saveToStorage } from './storage.js';

/** localStorage key for the wishlist */
const WISHLIST_KEY = 'shopnest_wishlist';

/**
 * Get the current wishlist from localStorage.
 * @returns {number[]} Array of product IDs (empty if none exists).
 */
export const getWishlist = () => {
  return getFromStorage(WISHLIST_KEY) || [];
};

/**
 * Add a product to the wishlist (if not already present).
 * @param {number} productId - The product to add.
 */
export const addToWishlist = (productId) => {
  const wishlist = getWishlist();

  // Prevent duplicates
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    saveToStorage(WISHLIST_KEY, wishlist);
  }
};

/**
 * Remove a product from the wishlist.
 * @param {number} productId - The product to remove.
 */
export const removeFromWishlist = (productId) => {
  const wishlist = getWishlist().filter((id) => id !== productId);
  saveToStorage(WISHLIST_KEY, wishlist);
};

/**
 * Toggle a product in/out of the wishlist.
 * @param {number} productId - The product to toggle.
 * @returns {boolean} True if the product was added, false if it was removed.
 */
export const toggleWishlist = (productId) => {
  const wishlist = getWishlist();

  if (wishlist.includes(productId)) {
    // Already in wishlist → remove it
    saveToStorage(
      WISHLIST_KEY,
      wishlist.filter((id) => id !== productId)
    );
    return false;
  } else {
    // Not in wishlist → add it
    wishlist.push(productId);
    saveToStorage(WISHLIST_KEY, wishlist);
    return true;
  }
};

/**
 * Check whether a product is in the wishlist.
 * @param {number} productId - The product to check.
 * @returns {boolean} True if the product is wishlisted.
 */
export const isInWishlist = (productId) => {
  return getWishlist().includes(productId);
};
