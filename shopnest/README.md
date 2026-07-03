# 🏠 ShopNest – E-Commerce Product Catalog

A frontend e-commerce catalog website built as a Web Development internship capstone project. ShopNest allows users to browse home decor and furniture products, search/filter/sort them, view product details, manage a shopping cart and wishlist, and use a simple login/signup system — all with localStorage persistence.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)

## ✨ Features

- **Product Catalog** – Browse 16 home decor & furniture products with images, prices, and ratings
- **Search** – Search products by name in real-time
- **Filters** – Filter by category and price range
- **Sorting** – Sort by price (low/high) or name (A-Z)
- **Product Details** – View detailed product information with quantity selection
- **Shopping Cart** – Add/remove items, adjust quantities, view totals (localStorage persisted)
- **Wishlist** – Save favorite products, move to cart (localStorage persisted)
- **Login/Signup** – Client-side authentication with form validation (localStorage persisted)
- **Contact Form** – Validated contact form with user feedback
- **Responsive Design** – Works on mobile, tablet, and desktop
- **Accessible** – Semantic HTML, ARIA labels, keyboard-friendly

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic page structure |
| **CSS3** | Responsive styling, Grid, Flexbox |
| **Vanilla JavaScript** | DOM manipulation, ES6 modules |
| **Vite** | Build tool and dev server |
| **localStorage** | Client-side data persistence |
| **JSON** | Product data storage |

## 📁 Project Structure

```
shopnest/
├── index.html              # Entry HTML file
├── package.json            # Project configuration
├── vite.config.js          # Vite configuration (if needed)
├── README.md               # This file
├── PROJECT_GUIDE.md        # Detailed project documentation
├── public/                 # Static assets
│   └── images/             # Product images (placeholder)
├── src/
│   ├── main.js             # Application entry point
│   ├── data/
│   │   └── products.json   # Product data (16 items)
│   ├── styles/
│   │   └── main.css        # All application styles
│   ├── js/
│   │   ├── storage.js      # localStorage utility functions
│   │   ├── cart.js          # Cart management module
│   │   ├── wishlist.js      # Wishlist management module
│   │   ├── auth.js          # Authentication module
│   │   ├── products.js      # Product data & filtering
│   │   ├── ui.js            # UI utility functions
│   │   └── router.js        # Hash-based page router
│   └── pages/
│       ├── home.js          # Home page
│       ├── shop.js          # Products/Shop page
│       ├── product.js       # Product detail page
│       ├── cart.js           # Shopping cart page
│       ├── wishlist.js       # Wishlist page
│       ├── auth.js           # Login/Signup page
│       └── contact.js        # Contact page
```

## 🚀 How to Run

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- npm (comes with Node.js)

### Steps

1. **Clone or download** the project folder

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   The terminal will show a local URL (usually `http://localhost:5173`). Open it in your browser.

### Build for Production

```bash
npm run build
```

The production files will be in the `dist/` folder.

## 📄 Pages

| Page | Description |
|---|---|
| **Home** | Hero section, featured categories, trending products, features |
| **Shop** | Full product catalog with search, filters, and sorting |
| **Product Details** | Detailed view of a single product with quantity selector |
| **Cart** | Shopping cart with quantity controls and order summary |
| **Wishlist** | Saved items with option to move to cart |
| **Login/Signup** | Client-side authentication with form validation |
| **Contact** | Contact form with validation and contact info |

## 📖 Documentation

For a comprehensive explanation of the project (features, modules, data flow, viva preparation, and more), see:

👉 [PROJECT_GUIDE.md](./PROJECT_GUIDE.md)

## 📝 License

This project is created for educational/internship purposes.
