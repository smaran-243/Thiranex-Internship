// Cart Page - Displays cart items with quantity controls and order summary
import { loadProducts, getProductById } from '../js/products.js';
import {
  getCart,
  removeFromCart,
  updateQuantity,
  getCartTotal,
  clearCart
} from '../js/cart.js';
import { showToast, formatPrice, updateCartBadge } from '../js/ui.js';

/**
 * Renders the cart page with items list and order summary.
 */
export async function renderCartPage() {
  const app = document.getElementById('app');

  // Load product data for cart item details
  await loadProducts();

  const cart = getCart();

  // Show empty state if cart has no items
  if (!cart || cart.length === 0) {
    app.innerHTML = `
      <section class="cart-page">
        <div class="container">
          <div class="empty-state">
            <span class="empty-state-icon">🛒</span>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items yet.</p>
            <a href="#shop" class="btn btn-primary" style="color: white;">Continue Shopping</a>
          </div>
        </div>
      </section>
    `;
    return;
  }

  // Map cart items to their full product details
  const cartItems = cart
    .map(item => {
      const product = getProductById(item.id);
      if (!product) return null;
      return { ...product, quantity: item.quantity };
    })
    .filter(Boolean); // Remove any null entries

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Build the cart page HTML
  app.innerHTML = `
    <section class="cart-page">
      <div class="container">
        <div class="page-title">
          <h1>Shopping Cart</h1>
        </div>
        <div class="cart-layout">
          <!-- Cart Items List -->
          <div class="cart-items-list">
            ${cartItems.map(item => `
              <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                  <img src="${item.image}" alt="${item.title}" />
                </div>
                <div class="cart-item-details">
                  <h3 class="cart-item-title">
                    <a href="#product/${item.id}">${item.title}</a>
                  </h3>
                  <p class="cart-item-price">${formatPrice(item.price)}</p>
                </div>
                <div class="cart-item-quantity">
                  <button class="qty-decrease" data-id="${item.id}">−</button>
                  <span class="quantity-value">${item.quantity}</span>
                  <button class="qty-increase" data-id="${item.id}">+</button>
                </div>
                <div class="cart-item-total">
                  ${formatPrice(item.price * item.quantity)}
                </div>
                <button class="cart-item-remove" data-id="${item.id}">✕</button>
              </div>
            `).join('')}
          </div>

          <!-- Order Summary Sidebar -->
          <div class="cart-summary">
            <h3>Order Summary</h3>
            <div class="cart-summary-row">
              <span>Subtotal</span>
              <span>${formatPrice(subtotal)}</span>
            </div>
            <div class="cart-summary-row cart-summary-total">
              <span>Total</span>
              <span>${formatPrice(subtotal)}</span>
            </div>
            <button class="btn btn-danger clear-cart-btn">Clear Cart</button>
            <a href="#shop" class="btn btn-outline" style="color: white;">Continue Shopping</a>
          </div>
        </div>
      </div>
    </section>
  `;

  // --- Event Listeners ---

  // Event delegation on cart items list for quantity and remove actions
  const cartItemsList = document.querySelector('.cart-items-list');
  if (cartItemsList) {
    cartItemsList.addEventListener('click', (e) => {
      // Decrease quantity
      const decreaseBtn = e.target.closest('.qty-decrease');
      if (decreaseBtn) {
        const id = parseInt(decreaseBtn.dataset.id);
        const item = cart.find(i => i.id === id);
        if (item) {
          updateQuantity(id, item.quantity - 1);
          renderCartPage(); // Re-render to reflect changes
          updateCartBadge();
        }
        return;
      }

      // Increase quantity
      const increaseBtn = e.target.closest('.qty-increase');
      if (increaseBtn) {
        const id = parseInt(increaseBtn.dataset.id);
        const item = cart.find(i => i.id === id);
        if (item) {
          updateQuantity(id, item.quantity + 1);
          renderCartPage(); // Re-render to reflect changes
          updateCartBadge();
        }
        return;
      }

      // Remove item
      const removeBtn = e.target.closest('.cart-item-remove');
      if (removeBtn) {
        const id = parseInt(removeBtn.dataset.id);
        removeFromCart(id);
        showToast('Item removed');
        renderCartPage(); // Re-render to reflect changes
        updateCartBadge();
        return;
      }
    });
  }

  // Clear entire cart
  const clearCartBtn = document.querySelector('.clear-cart-btn');
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      if (window.confirm('Clear all items from your cart?')) {
        clearCart();
        showToast('Cart cleared');
        renderCartPage(); // Re-render to show empty state
        updateCartBadge();
      }
    });
  }
}
