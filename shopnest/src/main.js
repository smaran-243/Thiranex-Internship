/**
 * main.js
 * -------
 * Application entry point for ShopNest.
 *
 * Responsibilities:
 *   1. Inject the app shell (header, <main>, footer) into the DOM.
 *   2. Boot the hash-based router.
 *   3. Set up the hamburger (mobile nav) toggle.
 *   4. Initialise cart badge and nav auth state.
 */

import './styles/main.css';
import { initRouter } from './js/router.js';
import { updateCartBadge, updateNavAuth } from './js/ui.js';

// ---------------------------------------------------------------------------
// App shell template
// ---------------------------------------------------------------------------
const appShell = `
<header class="navbar" role="banner">
  <div class="container navbar-content">
    <a href="#home" class="navbar-brand">🏠 ShopNest</a>
    <nav role="navigation" aria-label="Main navigation">
      <ul class="nav-links" id="navLinks">
        <li><a href="#home">Home</a></li>
        <li><a href="#shop">Shop</a></li>
        <li><a href="#cart">Cart</a></li>
        <li><a href="#wishlist">Wishlist</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
    <div class="nav-icons">
      <a href="#cart" class="nav-cart" aria-label="Shopping cart">
        🛒 <span class="cart-badge" id="cartBadge">0</span>
      </a>
      <span class="nav-user" id="navUser">
        <a href="#auth">👤 Login</a>
      </span>
    </div>
    <button class="hamburger" id="hamburger" aria-label="Toggle navigation menu" type="button">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
<main id="app" role="main"></main>
<footer class="footer" role="contentinfo">
  <div class="container footer-content">
    <div class="footer-section">
      <h3>🏠 ShopNest</h3>
      <p>Your one-stop shop for quality home decor and furniture. Making your space beautiful since 2024.</p>
    </div>
    <div class="footer-section">
      <h3>Quick Links</h3>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#shop">Shop</a></li>
        <li><a href="#cart">Cart</a></li>
        <li><a href="#wishlist">Wishlist</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
    <div class="footer-section">
      <h3>Contact Info</h3>
      <p>📧 support@shopnest.com</p>
      <p>📞 +1 (555) 123-4567</p>
      <p>📍 123 Home Street, Design City</p>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2024 ShopNest. All rights reserved.</p>
  </div>
</footer>
`;

// ---------------------------------------------------------------------------
// Bootstrap
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // 1. Inject the app shell into the root element
  const root = document.getElementById('app-root');
  if (root) {
    root.innerHTML = appShell;
  }

  // 2. Start the hash-based router
  initRouter();

  // 3. Initialise header state
  updateCartBadge();
  updateNavAuth();

  // 4. Hamburger menu toggle for mobile navigation
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
    });

    // Close mobile nav when a link is clicked
    navLinks.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  }
});
