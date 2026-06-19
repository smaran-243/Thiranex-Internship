# Smaran DevHub – Developer Productivity Dashboard

Smaran DevHub is a polished single-page application designed for a developer productivity workflow. It combines personal branding, task management, weather integration, DSA tracking, and project highlights in one accessible and responsive dashboard.

## Features

- Semantic HTML5 structure with ARIA labels
- Mobile-first responsive layout with CSS Grid and Flexbox
- Dark/light theme toggle with CSS variables
- Task manager with add, edit, delete, complete, and filter capabilities
- `localStorage` persistence for tasks and theme preference
- Weather dashboard powered by Open-Meteo API with city search and error handling
- DSA tracking cards for Arrays, Binary Search, Trees, and Linked Lists
- Portfolio project showcase
- Accessible contact form and social links
- Client-side routing using hash-based navigation
- Modular and maintainable vanilla JavaScript architecture

## Folder Structure

```
/ (root)
  ├─ index.html
  ├─ style.css
  ├─ script.js
  └─ README.md
```

## Getting Started

1. Open the project folder in your code editor.
2. Launch `index.html` in a browser.
3. The dashboard is fully static and does not require a build process.

## Deployment

### Vercel

1. Sign in to [Vercel](https://vercel.com).
2. Import the repository or drag and drop the project folder.
3. Set the root directory to the project root.
4. Choose "Deploy".

### Netlify

1. Sign in to [Netlify](https://app.netlify.com).
2. Create a new site from Git.
3. Select the repository.
4. Configure the build settings:
   - Build command: none
   - Publish directory: `/`
5. Deploy the site.

## Notes

- The weather dashboard uses the free Open-Meteo geocoding and forecast APIs and does not require an API key.
- The application is designed with performance, accessibility, and modern developer portfolio standards in mind.

## Author

**Smaran**

- B.Tech CSE, 3rd Year
- Anurag University
- Web Development Intern at Thiranex
