// Home Page - Landing page with hero, categories, featured products, and features
import { loadProducts, getFeaturedProducts, getCategories } from '../js/products.js';
import { addToCart } from '../js/cart.js';
import { isInWishlist, toggleWishlist } from '../js/wishlist.js';
import { showToast, createStarRating, formatPrice, updateCartBadge } from '../js/ui.js';
import { navigateTo } from '../js/router.js';

/**
 * Creates a product card HTML string for displaying a product.
 * Reusable helper used across multiple pages.
 */
function createProductCard(product) {
  return `
    <article class="product-card" data-id="${product.id}">
      <div class="product-card-image">
        <img src="${product.image}" alt="${product.title}" loading="lazy" />
      </div>
      <div class="product-card-info">
        <span class="category-tag">${product.category}</span>
        <h3 class="product-card-title">${product.title}</h3>
        <div class="product-card-rating">${createStarRating(product.rating)}</div>
        <p class="product-card-price">${formatPrice(product.price)}</p>
        <div class="product-card-actions">
          <button class="btn btn-primary btn-sm add-to-cart-btn" data-id="${product.id}" ${product.stock === 0 ? 'disabled' : ''}>Add to Cart</button>
          <button class="wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}" data-id="${product.id}" aria-label="Toggle wishlist">${isInWishlist(product.id) ? '♥' : '♡'}</button>
          <a href="#product/${product.id}" class="btn btn-outline btn-sm">View Details</a>
        </div>
      </div>
    </article>
  `;
}

/**
 * Sets up event delegation for product card actions (add-to-cart and wishlist).
 */
function setupProductCardListeners(container) {
  if (!container) return;

  container.addEventListener('click', (e) => {
    // Handle add-to-cart button clicks
    const cartBtn = e.target.closest('.add-to-cart-btn');
    if (cartBtn) {
      const id = parseInt(cartBtn.dataset.id);
      addToCart(id);
      showToast('Added to cart!');
      updateCartBadge();
      return;
    }

    // Handle wishlist button clicks
    const wishlistBtn = e.target.closest('.wishlist-btn');
    if (wishlistBtn) {
      const id = parseInt(wishlistBtn.dataset.id);
      const result = toggleWishlist(id);

      // Update button appearance based on wishlist state
      if (isInWishlist(id)) {
        wishlistBtn.textContent = '♥';
        wishlistBtn.classList.add('active');
        showToast('Added to wishlist!');
      } else {
        wishlistBtn.textContent = '♡';
        wishlistBtn.classList.remove('active');
        showToast('Removed from wishlist');
      }
      return;
    }
  });
}

/**
 * Renders the home page with hero, categories, featured products, and features.
 */
export async function renderHomePage() {
  const app = document.getElementById('app');

  // Load products data
  await loadProducts();

  // Get featured/trending products (top 8)
  const featuredProducts = getFeaturedProducts().slice(0, 8);

  // Category data with icons
  const categories = [
    { name: 'Living Room', icon: '🛋️' },
    { name: 'Bedroom', icon: '🛏️' },
    { name: 'Kitchen', icon: '🍳' },
    { name: 'Office', icon: '💼' },
    { name: 'Outdoor', icon: '🌿' }
  ];

  // Build the full home page HTML
  app.innerHTML = `
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Welcome to ShopNest</h1>
        <p>Discover beautiful home decor & furniture for every room in your house</p>
        <a href="#shop" class="btn btn-primary">Shop Now</a>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="categories">
      <h2 class="section-title">Shop by Category</h2>
      <div class="categories-grid">
        ${categories.map(cat => `
          <div class="category-card" data-category="${cat.name}">
            <span class="category-icon">${cat.icon}</span>
            <h3 class="category-name">${cat.name}</h3>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="featured-products">
      <h2 class="section-title">Trending Products</h2>
      <div class="products-grid" id="featuredGrid">
        ${featuredProducts.map(p => createProductCard(p)).join('')}
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="why-choose-us">
      <h2 class="section-title">Why Choose ShopNest</h2>
      <div class="features-grid">
        <div class="feature-card">
          <span class="feature-icon">📦</span>
          <h3>Free Shipping</h3>
          <p>Free shipping on orders over $50</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">✨</span>
          <h3>Quality Products</h3>
          <p>Carefully curated, premium quality items</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">🔄</span>
          <h3>Easy Returns</h3>
          <p>30-day hassle-free return policy</p>
        </div>
        <div class="feature-card">
          <span class="feature-icon">💬</span>
          <h3>24/7 Support</h3>
          <p>Round-the-clock customer assistance</p>
        </div>
      </div>
    </section>
  `;

  // Set up event delegation for product card actions
  const featuredGrid = document.getElementById('featuredGrid');
  setupProductCardListeners(featuredGrid);

  // Set up category card click navigation
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      navigateTo('#shop?category=' + card.dataset.category);
    });
  });
}
