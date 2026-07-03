// Auth Page - Login/Signup forms with validation and session management
import {
  signup,
  login,
  logout,
  getCurrentUser,
  isLoggedIn,
  validateEmail,
  validatePassword,
  validateName
} from '../js/auth.js';
import { showToast, updateNavAuth } from '../js/ui.js';
import { navigateTo } from '../js/router.js';

/**
 * Shows a validation error message below a form field.
 */
function showFieldError(inputId, message) {
  const group = document.getElementById(inputId).closest('.form-group');
  group.classList.add('error');
  group.querySelector('.error-message').textContent = message;
}

/**
 * Clears all validation errors in a form.
 */
function clearErrors(formId) {
  const form = document.getElementById(formId);
  form.querySelectorAll('.form-group').forEach(g => {
    g.classList.remove('error');
    g.querySelector('.error-message').textContent = '';
  });
}

/**
 * Renders the auth page (login/signup or welcome screen if logged in).
 */
export function renderAuthPage() {
  const app = document.getElementById('app');

  // If user is already logged in, show welcome section
  if (isLoggedIn()) {
    const user = getCurrentUser();
    app.innerHTML = `
      <div class="auth-page">
        <div class="container">
          <div class="auth-card welcome-section">
            <h2>Welcome, ${user.name}!</h2>
            <p>You are logged in as ${user.email}</p>
            <button class="btn btn-danger" id="logoutBtn">Logout</button>
          </div>
        </div>
      </div>
    `;

    // Logout button handler
    document.getElementById('logoutBtn').addEventListener('click', () => {
      logout();
      showToast('Logged out');
      updateNavAuth();
      renderAuthPage(); // Re-render to show login form
    });

    return;
  }

  // Not logged in - show login/signup forms
  app.innerHTML = `
    <section class="auth-page">
      <div class="container">
        <div class="auth-card">
          <!-- Tab Switcher -->
          <div class="auth-tabs">
            <button class="auth-tab active" data-tab="login">Login</button>
            <button class="auth-tab" data-tab="signup">Signup</button>
          </div>

          <!-- Login Form -->
          <form id="loginForm" class="auth-form">
            <div class="form-group">
              <label for="loginEmail">Email</label>
              <input type="email" id="loginEmail" placeholder="Enter your email" required />
              <span class="error-message"></span>
            </div>
            <div class="form-group">
              <label for="loginPassword">Password</label>
              <input type="password" id="loginPassword" placeholder="Enter your password" required />
              <span class="error-message"></span>
            </div>
            <button type="submit" class="btn btn-primary auth-submit">Login</button>
          </form>

          <!-- Signup Form (hidden by default) -->
          <form id="signupForm" class="auth-form" style="display:none">
            <div class="form-group">
              <label for="signupName">Full Name</label>
              <input type="text" id="signupName" placeholder="Enter your full name" required />
              <span class="error-message"></span>
            </div>
            <div class="form-group">
              <label for="signupEmail">Email</label>
              <input type="email" id="signupEmail" placeholder="Enter your email" required />
              <span class="error-message"></span>
            </div>
            <div class="form-group">
              <label for="signupPassword">Password</label>
              <input type="password" id="signupPassword" placeholder="Min 6 characters" required />
              <span class="error-message"></span>
            </div>
            <div class="form-group">
              <label for="signupConfirm">Confirm Password</label>
              <input type="password" id="signupConfirm" placeholder="Confirm your password" required />
              <span class="error-message"></span>
            </div>
            <button type="submit" class="btn btn-primary auth-submit">Sign Up</button>
          </form>
        </div>
      </div>
    </section>
  `;

  // --- DOM references ---
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const authTabs = document.querySelectorAll('.auth-tab');

  // --- Tab Switching ---
  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab styling
      authTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Show/hide the correct form
      if (tab.dataset.tab === 'login') {
        loginForm.style.display = '';
        signupForm.style.display = 'none';
      } else {
        loginForm.style.display = 'none';
        signupForm.style.display = '';
      }
    });
  });

  // --- Login Form Submission ---
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors('loginForm');

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    let hasError = false;

    // Validate email
    if (!validateEmail(email)) {
      showFieldError('loginEmail', 'Please enter a valid email');
      hasError = true;
    }

    // Validate password
    if (!password) {
      showFieldError('loginPassword', 'Password is required');
      hasError = true;
    }

    if (hasError) return;

    // Attempt login
    const result = login(email, password);
    if (result.success) {
      showToast('Login successful!');
      updateNavAuth();
      navigateTo('#home');
    } else {
      showToast(result.message, 'error');
    }
  });

  // --- Signup Form Submission ---
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors('signupForm');

    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('signupConfirm').value;

    let hasError = false;

    // Validate name
    if (!validateName(name)) {
      showFieldError('signupName', 'Name must be at least 2 characters');
      hasError = true;
    }

    // Validate email
    if (!validateEmail(email)) {
      showFieldError('signupEmail', 'Please enter a valid email');
      hasError = true;
    }

    // Validate password
    if (!validatePassword(password)) {
      showFieldError('signupPassword', 'Password must be at least 6 characters');
      hasError = true;
    }

    // Validate password confirmation
    if (confirm !== password) {
      showFieldError('signupConfirm', 'Passwords do not match');
      hasError = true;
    }

    if (hasError) return;

    // Attempt signup
    const result = signup(name, email, password);
    if (result.success) {
      showToast('Account created! Please login.');
      // Switch to login tab
      authTabs.forEach(t => t.classList.remove('active'));
      authTabs[0].classList.add('active');
      loginForm.style.display = '';
      signupForm.style.display = 'none';
    } else {
      showToast(result.message, 'error');
    }
  });
}
