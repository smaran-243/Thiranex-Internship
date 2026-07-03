/**
 * ui.js
 * -----
 * Shared UI utility functions used across all pages.
 */

import { getCartCount } from './cart.js';
import { getCurrentUser, isLoggedIn } from './auth.js';

/**
 * Display a toast notification that automatically disappears after 3 seconds.
 * @param {string} message - The message to display.
 * @param {'success'|'error'} [type='success'] - Visual style of the toast.
 */
export const showToast = (message, type = 'success') => {
  // Create the toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  // Slide-in animation via inline style
  toast.style.animation = 'slideIn 0.3s ease';

  document.body.appendChild(toast);

  // After 2.7 s start a fade-out, then remove
  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s ease forwards';
    // Remove from DOM once the animation finishes
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 2700);
};

/**
 * Build an HTML string that renders a star rating.
 * Uses ★ (filled) and ☆ (empty) characters.
 *
 * @param {number} rating - The numeric rating (0-5).
 * @returns {string} HTML string, e.g. "★★★★☆ <span class='rating-number'>4.2</span>"
 */
export const createStarRating = (rating) => {
  const rounded = Math.round(rating); // nearest integer for star display
  let stars = '';

  for (let i = 1; i <= 5; i++) {
    stars += i <= rounded ? '★' : '☆';
  }

  return `<span class="stars">${stars}</span> <span class="rating-number">${rating}</span>`;
};

/**
 * Format a numeric price as a dollar string.
 * @param {number} price - The price value.
 * @returns {string} Formatted string, e.g. "$29.99".
 */
export const formatPrice = (price) => {
  return `$${Number(price).toFixed(2)}`;
};

/**
 * Update the cart badge in the navbar.
 * If the count is 0, the badge is hidden; otherwise it's shown.
 */
export const updateCartBadge = () => {
  const badge = document.getElementById('cartBadge');
  if (!badge) return;

  const count = getCartCount();
  badge.textContent = count;
  badge.style.display = count > 0 ? 'inline-flex' : 'none';
};

/**
 * Update the navigation bar's user/auth section.
 * Shows the logged-in user's name + a logout button, or a login link.
 */
export const updateNavAuth = () => {
  const navUser = document.getElementById('navUser');
  if (!navUser) return;

  if (isLoggedIn()) {
    const user = getCurrentUser();
    navUser.innerHTML = `
      <span class="user-greeting">👤 ${user.name}</span>
      <button class="btn-logout" id="btnLogout">Logout</button>
    `;

    // Attach the logout handler
    const logoutBtn = document.getElementById('btnLogout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        // Import logout dynamically to avoid circular deps at module level
        import('./auth.js').then(({ logout }) => {
          logout();
          updateNavAuth();
          updateCartBadge();
          // Navigate to home after logging out
          window.location.hash = '#home';
        });
      });
    }
  } else {
    navUser.innerHTML = `<a href="#auth">👤 Login</a>`;
  }
};

/**
 * Smoothly scroll the window back to the top.
 */
export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
