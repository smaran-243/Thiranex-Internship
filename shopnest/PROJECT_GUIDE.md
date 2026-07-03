# ShopNest – E-Commerce Product Catalog: Complete Project Guide

> **A comprehensive guide covering every aspect of the ShopNest project for study, presentation, and viva preparation.**

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Problem Statement](#2-problem-statement)
3. [Objectives](#3-objectives)
4. [Scope of the Project](#4-scope-of-the-project)
5. [Features List](#5-features-list)
6. [Pages Description](#6-pages-description)
7. [Module-wise Explanation](#7-module-wise-explanation)
8. [Folder Structure Explanation](#8-folder-structure-explanation)
9. [Data Flow / Working Flow](#9-data-flow--working-flow)
10. [localStorage Usage](#10-localstorage-usage)
11. [Form Validation Logic](#11-form-validation-logic)
12. [Responsive Design Explanation](#12-responsive-design-explanation)
13. [Accessibility & Semantic HTML](#13-accessibility--semantic-html)
14. [Technologies Used](#14-technologies-used)
15. [How to Run the Project](#15-how-to-run-the-project)
16. [How to Explain This Project in Viva](#16-how-to-explain-this-project-in-viva)
17. [Likely Viva Questions with Answers](#17-likely-viva-questions-with-answers)
18. [Future Enhancements](#18-future-enhancements)

---

## 1. Project Overview

| Field | Details |
|---|---|
| **Project Title** | ShopNest – E-Commerce Product Catalog |
| **Project Type** | Frontend Web Development Capstone Project |
| **Category** | E-Commerce / Product Catalog |
| **Tech Stack** | HTML5, CSS3, Vanilla JavaScript (ES6), Vite, localStorage |

### Short Description

ShopNest is a frontend-only e-commerce product catalog website for home decor and furniture products. Users can browse products, search and filter them, view detailed product information, manage a shopping cart and wishlist, and use a simple login/signup system. All user data (cart, wishlist, authentication) is persisted using the browser's localStorage API.

### Purpose

The purpose of this project is to demonstrate practical frontend web development skills including:

- Building a multi-page single-page application (SPA) using vanilla JavaScript
- Implementing DOM manipulation for dynamic content rendering
- Using localStorage for client-side state persistence
- Creating a responsive design that works across devices
- Writing clean, modular, and maintainable code
- Applying HTML5 semantic structure and accessibility basics

This project serves as a capstone demonstration for a web development internship, showcasing real-world applicable frontend skills.

---

## 2. Problem Statement

### The Problem

In today's digital world, consumers expect to browse products online before making purchase decisions. However, building a fully functional e-commerce experience requires understanding of many frontend concepts including dynamic content rendering, state management, responsive design, and user interaction handling.

### Why This Project is Useful

ShopNest addresses the need for a **practical, comprehensive frontend project** that demonstrates:

1. **Real-world applicability** – E-commerce is one of the most common web application types, making this project highly relevant to employers
2. **Core frontend skills** – The project exercises all fundamental frontend technologies (HTML, CSS, JavaScript) in a practical context
3. **State management without a backend** – By using localStorage, the project shows how to manage application state entirely on the client side
4. **User experience fundamentals** – Search, filter, sort, cart management, and form validation are UX patterns found in virtually every web application

The project simulates the frontend layer of a real e-commerce platform, giving practical experience that directly translates to professional web development work.

---

## 3. Objectives

The main objectives of this project are:

1. **Build a functional multi-page SPA** using vanilla JavaScript with hash-based routing
2. **Implement dynamic product rendering** from a local JSON data source
3. **Create a complete product browsing experience** with search, category filtering, price filtering, and sorting
4. **Develop a shopping cart system** with add, remove, quantity management, and total calculation using localStorage
5. **Implement a wishlist feature** with add, remove, and move-to-cart functionality using localStorage
6. **Build a client-side authentication system** (login/signup/logout) with form validation and localStorage persistence
7. **Design a responsive user interface** that works on mobile, tablet, and desktop screen sizes
8. **Follow HTML5 semantic standards** and basic accessibility practices
9. **Organize code in a modular, maintainable structure** using ES6 modules
10. **Use Vite as a modern build tool** for efficient development workflow

---

## 4. Scope of the Project

### What the Project Includes

| Feature Area | Included |
|---|---|
| Product catalog display | ✅ |
| Product search by name | ✅ |
| Category-based filtering | ✅ |
| Price range filtering | ✅ |
| Product sorting (price, name) | ✅ |
| Product detail view | ✅ |
| Shopping cart (CRUD operations) | ✅ |
| Wishlist management | ✅ |
| Client-side login/signup | ✅ |
| Form validation | ✅ |
| localStorage persistence | ✅ |
| Responsive design | ✅ |
| Semantic HTML & accessibility | ✅ |
| Contact form with validation | ✅ |
| Empty state handling | ✅ |
| Toast notifications | ✅ |

### What the Project Does NOT Include

| Feature Area | Not Included (Future Scope) |
|---|---|
| Payment gateway / checkout | ❌ |
| Order placement & tracking | ❌ |
| Backend server / API | ❌ |
| Database integration | ❌ |
| Admin dashboard | ❌ |
| Email verification / OTP | ❌ |
| JWT authentication | ❌ |
| User profile management | ❌ |
| Product reviews & ratings submission | ❌ |
| Analytics dashboard | ❌ |
| AI-powered recommendations | ❌ |
| Dark/light theme toggle | ❌ |
| Real image uploads | ❌ |

---

## 5. Features List

### Core Features

1. **Product Catalog** – Display 16 home decor & furniture products loaded from a local JSON file
2. **Product Cards** – Each product displays image, title, category, price, rating, and action buttons
3. **Product Detail Page** – Full product information with quantity selector
4. **Search** – Real-time product search by title
5. **Category Filter** – Filter products by category (Living Room, Bedroom, Kitchen, Office, Outdoor)
6. **Price Filter** – Filter products by minimum and maximum price
7. **Sorting** – Sort products by price (low to high, high to low) or name (A-Z)
8. **Shopping Cart** – Add to cart, remove, adjust quantity, view total, clear cart
9. **Wishlist** – Add/remove products, move items from wishlist to cart
10. **Authentication** – Sign up, log in, log out with form validation
11. **Contact Form** – Validated contact form with user feedback

### UI/UX Features

12. **Responsive Design** – Mobile, tablet, and desktop layouts
13. **Toast Notifications** – Success/error notifications for user actions
14. **Empty States** – Helpful messages when cart, wishlist, or search results are empty
15. **Stock Status** – Shows in-stock/out-of-stock status on product detail page
16. **Cart Badge** – Shows item count on the cart icon in the navigation bar
17. **Navigation** – Persistent navbar with hamburger menu for mobile
18. **Featured Products** – Home page highlights top-rated products
19. **Category Browsing** – Click category cards on home page to filter shop

### Technical Features

20. **Hash-based Routing** – Single page application with URL-based navigation
21. **ES6 Modules** – Clean, modular code organization
22. **localStorage Persistence** – Cart, wishlist, and user data persist across browser sessions
23. **Semantic HTML** – Proper use of header, nav, main, section, article, footer tags
24. **Accessibility** – ARIA labels, alt text, keyboard-friendly controls
25. **CSS Grid & Flexbox** – Modern CSS layout techniques
26. **Event Delegation** – Efficient event handling for dynamic content

---

## 6. Pages Description

### 6.1 Home Page

The home page is the landing page of ShopNest. It introduces the brand and showcases key products and categories.

**Sections:**

| Section | Description |
|---|---|
| **Hero** | Full-width banner with gradient background, welcome message, subtitle, and "Shop Now" CTA button |
| **Shop by Category** | Grid of 5 category cards (Living Room, Bedroom, Kitchen, Office, Outdoor) with emoji icons. Clicking a card navigates to the Shop page filtered by that category |
| **Trending Products** | Grid of 8 top-rated products displayed as product cards with Add to Cart, Wishlist, and View Details buttons |
| **Why Choose ShopNest** | 4 feature cards highlighting Free Shipping, Quality Products, Easy Returns, and 24/7 Support |

**Key Interactions:**
- Click "Shop Now" → navigates to Shop page
- Click category card → navigates to Shop page with that category pre-selected
- Click "Add to Cart" → adds product to cart, shows toast notification
- Click wishlist heart → toggles product in wishlist
- Click "View Details" → navigates to product detail page

---

### 6.2 Shop / Products Page

The main product browsing page with full search, filter, and sort capabilities.

**Layout:** Sidebar (filters) + Main content (products grid)

**Sidebar Filters:**
- Category checkboxes (one for each of the 5 categories)
- Price range inputs (min and max)
- Clear Filters button

**Main Area:**
- Search bar at the top
- Sort dropdown (Price Low-High, Price High-Low, Name A-Z)
- Results count display
- Products grid with product cards
- "No products found" empty state when filters return no results

**Key Interactions:**
- Type in search bar → filters products in real-time
- Check/uncheck categories → filters products by category
- Enter min/max prices → filters by price range
- Select sort option → re-orders products
- Clear Filters → resets all filters
- All product card interactions (cart, wishlist, view details)

---

### 6.3 Product Details Page

A detailed view of a single product, accessed by clicking "View Details" on any product card.

**Layout:** Two columns — product image on the left, product information on the right

**Information Displayed:**
- Large product image
- Category tag
- Product title
- Star rating with numeric value
- Price (prominently displayed)
- Stock status (green "In Stock" or red "Out of Stock" badge)
- Short description
- Long/detailed description
- Quantity selector (- / + buttons with value display)

**Key Interactions:**
- Decrease/increase quantity (respects min 1 and max stock limits)
- "Add to Cart" button → adds selected quantity to cart (disabled if out of stock)
- "Add to Wishlist" button → toggles product in wishlist
- "← Back to Shop" link → returns to shop page

---

### 6.4 Cart Page

Displays all items the user has added to their shopping cart.

**If Cart is Empty:**
- Cart emoji icon
- "Your cart is empty" message
- "Continue Shopping" button linking to Shop page

**If Cart Has Items:**

| Element | Description |
|---|---|
| Cart item rows | Each shows product image, title (links to detail), unit price, quantity controls, item total, and remove button |
| Quantity controls | - / + buttons to adjust per-item quantity |
| Order Summary | Shows subtotal and total amounts |
| Clear Cart | Button to empty the entire cart (with confirmation dialog) |
| Continue Shopping | Link back to Shop page |

**Key Interactions:**
- Adjust quantity → updates item total and cart total
- Remove item → removes from cart, shows toast
- Clear Cart → confirmation dialog, then empties cart

---

### 6.5 Wishlist Page

Displays products the user has saved to their wishlist.

**If Wishlist is Empty:**
- Heart emoji icon
- "Your wishlist is empty" message
- "Browse Products" button linking to Shop page

**If Wishlist Has Items:**
- Grid of wishlist items showing product image, title, price
- "Move to Cart" button → adds to cart and removes from wishlist
- "Remove" button → removes from wishlist

---

### 6.6 Login / Signup Page

A client-side authentication page using localStorage.

**If Already Logged In:**
- Welcome message with user's name
- Email display
- Logout button

**If Not Logged In:**
- Tab switch between Login and Signup forms

**Login Form Fields:**
- Email (required, valid format)
- Password (required)
- Login button

**Signup Form Fields:**
- Full Name (required, min 2 characters)
- Email (required, valid format)
- Password (required, min 6 characters)
- Confirm Password (must match password)
- Sign Up button

**Validation:** Inline error messages shown below each field in red text.

**Key Interactions:**
- Switch between Login/Signup tabs
- Submit login → validates, authenticates, redirects to home on success
- Submit signup → validates, creates account, switches to login tab
- Logout → clears session, updates navbar

---

### 6.7 Contact Page

A contact form for users to send messages.

**Layout:** Two columns — form on the left, contact information on the right

**Form Fields:**
- Name (required, min 2 characters)
- Email (required, valid format)
- Subject (required)
- Message (required, min 10 characters)
- Send Message button

**Contact Information:**
- Address: 123 Home Street, Design City, DC 10001
- Email: support@shopnest.com
- Phone: +1 (555) 123-4567
- Business Hours: Mon-Fri 9AM-6PM, Sat-Sun 10AM-4PM

**Validation:** Inline error messages. On success, shows toast notification and clears the form.

---

## 7. Module-wise Explanation

### 7.1 Product Rendering Module (`products.js`)

**Purpose:** Handles loading product data and providing search, filter, and sort functions.

**Key Functions:**

| Function | What it Does |
|---|---|
| `loadProducts()` | Fetches product data from `products.json` using the Fetch API. Returns an array of product objects. |
| `getProductById(products, id)` | Finds and returns a single product by its ID from the products array. |
| `searchProducts(products, query)` | Filters products where the title includes the search query (case-insensitive). |
| `filterByCategory(products, categories)` | Returns products matching any of the selected category strings. Returns all if categories array is empty. |
| `filterByPrice(products, min, max)` | Returns products within the specified price range. Handles null min/max gracefully. |
| `sortProducts(products, sortBy)` | Returns a new sorted array. Supports 'price-low', 'price-high', and 'name-az'. |
| `getCategories(products)` | Extracts and returns unique category names from all products. |
| `getFeaturedProducts(products)` | Returns top 8 products sorted by highest rating. |

**How Products Are Loaded:**
```
User visits page → render function calls loadProducts()
→ loadProducts() uses fetch() to get products.json
→ JSON is parsed into JavaScript array
→ Array is used to render product cards on the page
```

---

### 7.2 Search / Filter / Sort Module

This functionality is implemented within the Shop page (`pages/shop.js`) using functions from `products.js`.

**How It Works:**

1. When the Shop page loads, all products are stored in an `allProducts` variable
2. The page maintains filter state variables: `searchQuery`, `selectedCategories`, `minPrice`, `maxPrice`, `currentSort`
3. When any filter changes, the `applyFilters()` function is called
4. `applyFilters()` applies all active filters in sequence:
   ```
   allProducts → search filter → category filter → price filter → sort → display
   ```
5. The filtered results are rendered into the products grid
6. The results count is updated

**Filter Pipeline:**
```
Start with all products
  ↓ If search query exists → searchProducts(products, query)
  ↓ If categories selected → filterByCategory(products, categories)
  ↓ If price range set → filterByPrice(products, min, max)
  ↓ If sort selected → sortProducts(products, sortBy)
  ↓ Render filtered products to grid
```

---

### 7.3 Cart Module (`cart.js`)

**Purpose:** Manages the shopping cart state using localStorage.

**Data Structure:** The cart is stored as an array of objects: `[{ productId: 1, quantity: 2 }, ...]`

**Key Functions:**

| Function | What it Does |
|---|---|
| `getCart()` | Reads cart array from localStorage |
| `addToCart(productId, quantity)` | Adds a new item or increases quantity of existing item |
| `removeFromCart(productId)` | Removes an item completely from the cart |
| `updateQuantity(productId, quantity)` | Sets specific quantity; removes item if quantity ≤ 0 |
| `getCartCount()` | Returns total item count (sum of all quantities) |
| `getCartTotal(products)` | Calculates total price using product prices × quantities |
| `clearCart()` | Empties the entire cart |
| `isInCart(productId)` | Checks if a product is already in the cart |

**Cart Flow:**
```
User clicks "Add to Cart"
  → addToCart(productId) is called
  → Gets current cart from localStorage
  → Checks if item already exists
  → If exists: increases quantity
  → If new: adds {productId, quantity: 1}
  → Saves updated cart to localStorage
  → Shows toast notification
  → Updates cart badge count in navbar
```

---

### 7.4 Wishlist Module (`wishlist.js`)

**Purpose:** Manages the wishlist using localStorage.

**Data Structure:** The wishlist is stored as an array of product IDs: `[1, 5, 12]`

**Key Functions:**

| Function | What it Does |
|---|---|
| `getWishlist()` | Reads wishlist array from localStorage |
| `addToWishlist(productId)` | Adds product ID if not already present |
| `removeFromWishlist(productId)` | Removes product ID from the array |
| `toggleWishlist(productId)` | Adds if not present, removes if present. Returns true if added, false if removed |
| `isInWishlist(productId)` | Returns boolean indicating if product is in wishlist |

**Wishlist Flow:**
```
User clicks wishlist heart button
  → toggleWishlist(productId) is called
  → If product is in wishlist → removes it → returns false
  → If product is not in wishlist → adds it → returns true
  → Heart icon updates (♡ ↔ ♥)
  → Shows toast notification
```

---

### 7.5 Authentication Module (`auth.js`)

**Purpose:** Provides client-side login, signup, and logout functionality using localStorage.

**Data Structures:**
- Users array: `[{ name, email, password }, ...]` stored under `shopnest_users`
- Current user: `{ name, email }` stored under `shopnest_currentUser`

**Key Functions:**

| Function | What it Does |
|---|---|
| `signup(name, email, password)` | Creates new user if email doesn't exist. Returns {success, message} |
| `login(email, password)` | Verifies credentials, sets currentUser. Returns {success, message, user} |
| `logout()` | Removes currentUser from localStorage |
| `getCurrentUser()` | Returns current user object or null |
| `isLoggedIn()` | Returns boolean |
| `validateEmail(email)` | Validates email format using regex |
| `validatePassword(password)` | Checks if password is at least 6 characters |
| `validateName(name)` | Checks if name is at least 2 characters |

**Login Flow:**
```
User enters email + password → clicks Login
  → validateEmail() and validatePassword() check inputs
  → If invalid → show inline error messages
  → If valid → login(email, password) is called
  → Searches users array for matching email + password
  → If found → saves currentUser to localStorage → shows success toast → redirects to home
  → If not found → shows error toast "Invalid email or password"
```

**Signup Flow:**
```
User fills all fields → clicks Sign Up
  → All validations run (name, email, password, confirm)
  → If any fail → show inline errors
  → If all pass → signup(name, email, password) is called
  → Checks if email already exists
  → If exists → returns error
  → If new → adds user to users array → saves to localStorage → switches to login tab
```

> **Important Note:** This is client-side only authentication for demonstration purposes. Passwords are stored in plain text in localStorage. A real application would use a backend server with password hashing and secure session management.

---

### 7.6 Storage / localStorage Module (`storage.js`)

**Purpose:** Provides a clean wrapper around the browser's localStorage API with JSON serialization.

**Key Functions:**

| Function | What it Does |
|---|---|
| `getFromStorage(key)` | Gets a value from localStorage and parses it from JSON. Returns null if key doesn't exist or parsing fails |
| `saveToStorage(key, data)` | Serializes data to JSON and saves it to localStorage |
| `removeFromStorage(key)` | Removes a key-value pair from localStorage |

**Why a Wrapper?**
- localStorage only stores strings, so we need JSON.stringify/parse
- Centralized error handling for JSON parsing failures
- All other modules use this instead of calling localStorage directly
- Makes the code cleaner and easier to maintain

---

### 7.7 UI Interactions Module (`ui.js`)

**Purpose:** Provides shared UI utility functions used across all pages.

**Key Functions:**

| Function | What it Does |
|---|---|
| `showToast(message, type)` | Creates and displays a toast notification (success or error) that auto-dismisses after 3 seconds |
| `createStarRating(rating)` | Generates HTML string for star rating display (★ for filled, ☆ for empty) |
| `formatPrice(price)` | Formats a number as a dollar price string (e.g., "$29.99") |
| `updateCartBadge()` | Updates the cart count badge number in the navbar |
| `updateNavAuth()` | Updates the navbar to show user name (if logged in) or login link (if not) |
| `scrollToTop()` | Smoothly scrolls the page to the top |

---

### 7.8 Router Module (`router.js`)

**Purpose:** Implements hash-based SPA routing to navigate between pages without full page reloads.

**How It Works:**

1. The router listens for the browser's `hashchange` event
2. When the URL hash changes (e.g., from `#home` to `#shop`), the router reads the new hash
3. Based on the hash, it calls the appropriate page render function
4. The render function generates HTML and inserts it into the `<main id="app">` element

**Route Map:**

| URL Hash | Page Rendered |
|---|---|
| `#home` or empty | Home page |
| `#shop` | Shop/Products page |
| `#product/{id}` | Product detail page (e.g., `#product/5`) |
| `#cart` | Shopping cart page |
| `#wishlist` | Wishlist page |
| `#auth` | Login/Signup page |
| `#contact` | Contact page |

---

## 8. Folder Structure Explanation

```
shopnest/
├── index.html                 # Entry HTML file - contains root div and script tag
├── package.json               # npm project config, scripts, dependencies
├── README.md                  # Quick project overview and setup instructions
├── PROJECT_GUIDE.md           # This comprehensive guide
│
├── public/                    # Static assets served as-is
│   └── images/                # Placeholder for product images
│
└── src/                       # All source code
    ├── main.js                # App entry point - creates app shell, initializes router
    │
    ├── data/
    │   └── products.json      # Product data (16 items with all details)
    │
    ├── styles/
    │   └── main.css           # All CSS styles (variables, components, responsive)
    │
    ├── js/                    # JavaScript modules (business logic)
    │   ├── storage.js         # localStorage wrapper (get, save, remove)
    │   ├── cart.js            # Cart operations (add, remove, update, total)
    │   ├── wishlist.js        # Wishlist operations (add, remove, toggle)
    │   ├── auth.js            # Auth operations (login, signup, logout, validate)
    │   ├── products.js        # Product data loading, search, filter, sort
    │   ├── ui.js              # UI utilities (toast, stars, badge, format)
    │   └── router.js          # Hash-based page routing
    │
    └── pages/                 # Page render modules (UI components)
        ├── home.js            # Home page renderer
        ├── shop.js            # Shop page with filters
        ├── product.js         # Product detail page
        ├── cart.js            # Cart page
        ├── wishlist.js        # Wishlist page
        ├── auth.js            # Login/Signup page
        └── contact.js         # Contact page
```

### Purpose of Each Folder

| Folder | Purpose |
|---|---|
| `public/` | Static files that are served directly without processing |
| `src/` | All source code processed by Vite during build |
| `src/data/` | JSON data files (product catalog) |
| `src/styles/` | CSS stylesheets |
| `src/js/` | JavaScript business logic modules (non-UI) |
| `src/pages/` | Page rendering modules (UI generation + event handling) |

### Separation of Concerns

The `js/` folder contains **logic** (how data is managed), while the `pages/` folder contains **presentation** (how pages look and behave). This separation makes the code:
- Easier to understand and explain
- Easier to maintain and debug
- Easier to test individual modules
- A good practice for any size project

---

## 9. Data Flow / Working Flow

### 9.1 How Product Data is Loaded

```
Application starts
  → main.js runs on DOMContentLoaded
  → Creates app shell (navbar, main container, footer)
  → Initializes router
  → Router reads current URL hash
  → Calls appropriate page render function
  → Page render function calls loadProducts()
  → loadProducts() uses fetch('/src/data/products.json')
  → JSON response is parsed into JavaScript array
  → Products array is used to generate HTML product cards
  → HTML is inserted into <main id="app"> via innerHTML
```

### 9.2 How Products are Rendered

```
products array received
  → For each product, createProductCard(product) is called
  → Function generates HTML string using template literal
  → HTML includes: image, title, category tag, rating stars, price, action buttons
  → All card HTML strings are joined together
  → Combined HTML is set as innerHTML of the products grid container
  → Event delegation is set up on the grid container for button clicks
```

### 9.3 What Happens When User Adds to Cart

```
User clicks "Add to Cart" button on a product card
  → Event delegation catches the click
  → Product ID is extracted from button's data-id attribute
  → addToCart(productId) is called from cart.js
  → cart.js gets current cart from localStorage via storage.js
  → Checks if product already exists in cart array
  → If yes: increases quantity by 1
  → If no: adds new entry {productId, quantity: 1}
  → Updated cart array is saved to localStorage
  → showToast('Added to cart!') displays success notification
  → updateCartBadge() updates the cart count in navbar
```

### 9.4 What Happens When User Logs In

```
User fills email and password → clicks Login
  → Form submit event is intercepted (preventDefault)
  → Input values are extracted
  → validateEmail() checks email format
  → If invalid: showFieldError() shows red error below input
  → If valid: login(email, password) is called
  → login() reads users array from localStorage
  → Searches for matching email AND password
  → If match found:
    → Saves {name, email} as currentUser in localStorage
    → Returns {success: true, message: 'Login successful', user}
    → showToast('Login successful!')
    → navigateTo('#home') redirects to home page
    → updateNavAuth() shows user name in navbar
  → If no match:
    → Returns {success: false, message: 'Invalid email or password'}
    → showToast('Invalid email or password', 'error')
```

### 9.5 How Wishlist Works

```
User clicks heart button (♡) on a product card
  → toggleWishlist(productId) is called
  → Gets current wishlist array from localStorage
  → If productId is in array:
    → Removes it (filter out)
    → Saves updated array
    → Returns false (removed)
    → Heart changes to ♡ (empty)
    → Toast: "Removed from wishlist"
  → If productId is NOT in array:
    → Adds it (push)
    → Saves updated array
    → Returns true (added)
    → Heart changes to ♥ (filled)
    → Toast: "Added to wishlist!"
```

### 9.6 How localStorage is Updated

Every state-changing operation follows this pattern:

```
Action triggered (e.g., add to cart)
  → Module function called (e.g., addToCart())
  → getFromStorage('shopnest_cart') reads current data
  → Data is modified in memory (JavaScript array/object)
  → saveToStorage('shopnest_cart', updatedData) writes back
  → UI is updated to reflect new state
```

---

## 10. localStorage Usage

### Storage Keys

| Key | Data Type | Contents |
|---|---|---|
| `shopnest_cart` | Array of Objects | `[{ productId: 1, quantity: 2 }, { productId: 5, quantity: 1 }]` |
| `shopnest_wishlist` | Array of Numbers | `[3, 7, 12]` (product IDs) |
| `shopnest_users` | Array of Objects | `[{ name: "John", email: "john@email.com", password: "123456" }]` |
| `shopnest_currentUser` | Object or null | `{ name: "John", email: "john@email.com" }` |

### How Persistence Works

1. **On every state change**, the updated data is immediately saved to localStorage using `saveToStorage()`
2. **On every page load**, data is read from localStorage using `getFromStorage()`
3. **Data survives page refresh** — because localStorage persists even when the browser tab is closed
4. **Data is browser-specific** — each browser/device has its own localStorage

### Example: Cart Persistence

```javascript
// When adding to cart:
const cart = getFromStorage('shopnest_cart') || [];  // Read current cart
cart.push({ productId: 5, quantity: 1 });            // Modify in memory
saveToStorage('shopnest_cart', cart);                 // Save back

// Internally, saveToStorage does:
localStorage.setItem('shopnest_cart', JSON.stringify(cart));

// When reading cart on next visit:
const cart = getFromStorage('shopnest_cart');         // Returns parsed array

// Internally, getFromStorage does:
JSON.parse(localStorage.getItem('shopnest_cart'));
```

---

## 11. Form Validation Logic

### Login Form

| Field | Validation Rule | Error Message |
|---|---|---|
| Email | Must be a valid email format (regex) | "Please enter a valid email" |
| Password | Must not be empty | "Password is required" |

### Signup Form

| Field | Validation Rule | Error Message |
|---|---|---|
| Full Name | Minimum 2 characters | "Name must be at least 2 characters" |
| Email | Valid email format | "Please enter a valid email" |
| Password | Minimum 6 characters | "Password must be at least 6 characters" |
| Confirm Password | Must match password | "Passwords do not match" |

Additionally, during signup, the system checks if the email is already registered and returns an error if it is.

### Contact Form

| Field | Validation Rule | Error Message |
|---|---|---|
| Name | Minimum 2 characters | "Name must be at least 2 characters" |
| Email | Valid email format | "Please enter a valid email" |
| Subject | Must not be empty | "Subject is required" |
| Message | Minimum 10 characters | "Message must be at least 10 characters" |

### How Validation Errors are Displayed

1. Each form field is wrapped in a `.form-group` div
2. Each group contains a hidden `.error-message` span
3. When validation fails:
   - The `.form-group` gets an `error` class added
   - The `.error-message` text is set to the error message
   - CSS makes the error visible and colors the input border red
4. When the user re-submits, all previous errors are cleared first

### Email Validation Regex

```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

This checks that the email:
- Has characters before the @ symbol
- Has an @ symbol
- Has characters after @ and before the dot
- Has a dot followed by more characters
- Has no spaces

---

## 12. Responsive Design Explanation

### Breakpoints Used

| Breakpoint | Target Devices | Layout Changes |
|---|---|---|
| Above 1024px | Desktop | Full layout, 4-column product grid, sidebar visible |
| 768px – 1024px | Tablet | 3-column product grid, 2-column footer |
| Below 768px | Mobile | 1-2 column grid, hamburger menu, stacked layouts |
| Below 480px | Small Mobile | Single column everywhere, adjusted fonts |

### Key Responsive Changes

**Navigation:**
- Desktop: Horizontal nav links visible
- Mobile: Hamburger menu button appears, nav links hidden in a dropdown that slides in when toggled

**Product Grid:**
- Desktop: 4 columns (CSS Grid)
- Tablet: 2-3 columns
- Mobile: 1-2 columns
- Small mobile: 1 column

**Shop Page:**
- Desktop: Sidebar (260px) + main content side-by-side (Flexbox)
- Mobile: Sidebar stacks above the products grid (flex-direction: column)

**Product Detail:**
- Desktop: Two columns — image left, info right (CSS Grid)
- Mobile: Single column — image on top, info below

**Cart:**
- Desktop: Cart items list + summary sidebar (CSS Grid)
- Mobile: Summary moves below cart items list

**Contact Page:**
- Desktop: Form + contact info side-by-side
- Mobile: Stacked vertically

### CSS Techniques Used

```css
/* CSS Grid for product layouts */
.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

/* Flexbox for navbar */
.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Media queries for responsiveness */
@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

---

## 13. Accessibility & Semantic HTML

### Semantic HTML Tags Used

| Tag | Where Used | Purpose |
|---|---|---|
| `<header>` | Navbar | Identifies the page header |
| `<nav>` | Navigation menu | Identifies navigation links |
| `<main>` | Page content area | Identifies the main content |
| `<section>` | Page sections | Groups related content |
| `<article>` | Product cards | Identifies self-contained content |
| `<footer>` | Page footer | Identifies the footer |
| `<form>` | Login, signup, contact | Identifies interactive forms |
| `<label>` | Form inputs | Associates labels with form controls |

### Accessibility Practices

1. **Alt text on images:** All product images have descriptive alt attributes (`alt="${product.title}"`)
2. **ARIA labels:** Navigation has `aria-label="Main navigation"`, cart icon has `aria-label="Shopping cart"`, hamburger has `aria-label="Toggle navigation menu"`, wishlist buttons have `aria-label="Toggle wishlist"`
3. **Keyboard accessibility:** All interactive elements (buttons, links, form inputs) are keyboard-focusable and operable
4. **Heading hierarchy:** Each page uses a clear h1 → h2 → h3 structure
5. **Landmark roles:** `role="banner"` on header, `role="main"` on main content, `role="contentinfo"` on footer, `role="navigation"` on nav
6. **Focus styles:** CSS includes visible focus outlines for keyboard navigation
7. **Screen reader text:** `.sr-only` class available for screen-reader-only text
8. **Form labels:** Every form input has an associated `<label>` element using the `for` attribute

---

## 14. Technologies Used

| Technology | Version/Type | Why It Was Used |
|---|---|---|
| **HTML5** | Latest | Provides semantic page structure, forms, and content organization. HTML5 elements like `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` improve accessibility and SEO. |
| **CSS3** | Latest | Used for all visual styling including layouts (Grid, Flexbox), responsive design (media queries), transitions, and CSS custom properties (variables) for maintainable color theming. |
| **Vanilla JavaScript (ES6+)** | ES2015+ | Used for all interactivity and logic. ES6 features used include modules (import/export), arrow functions, template literals, destructuring, const/let, array methods (map, filter, find, reduce). No framework was needed since the project scope is manageable with vanilla JS. |
| **Vite** | Latest | Modern build tool that provides fast development server with hot module replacement (HMR), ES module support, and optimized production builds. Much faster than webpack for development. |
| **localStorage** | Web API | Browser's built-in key-value storage used for persisting cart, wishlist, and user data. Chosen because it requires no backend setup and data persists across browser sessions. |
| **JSON** | Data format | Used for the product data file (`products.json`). JSON is the standard data interchange format for web applications, easily parsed by JavaScript's `JSON.parse()` and `fetch()` API. |

### Why Not Use a Framework (React, Vue, etc.)?

- The project scope is small enough that vanilla JavaScript handles it well
- Using vanilla JS demonstrates deeper understanding of DOM manipulation
- No framework dependency means simpler setup and smaller bundle size
- Better for learning — students understand exactly what the code does
- Appropriate for an internship-level capstone project

---

## 15. How to Run the Project

### Prerequisites

1. **Node.js** (version 16 or higher) — download from [https://nodejs.org](https://nodejs.org)
2. **npm** (comes bundled with Node.js)

### Setup Steps

```bash
# Step 1: Open terminal/command prompt in the project folder
cd shopnest

# Step 2: Install project dependencies
npm install

# Step 3: Start the development server
npm run dev
```

### After Running

- The terminal will display a local URL, typically: `http://localhost:5173`
- Open this URL in your web browser
- The ShopNest application will load with all features working

### Building for Production

```bash
# Create optimized production build
npm run build

# Preview the production build locally
npm run preview
```

The production files will be generated in the `dist/` folder, ready for deployment to any static hosting service.

---

## 16. How to Explain This Project in Viva

### How to Introduce the Project

> "My project is called ShopNest. It is a frontend e-commerce product catalog website built using HTML, CSS, and vanilla JavaScript with Vite as the build tool. The project allows users to browse home decor and furniture products, search and filter them, manage a shopping cart and wishlist, and use a simple login and signup system. All data is stored in the browser's localStorage, so there is no backend needed."

### How to Explain Each Page

**Home Page:**
> "The home page has a hero section with the brand introduction, a categories section where users can click to browse specific product types, a trending products section showing our top-rated items, and a 'Why Choose Us' section. Each product card has buttons to add to cart, add to wishlist, or view details."

**Shop Page:**
> "The shop page is the main browsing page. It has a search bar for finding products by name, category checkboxes for filtering, price range inputs, and a sort dropdown. All filters work together — for example, a user can search for 'chair', filter by 'Office' category, set a max price of $400, and sort by price low to high."

**Product Details:**
> "When a user clicks 'View Details' on any product card, they see the full product information including a large image, description, stock status, and a quantity selector. They can add the selected quantity to cart or add the item to their wishlist."

**Cart:**
> "The cart page shows all items the user has added. They can increase or decrease quantity, remove individual items, or clear the entire cart. The total price updates automatically. If the cart is empty, a friendly message is shown with a link to continue shopping."

**Wishlist:**
> "The wishlist lets users save products they're interested in. They can move items directly to the cart or remove them from the wishlist."

**Auth Page:**
> "The login/signup page uses localStorage for authentication. Users can create an account with validation on all fields, then log in. The navbar updates to show their name when logged in."

### How to Explain Cart Logic

> "The cart is stored as an array of objects in localStorage. Each object has a productId and quantity. When the user adds a product, the code checks if it already exists in the array. If yes, it increases the quantity. If no, it adds a new entry. The total price is calculated by looking up each product's price and multiplying by its quantity. Everything is saved to localStorage immediately, so the cart persists even if the user closes the browser."

### How to Explain Auth Logic

> "Authentication works by storing user accounts in a localStorage array. During signup, the system validates all fields and checks if the email already exists. During login, it finds the matching email and password in the stored users array. The current logged-in user is stored separately in localStorage so the app knows who is logged in on page refresh."

### How to Explain localStorage

> "localStorage is a browser API that stores key-value pairs as strings. We use a storage utility module that wraps localStorage with JSON.stringify and JSON.parse, since localStorage only stores strings but we need to store arrays and objects. We use four keys: shopnest_cart for the cart array, shopnest_wishlist for the wishlist, shopnest_users for registered accounts, and shopnest_currentUser for the active session."

### How to Explain Search/Filter/Sort

> "The search works by filtering the products array using JavaScript's filter() and includes() methods — it checks if the product title contains the search text, case-insensitively. Category filtering checks if a product's category is in the selected categories array. Price filtering checks if the price is between the min and max values. Sorting uses JavaScript's sort() method with different comparator functions. All these filters can work together because they are applied in sequence — each filter takes the output of the previous one."

---

## 17. Likely Viva Questions with Answers

### General Questions

**Q: What is ShopNest?**
> A: ShopNest is a frontend e-commerce product catalog website where users can browse home decor and furniture products, filter and search them, manage a shopping cart and wishlist, and use a simple login/signup system. It's built with HTML, CSS, and vanilla JavaScript.

**Q: Why did you choose this project?**
> A: E-commerce is one of the most common types of web applications. This project covers all fundamental frontend concepts — DOM manipulation, state management, responsive design, form validation, and modular code organization — making it a comprehensive demonstration of web development skills.

**Q: What technologies did you use and why?**
> A: I used HTML5 for semantic structure, CSS3 for responsive styling with Grid and Flexbox, vanilla JavaScript with ES6 modules for all interactivity, Vite as a modern build tool for fast development, and localStorage for client-side data persistence. I chose vanilla JavaScript instead of a framework to demonstrate deeper understanding of core web technologies.

### Technical Questions

**Q: What is localStorage? How is it different from sessionStorage?**
> A: localStorage is a web API that stores key-value pairs in the browser. Data persists even after the browser is closed. sessionStorage is similar but data is cleared when the browser tab is closed. localStorage can store about 5-10 MB of data per domain. Both only store strings, so we use JSON.stringify/parse for objects.

**Q: How does your routing work?**
> A: I use hash-based routing. The URL uses a # symbol followed by the page name (e.g., #shop, #cart). JavaScript listens for the 'hashchange' event. When the hash changes, the router reads it and calls the appropriate page render function, which generates HTML and inserts it into the main content area. This allows page navigation without full page reloads, creating a single-page application experience.

**Q: How do you handle form validation?**
> A: I use JavaScript to validate form inputs before processing. Each field is checked against specific rules — email is validated with a regex pattern, passwords must be at least 6 characters, names must be at least 2 characters. Error messages are shown inline below each field by adding an 'error' class to the form group, which triggers CSS to show the error message and highlight the input in red.

**Q: How does the search feature work?**
> A: When the user types in the search bar, an event listener on the input captures the text. The products array is filtered using JavaScript's filter() method with a case-insensitive includes() check on the product title. The filtered results are then rendered to the page. This happens on every keystroke for real-time search.

**Q: How does the cart calculate the total price?**
> A: The cart stores product IDs and quantities. To calculate the total, the getCartTotal() function iterates through the cart array, finds each product's price from the products data, multiplies price × quantity for each item, and sums everything up using the reduce() method.

**Q: What is the Fetch API?**
> A: The Fetch API is a modern JavaScript API for making HTTP requests. I use it to load the products.json file. It returns a Promise that resolves with the response, and we call .json() on the response to parse the JSON data. It replaces the older XMLHttpRequest approach.

**Q: What are ES6 modules?**
> A: ES6 modules let you split JavaScript code into separate files. You use 'export' to make functions available to other files and 'import' to use them. This makes code organized, reusable, and maintainable. For example, cart.js exports addToCart() and the home page imports it.

**Q: What is Vite?**
> A: Vite is a modern frontend build tool. During development, it provides a fast dev server with hot module replacement — changes appear in the browser instantly without full page reloads. For production, it bundles and optimizes the code. It's much faster than older tools like webpack.

**Q: How do you make the website responsive?**
> A: I use CSS media queries to apply different styles at different screen widths. CSS Grid handles the product grid layout (4 columns on desktop, 2 on tablet, 1 on mobile). Flexbox handles component-level layouts like the navbar and cards. The hamburger menu replaces the navigation links on mobile.

**Q: What is event delegation and why did you use it?**
> A: Event delegation is when you add a single event listener to a parent element instead of individual listeners on each child. When a button inside the parent is clicked, the event bubbles up to the parent where it's handled. I use it for product card buttons because the cards are dynamically generated — I can't add listeners to buttons that don't exist yet.

**Q: What semantic HTML tags did you use?**
> A: I used `<header>` for the navbar, `<nav>` for navigation, `<main>` for page content, `<section>` for content groups, `<article>` for product cards, `<footer>` for the page footer, `<form>` for forms, and `<label>` for form field labels. These improve accessibility for screen readers and SEO.

**Q: What is the difference between CSS Grid and Flexbox?**
> A: CSS Grid is for two-dimensional layouts (rows and columns simultaneously), ideal for the product grid. Flexbox is for one-dimensional layouts (either row or column), ideal for navbars, card content, and aligning items. I use Grid for the product catalog layout and Flexbox for component-level alignment.

**Q: How do you handle empty states?**
> A: When the cart, wishlist, or search results are empty, I show a friendly message with an emoji icon, explanatory text, and a call-to-action button (like "Continue Shopping" or "Browse Products"). This is better UX than showing a blank page.

---

## 18. Future Enhancements

The following features could be added to make ShopNest a more complete application:

| Enhancement | Description |
|---|---|
| **Backend Integration** | Connect to a Node.js/Express server with a real database (MongoDB, PostgreSQL) for product data and user management |
| **Payment Gateway** | Integrate Stripe or Razorpay for actual payment processing |
| **Order Management** | Add checkout flow, order placement, order history, and order tracking |
| **Admin Dashboard** | Create an admin panel for managing products, categories, and viewing orders |
| **User Profiles** | Allow users to manage their profile, address book, and order history |
| **Product Reviews** | Let users rate and review products they've purchased |
| **Image Upload** | Replace placeholder images with real product photography |
| **Email Notifications** | Send confirmation emails for orders and account creation |
| **Password Security** | Implement password hashing (bcrypt) and secure authentication (JWT) |
| **Advanced Search** | Add autocomplete suggestions, category-aware search, and search history |
| **Pagination** | Add pagination or infinite scroll for large product catalogs |
| **Product Comparison** | Allow users to compare multiple products side by side |
| **Social Login** | Add Google/Facebook login options |
| **PWA Support** | Make the app installable and work offline using service workers |
| **Dark Mode** | Add a theme toggle for dark/light mode preference |
| **Analytics** | Track user behavior, popular products, and conversion metrics |
| **Internationalization** | Support multiple languages and currencies |

> **Note:** These are future scope items only. The current project is intentionally frontend-only to focus on demonstrating core web development skills.

---

*This guide was created as part of the ShopNest E-Commerce Product Catalog capstone project for web development internship demonstration.*
