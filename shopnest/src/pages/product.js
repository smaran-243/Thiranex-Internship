// Product Detail Page - Shows full details for a single product
import { loadProducts, getProductById } from '../js/products.js';
import { addToCart } from '../js/cart.js';
import { isInWishlist, toggleWishlist } from '../js/wishlist.js';
import { showToast, createStarRating, formatPrice, updateCartBadge } from '../js/ui.js';

/**
 * Renders the product detail page for a given product ID.
 * @param {number|string} productId - The ID of the product to display
 */
export async function renderProductPage(productId) {
  const app = document.getElementById('app');

  // Load products data
  await loadProducts();

  // Find the product by ID
  const product = getProductById(parseInt(productId));

  // Handle product not found
  if (!product) {
    app.innerHTML = `
      <section class="product-details">
        <div class="container">
          <div class="empty-state">
            <span class="empty-state-icon">😕</span>
            <h2>Product Not Found</h2>
            <p>Sorry, we couldn't find the product you're looking for.</p>
            <a href="#shop" class="btn btn-primary">Back to Shop</a>
          </div>
        </div>
      </section>
    `;
    return;
  }

  // Track quantity selection
  let quantity = 1;
  const inStock = product.stock > 0;
  const wishlisted = isInWishlist(product.id);

  // Build the product detail HTML
  app.innerHTML = `
    <section class="product-details">
      <div class="container">
        <a href="#shop" class="back-link">← Back to Shop</a>
        <div class="product-detail-layout">
          <!-- Product Image -->
          <div class="product-detail-image">
            <img src="${product.image}" alt="${product.title}" />
          </div>

          <!-- Product Info -->
          <div class="product-detail-info">
            <span class="category-tag">${product.category}</span>
            <h1 class="product-detail-title">${product.title}</h1>
            <div class="product-detail-rating">
              ${createStarRating(product.rating)}
              <span class="rating-value">${product.rating}</span>
            </div>
            <p class="product-detail-price">${formatPrice(product.price)}</p>

            <!-- Stock Status -->
            <div class="stock-status">
              ${inStock
                ? `<span class="in-stock">✓ In Stock (${product.stock} available)</span>`
                : `<span class="out-of-stock">✗ Out of Stock</span>`
              }
            </div>

            <!-- Descriptions -->
            <p class="product-short-desc">${product.shortDesc || product.description || ''}</p>
            <p class="product-long-desc">${product.longDesc || ''}</p>

            <!-- Quantity Selector (only if in stock) -->
            ${inStock ? `
              <div class="quantity-selector">
                <button class="qty-decrease">−</button>
                <span class="quantity-value">1</span>
                <button class="qty-increase">+</button>
              </div>
            ` : ''}

            <!-- Action Buttons -->
            <div class="product-actions">
              <button class="btn btn-primary add-to-cart-detail-btn" ${!inStock ? 'disabled' : ''}>
                Add to Cart
              </button>
              <button class="btn btn-outline wishlist-detail-btn">
                ${wishlisted ? '♥ In Wishlist' : '♡ Add to Wishlist'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  // --- DOM references ---
  const qtyValue = document.querySelector('.quantity-value');
  const qtyDecrease = document.querySelector('.qty-decrease');
  const qtyIncrease = document.querySelector('.qty-increase');
  const addToCartBtn = document.querySelector('.add-to-cart-detail-btn');
  const wishlistBtn = document.querySelector('.wishlist-detail-btn');

  // --- Event Listeners ---

  // Decrease quantity (minimum 1)
  if (qtyDecrease) {
    qtyDecrease.addEventListener('click', () => {
      if (quantity > 1) {
        quantity--;
        qtyValue.textContent = quantity;
      }
    });
  }

  // Increase quantity (maximum = product stock)
  if (qtyIncrease) {
    qtyIncrease.addEventListener('click', () => {
      if (quantity < product.stock) {
        quantity++;
        qtyValue.textContent = quantity;
      }
    });
  }

  // Add to cart with selected quantity
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      addToCart(product.id, quantity);
      showToast(`Added ${quantity} item${quantity > 1 ? 's' : ''} to cart!`);
      updateCartBadge();
    });
  }

  // Toggle wishlist
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () => {
      toggleWishlist(product.id);

      if (isInWishlist(product.id)) {
        wishlistBtn.textContent = '♥ In Wishlist';
        showToast('Added to wishlist!');
      } else {
        wishlistBtn.textContent = '♡ Add to Wishlist';
        showToast('Removed from wishlist');
      }
    });
  }
}
