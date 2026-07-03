/**
 * router.js
 * ---------
 * Simple hash-based router for the ShopNest SPA.
 *
 * Route map:
 *   ''  | '#' | '#home'       → Home page
 *   '#shop'                   → Shop page  (supports ?category=Kitchen, etc.)
 *   '#product/{id}'           → Single product page
 *   '#cart'                   → Cart page
 *   '#wishlist'               → Wishlist page
 *   '#auth'                   → Login / Signup page
 *   '#contact'                → Contact page
 *   (anything else)           → Home page (fallback)
 */

// Page renderers – each file exports a single render function
import { renderHomePage } from '../pages/home.js';
import { renderShopPage } from '../pages/shop.js';
import { renderProductPage } from '../pages/product.js';
import { renderCartPage } from '../pages/cart.js';
import { renderWishlistPage } from '../pages/wishlist.js';
import { renderAuthPage } from '../pages/auth.js';
import { renderContactPage } from '../pages/contact.js';

// UI helpers to run after every page change
import { updateCartBadge, updateNavAuth, scrollToTop } from './ui.js';

/**
 * Determine and render the correct page based on the current URL hash.
 * Called on every hash change and on initial load.
 */
export const renderPage = () => {
  // Raw hash, e.g. "#shop?category=Kitchen" or "#product/5"
  const hash = window.location.hash || '#home';

  // Split off any query string → base = "#shop", query = "category=Kitchen"
  const [base] = hash.split('?');

  // ---- Route matching ----
  if (base === '' || base === '#' || base === '#home') {
    renderHomePage();
  } else if (base === '#shop') {
    renderShopPage();
  } else if (base.startsWith('#product/')) {
    // Extract the product ID from the hash
    const id = base.split('/')[1];
    renderProductPage(id);
  } else if (base === '#cart') {
    renderCartPage();
  } else if (base === '#wishlist') {
    renderWishlistPage();
  } else if (base === '#auth') {
    renderAuthPage();
  } else if (base === '#contact') {
    renderContactPage();
  } else {
    // Unknown route → fallback to home
    renderHomePage();
  }

  // ---- Post-render tasks ----
  updateCartBadge();
  updateNavAuth();
  scrollToTop();
};

/**
 * Initialise the router.
 * Listens for hash changes and renders the initial page.
 */
export const initRouter = () => {
  window.addEventListener('hashchange', renderPage);
  renderPage(); // Render the page that matches the current hash on load
};

/**
 * Programmatically navigate to a new hash route.
 * @param {string} hash - The hash to navigate to, e.g. '#shop' or '#product/3'.
 */
export const navigateTo = (hash) => {
  window.location.hash = hash;
};
