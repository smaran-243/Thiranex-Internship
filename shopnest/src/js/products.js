/**
 * products.js
 * -----------
 * Product data and filtering / sorting module.
 *
 * Products are fetched once from a static JSON file, cached internally,
 * and all query functions operate on the cached array so callers don't
 * need to pass the products list around.
 */

/** @type {Object[]} Internal product cache, populated by loadProducts() */
let productsCache = [];

/**
 * Fetch the product catalogue from the local JSON file.
 * Subsequent calls return the cached copy unless the cache is empty.
 * @returns {Promise<Object[]>} Array of product objects.
 */
export const loadProducts = async () => {
  // Return cached data if we already have it
  if (productsCache.length > 0) return productsCache;

  try {
    const response = await fetch('/src/data/products.json');

    if (!response.ok) {
      throw new Error(`Failed to fetch products (HTTP ${response.status})`);
    }

    productsCache = await response.json();
    return productsCache;
  } catch (error) {
    console.error('Error loading products:', error);
    return []; // Return an empty array so the rest of the app doesn't break
  }
};

/**
 * Find a single product by its numeric ID.
 * Can be called with (products, id) for the spec API, or with just (id)
 * to use the internal cache.
 *
 * @param {Object[]|number|string} productsOrId - The product list *or* the ID when using cached data.
 * @param {number|string}          [id]         - The ID to search for (when products list is passed).
 * @returns {Object|undefined} The matching product, or undefined.
 */
export const getProductById = (productsOrId, id) => {
  // Support both calling conventions:
  //   getProductById(id)            → uses cache
  //   getProductById(products, id)  → uses provided array
  let products, targetId;
  if (id !== undefined) {
    products = productsOrId;
    targetId = id;
  } else {
    products = productsCache;
    targetId = productsOrId;
  }
  return products.find((product) => product.id === Number(targetId));
};

/**
 * Search products by title (case-insensitive substring match).
 * Can be called with (products, query) or just (query) to use cached data.
 *
 * @param {Object[]|string} productsOrQuery - Product list *or* search query.
 * @param {string}          [query]         - The search query (when products list is passed).
 * @returns {Object[]} Filtered array of matching products.
 */
export const searchProducts = (productsOrQuery, query) => {
  let products, searchQuery;
  if (query !== undefined) {
    products = productsOrQuery;
    searchQuery = query;
  } else {
    products = productsCache;
    searchQuery = productsOrQuery;
  }

  if (!searchQuery || !String(searchQuery).trim()) return [...products];

  const lowerQuery = String(searchQuery).toLowerCase().trim();
  return products.filter((product) =>
    product.title.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Filter products by category.
 * Supports multiple calling conventions:
 *   filterByCategory(products, categories) → spec API (array of categories)
 *   filterByCategory(categories)           → uses cache (array)
 *   filterByCategory(category)             → uses cache (single string)
 *
 * @param {Object[]|string[]|string} productsOrCategories
 * @param {string[]|string}          [categories]
 * @returns {Object[]} Filtered array.
 */
export const filterByCategory = (productsOrCategories, categories) => {
  let products, cats;

  if (categories !== undefined) {
    products = productsOrCategories;
    cats = categories;
  } else {
    products = productsCache;
    cats = productsOrCategories;
  }

  // Normalise cats to an array
  if (typeof cats === 'string') cats = [cats];
  if (!cats || cats.length === 0) return [...products];

  const lowerCats = cats.map((c) => c.toLowerCase());
  return products.filter((product) =>
    lowerCats.includes(product.category.toLowerCase())
  );
};

/**
 * Filter products by a price range.
 * Supports:
 *   filterByPrice(products, min, max)
 *   filterByPrice(min, max) → uses cache
 *
 * @param {Object[]|number|null} productsOrMin
 * @param {number|null}          minOrMax
 * @param {number|null}          [max]
 * @returns {Object[]} Filtered array.
 */
export const filterByPrice = (productsOrMin, minOrMax, max) => {
  let products, minVal, maxVal;

  if (max !== undefined) {
    // Three-arg call: (products, min, max)
    products = productsOrMin;
    minVal = minOrMax;
    maxVal = max;
  } else {
    // Two-arg call: (min, max) → use cache
    products = productsCache;
    minVal = productsOrMin;
    maxVal = minOrMax;
  }

  return products.filter((product) => {
    const aboveMin = minVal == null || product.price >= minVal;
    const belowMax = maxVal == null || product.price <= maxVal;
    return aboveMin && belowMax;
  });
};

/**
 * Sort products by the given strategy.
 * Always returns a **new** array—never mutates the original.
 *
 * @param {Object[]} products - The product list.
 * @param {string}   sortBy   - One of 'price-low', 'price-high', 'name-az'.
 * @returns {Object[]} A newly sorted array.
 */
export const sortProducts = (products, sortBy) => {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-low':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'name-az':
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      break;
  }

  return sorted;
};

/**
 * Extract a unique list of category names.
 * Can be called with (products) or () to use the cache.
 *
 * @param {Object[]} [products] - Optional product list.
 * @returns {string[]} Unique categories.
 */
export const getCategories = (products) => {
  const list = products && Array.isArray(products) ? products : productsCache;
  const categorySet = new Set(list.map((p) => p.category));
  return [...categorySet];
};

/**
 * Get the top 8 products sorted by rating (highest first).
 * Can be called with (products) or () to use the cache.
 *
 * @param {Object[]} [products] - Optional product list.
 * @returns {Object[]} Up to 8 featured products.
 */
export const getFeaturedProducts = (products) => {
  const list = products && Array.isArray(products) ? products : productsCache;
  return [...list]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);
};
