// Wishlist Page - Displays saved wishlist items with move-to-cart option
import { loadProducts, getProductById } from '../js/products.js';
import { addToCart } from '../js/cart.js';
import { getWishlist, removeFromWishlist } from '../js/wishlist.js';
import { showToast, formatPrice, updateCartBadge } from '../js/ui.js';

/**
 * Renders the wishlist page showing all saved items.
 */
export async function renderWishlistPage() {
  const app = document.getElementById('app');

  // Load product data
  await loadProducts();

  const wishlistIds = getWishlist();

  // Show empty state if wishlist is empty
  if (!wishlistIds || wishlistIds.length === 0) {
    app.innerHTML = `
      <section class="wishlist-page">
        <div class="container">
          <div class="empty-state">
            <span class="empty-state-icon">💝</span>
            <h2>Your wishlist is empty</h2>
            <p>Save items you love for later.</p>
            <a href="#shop" class="btn btn-primary" style="color: white;">Browse Products</a>
          </div>
        </div>
      </section>
    `;
    return;
  }

  // Map wishlist IDs to full product details
  const wishlistItems = wishlistIds
    .map(id => getProductById(id))
    .filter(Boolean);

  // Build the wishlist page HTML
  app.innerHTML = `
    <section class="wishlist-page">
      <div class="container">
        <div class="page-title">
          <h1>My Wishlist</h1>
        </div>
        <div class="products-grid" id="wishlistGrid">
          ${wishlistItems.map(product => `
            <article class="wishlist-item" data-id="${product.id}">
              <div class="product-card-image">
                <img src="${product.image}" alt="${product.title}" loading="lazy" />
              </div>
              <div class="product-card-info">
                <h3>${product.title}</h3>
                <p class="product-card-price">${formatPrice(product.price)}</p>
                <div class="wishlist-item-actions">
                  <button class="btn btn-primary btn-sm move-to-cart-btn" data-id="${product.id}">Move to Cart</button>
                  <button class="btn btn-danger btn-sm remove-wishlist-btn" data-id="${product.id}">Remove</button>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    </section>
  `;

  // --- Event Delegation ---
  const wishlistGrid = document.getElementById('wishlistGrid');
  if (wishlistGrid) {
    wishlistGrid.addEventListener('click', (e) => {
      // Move item to cart
      const moveBtn = e.target.closest('.move-to-cart-btn');
      if (moveBtn) {
        const id = parseInt(moveBtn.dataset.id);
        addToCart(id);
        removeFromWishlist(id);
        showToast('Moved to cart!');
        updateCartBadge();
        renderWishlistPage(); // Re-render to reflect changes
        return;
      }

      // Remove item from wishlist
      const removeBtn = e.target.closest('.remove-wishlist-btn');
      if (removeBtn) {
        const id = parseInt(removeBtn.dataset.id);
        removeFromWishlist(id);
        showToast('Removed from wishlist');
        renderWishlistPage(); // Re-render to reflect changes
        return;
      }
    });
  }
}
