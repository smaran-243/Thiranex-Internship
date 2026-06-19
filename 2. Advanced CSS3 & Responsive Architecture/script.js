const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeToggle.querySelector('span').textContent = theme === 'dark' ? 'Light' : 'Dark';
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

function initTheme() {
  const storedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const defaultTheme = storedTheme || (prefersDark ? 'dark' : 'light');
  setTheme(defaultTheme);
}

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const nextTheme = current === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
  localStorage.setItem('portfolio-theme', nextTheme);
});

initTheme();
