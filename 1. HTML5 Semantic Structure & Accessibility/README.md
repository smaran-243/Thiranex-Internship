# Smaran — B.Tech Student Portfolio

A semantic, accessible portfolio skeleton built for a third-year B.Tech student at Anurag University. Open `index.html` directly in a browser, or serve the folder with any static server.

## Structure

```
index.html      Home
about.html      Bio, education timeline, skills
projects.html   Project case studies
contact.html    Accessible contact form
css/style.css   All styling (design tokens at the top)
js/main.js      Mobile nav toggle + form validation (progressive enhancement only)
robots.txt
sitemap.xml
favicon.svg
```

## What's implemented

**Semantic structure**: every page uses `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`, plus `<figure>/<figcaption>`, `<time>`, and `<address>` where appropriate — no generic `<div>` soup for content that has a real semantic role.

**Accessibility**

- Skip-to-content link on every page
- Visible focus rings (`:focus-visible`) on every interactive element
- One `<h1>` per page, no skipped heading levels
- `aria-current="page"` on the active nav link
- Mobile nav button uses `aria-expanded` + `aria-controls`
- Contact form: every input has a real `<label>`, errors are tied to fields with `aria-describedby` and `aria-invalid`, the radio group uses `<fieldset>/<legend>`, and form status is announced via `role="alert"`/`aria-live`
- `prefers-reduced-motion` and `prefers-color-scheme` are both respected
- Decorative elements (hamburger icon, code-style hero card) are `aria-hidden`; informative images have real `alt` text

**SEO**

- Unique `<title>` and meta description per page
- Canonical links, Open Graph + Twitter Card tags
- `robots.txt`, `sitemap.xml`, and a JSON-LD `Person` schema on the homepage

## Before you ship this

- All copy (name, bio, jobs, projects) is placeholder — replace it with your own
- Swap the `placehold.co` images for real photos/screenshots and write real `alt` text for each
- Point `og:url` / `canonical` / sitemap URLs at your real domain
- The contact form has no backend yet — wire `js/main.js`'s submit handler to a real endpoint or form service (the validation and ARIA wiring will keep working as-is)
