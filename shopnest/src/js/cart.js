/**
 * cart.js
 * -------
 * Cart management module.
 * The cart is stored in localStorage as an array of { productId, quantity } objects.
 *
 * Note: For backward compatibility with existing page files, cart items also
 * expose an `id` alias that mirrors `productId`.
 */

import { getFromStorage, saveToStorage } from './storage.js';

/** localStorage key for the shopping cart */
const CART_KEY = 'shopnest_cart';

/**
 * Normalise a raw cart item to ensure it has both `id` and `productId` fields.
 * @param {Object} item - A raw cart item.
 * @returns {{ id: number, productId: number, quantity: number }}
 */
const normaliseItem = (item) => ({
  id: item.productId ?? item.id,
  productId: item.productId ?? item.id,
  quantity: item.quantity,
});

/**
 * Get the current cart from localStorage (normalised).
 * @returns {{ id: number, productId: number, quantity: number }[]} The cart array.
 */
export const getCart = () => {
  const raw = getFromStorage(CART_KEY) || [];
  return raw.map(normaliseItem);
};

/**
 * Save a normalised cart array to localStorage.
 * @param {{ id: number, productId: number, quantity: number }[]} cart
 */
const saveCart = (cart) => {
  saveToStorage(CART_KEY, cart);
};

/**
 * Add an item to the cart or increase its quantity if it already exists.
 * @param {number} productId - The product's unique ID.
 * @param {number} [quantity=1] - How many units to add.
 * @returns {{ id: number, productId: number, quantity: number }[]} The updated cart.
 */
export const addToCart = (productId, quantity = 1) => {
  const cart = getCart();

  const existingItem = cart.find((item) => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ id: productId, productId, quantity });
  }

  saveCart(cart);
  return cart;
};

/**
 * Remove an item entirely from the cart.
 * @param {number} productId - The product to remove.
 */
export const removeFromCart = (productId) => {
  const cart = getCart().filter((item) => item.productId !== productId);
  saveCart(cart);
};

/**
 * Set a specific quantity for a cart item.
 * If the resulting quantity is 0 or less the item is removed.
 * @param {number} productId - The product to update.
 * @param {number} quantity  - The new quantity value.
 */
export const updateQuantity = (productId, quantity) => {
  let cart = getCart();

  if (quantity <= 0) {
    cart = cart.filter((item) => item.productId !== productId);
  } else {
    const item = cart.find((item) => item.productId === productId);
    if (item) {
      item.quantity = quantity;
    }
  }

  saveCart(cart);
};

/**
 * Get the total number of individual items in the cart (sum of all quantities).
 * @returns {number} Total item count.
 */
export const getCartCount = () => {
  return getCart().reduce((total, item) => total + item.quantity, 0);
};

/**
 * Calculate the total price of all cart items.
 * @param {Object[]} [products] - Optional product catalogue. If omitted, totals
 *   are calculated from whatever data is available on the cart items.
 * @returns {number} The total price.
 */
export const getCartTotal = (products) => {
  const cart = getCart();

  if (!products || !Array.isArray(products)) return 0;

  return cart.reduce((total, cartItem) => {
    const product = products.find((p) => p.id === cartItem.productId);
    if (product) {
      return total + product.price * cartItem.quantity;
    }
    return total;
  }, 0);
};

/**
 * Empty the entire cart.
 */
export const clearCart = () => {
  saveCart([]);
};

/**
 * Check whether a product is already in the cart.
 * @param {number} productId - The product to check.
 * @returns {boolean} True if the product is in the cart.
 */
export const isInCart = (productId) => {
  return getCart().some((item) => item.productId === productId);
};
