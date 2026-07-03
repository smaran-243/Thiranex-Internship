// Shop Page - Product listing with filters, search, and sorting
import {
  loadProducts,
  searchProducts,
  filterByCategory,
  filterByPrice,
  sortProducts,
  getCategories
} from '../js/products.js';
import { addToCart } from '../js/cart.js';
import { isInWishlist, toggleWishlist } from '../js/wishlist.js';
import { showToast, createStarRating, formatPrice, updateCartBadge } from '../js/ui.js';

/**
 * Creates a product card HTML string (same structure as home page).
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
 * Renders the shop page with full filtering, searching, and sorting.
 */
export async function renderShopPage() {
  const app = document.getElementById('app');

  // Load all products
  await loadProducts();

  // --- State variables for filtering ---
  let allProducts = [];
  let searchQuery = '';
  let selectedCategories = [];
  let minPrice = null;
  let maxPrice = null;
  let currentSort = '';

  // Get all products and categories
  allProducts = searchProducts(''); // returns all products when query is empty
  const categories = getCategories();

  // Check URL hash for pre-selected category (e.g., #shop?category=Kitchen)
  const hash = window.location.hash;
  if (hash.includes('?category=')) {
    const cat = decodeURIComponent(hash.split('?category=')[1]);
    selectedCategories = [cat];
  }

  // Build the shop page HTML
  app.innerHTML = `
    <section class="shop-page">
      <div class="container">
        <div class="page-title">
          <h1>Our Products</h1>
        </div>
        <div class="search-bar">
          <input type="text" id="searchInput" placeholder="Search products..." />
        </div>
        <div class="shop-layout">
          <!-- Filters Sidebar -->
          <aside class="filters-sidebar">
            <h3>Filters</h3>
            <div class="filter-group">
              <h4>Category</h4>
              <div class="category-filters">
                ${categories.map(cat => `
                  <label class="filter-checkbox">
                    <input type="checkbox" value="${cat}" ${selectedCategories.includes(cat) ? 'checked' : ''} />
                    ${cat}
                  </label>
                `).join('')}
              </div>
            </div>
            <div class="filter-group">
              <h4>Price Range</h4>
              <div class="price-inputs">
                <input type="number" id="minPrice" placeholder="Min" />
                <span>to</span>
                <input type="number" id="maxPrice" placeholder="Max" />
              </div>
            </div>
            <button class="btn btn-outline clear-filters-btn">Clear Filters</button>
          </aside>

          <!-- Main Products Area -->
          <div class="shop-main">
            <div class="sort-bar">
              <span class="results-count" id="resultsCount"></span>
              <select id="sortSelect">
                <option value="">Sort By</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-az">Name: A-Z</option>
              </select>
            </div>
            <div class="products-grid" id="productsGrid"></div>
          </div>
        </div>
      </div>
    </section>
  `;

  // --- DOM references ---
  const searchInput = document.getElementById('searchInput');
  const minPriceInput = document.getElementById('minPrice');
  const maxPriceInput = document.getElementById('maxPrice');
  const sortSelect = document.getElementById('sortSelect');
  const productsGrid = document.getElementById('productsGrid');
  const resultsCount = document.getElementById('resultsCount');
  const categoryCheckboxes = document.querySelectorAll('.category-filters input[type="checkbox"]');
  const clearFiltersBtn = document.querySelector('.clear-filters-btn');

  /**
   * Renders a list of products into the products grid.
   */
  function renderProductsGrid(products) {
    productsGrid.innerHTML = products.map(p => createProductCard(p)).join('');
  }

  /**
   * Applies all active filters, search, and sort to the product list.
   */
  function applyFilters() {
    let filtered = [...allProducts];

    // 1. Search filter
    if (searchQuery.trim()) {
      filtered = searchProducts(searchQuery);
    }

    // 2. Category filter
    if (selectedCategories.length > 0) {
      // Apply category filter to each selected category and merge results
      let categoryFiltered = [];
      selectedCategories.forEach(cat => {
        categoryFiltered = categoryFiltered.concat(filterByCategory(cat));
      });
      // Intersect with current filtered results
      const categoryIds = new Set(categoryFiltered.map(p => p.id));
      filtered = filtered.filter(p => categoryIds.has(p.id));
    }

    // 3. Price range filter
    if (minPrice !== null || maxPrice !== null) {
      const priceFiltered = filterByPrice(
        minPrice !== null ? minPrice : 0,
        maxPrice !== null ? maxPrice : Infinity
      );
      const priceIds = new Set(priceFiltered.map(p => p.id));
      filtered = filtered.filter(p => priceIds.has(p.id));
    }

    // 4. Sort
    if (currentSort) {
      filtered = sortProducts(filtered, currentSort);
    }

    // 5. Update results count
    resultsCount.textContent = `${filtered.length} product${filtered.length !== 1 ? 's' : ''} found`;

    // 6. Render products or show empty state
    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div class="empty-state">
          <span class="empty-state-icon">🔍</span>
          <h2>No products found</h2>
          <p>Try adjusting your filters</p>
        </div>
      `;
    } else {
      renderProductsGrid(filtered);
    }
  }

  // --- Event Listeners ---

  // Search input
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    applyFilters();
  });

  // Category checkboxes
  categoryCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      selectedCategories = Array.from(categoryCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
      applyFilters();
    });
  });

  // Price range inputs
  minPriceInput.addEventListener('input', (e) => {
    minPrice = e.target.value ? parseFloat(e.target.value) : null;
    applyFilters();
  });

  maxPriceInput.addEventListener('input', (e) => {
    maxPrice = e.target.value ? parseFloat(e.target.value) : null;
    applyFilters();
  });

  // Sort select
  sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    applyFilters();
  });

  // Clear all filters
  clearFiltersBtn.addEventListener('click', () => {
    searchQuery = '';
    selectedCategories = [];
    minPrice = null;
    maxPrice = null;
    currentSort = '';

    // Reset input elements
    searchInput.value = '';
    minPriceInput.value = '';
    maxPriceInput.value = '';
    sortSelect.value = '';
    categoryCheckboxes.forEach(cb => (cb.checked = false));

    applyFilters();
  });

  // Event delegation for product card actions (cart + wishlist)
  productsGrid.addEventListener('click', (e) => {
    // Add to cart
    const cartBtn = e.target.closest('.add-to-cart-btn');
    if (cartBtn) {
      const id = parseInt(cartBtn.dataset.id);
      addToCart(id);
      showToast('Added to cart!');
      updateCartBadge();
      return;
    }

    // Wishlist toggle
    const wishlistBtn = e.target.closest('.wishlist-btn');
    if (wishlistBtn) {
      const id = parseInt(wishlistBtn.dataset.id);
      toggleWishlist(id);

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

  // Initial render with any pre-selected filters
  applyFilters();
}
