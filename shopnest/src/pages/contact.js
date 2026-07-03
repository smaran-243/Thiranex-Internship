// Contact Page - Contact form with validation and business info
import { validateEmail } from '../js/auth.js';
import { showToast } from '../js/ui.js';

/**
 * Shows a validation error message below a form field.
 */
function showFieldError(inputId, message) {
  const group = document.getElementById(inputId).closest('.form-group');
  group.classList.add('error');
  group.querySelector('.error-message').textContent = message;
}

/**
 * Clears all validation errors in the contact form.
 */
function clearErrors(formId) {
  const form = document.getElementById(formId);
  form.querySelectorAll('.form-group').forEach(g => {
    g.classList.remove('error');
    g.querySelector('.error-message').textContent = '';
  });
}

/**
 * Renders the contact page with form and business info.
 */
export function renderContactPage() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <section class="contact-page">
      <div class="container">
        <div class="page-title">
          <h1>Contact Us</h1>
        </div>
        <div class="contact-layout">
          <!-- Contact Form -->
          <div class="contact-form">
            <h2>Send us a Message</h2>
            <form id="contactForm">
              <div class="form-group">
                <label for="contactName">Your Name</label>
                <input type="text" id="contactName" placeholder="Enter your name" required />
                <span class="error-message"></span>
              </div>
              <div class="form-group">
                <label for="contactEmail">Your Email</label>
                <input type="email" id="contactEmail" placeholder="Enter your email" required />
                <span class="error-message"></span>
              </div>
              <div class="form-group">
                <label for="contactSubject">Subject</label>
                <input type="text" id="contactSubject" placeholder="Enter subject" required />
                <span class="error-message"></span>
              </div>
              <div class="form-group">
                <label for="contactMessage">Message</label>
                <textarea id="contactMessage" placeholder="Write your message here..." rows="5" required></textarea>
                <span class="error-message"></span>
              </div>
              <button type="submit" class="btn btn-primary">Send Message</button>
            </form>
          </div>

          <!-- Contact Info Sidebar -->
          <div class="contact-info">
            <h2>Get in Touch</h2>
            <div class="contact-info-item">
              <span>📍</span>
              <div>
                <h4>Address</h4>
                <p>123 Home Street, Design City, DC 10001</p>
              </div>
            </div>
            <div class="contact-info-item">
              <span>📧</span>
              <div>
                <h4>Email</h4>
                <p>support@shopnest.com</p>
              </div>
            </div>
            <div class="contact-info-item">
              <span>📞</span>
              <div>
                <h4>Phone</h4>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            <div class="contact-info-item">
              <span>🕐</span>
              <div>
                <h4>Business Hours</h4>
                <p>Mon - Fri: 9AM - 6PM</p>
                <p>Sat - Sun: 10AM - 4PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  // --- Form Validation & Submission ---
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors('contactForm');

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    let hasError = false;

    // Validate name (min 2 characters)
    if (name.length < 2) {
      showFieldError('contactName', 'Name must be at least 2 characters');
      hasError = true;
    }

    // Validate email format
    if (!validateEmail(email)) {
      showFieldError('contactEmail', 'Please enter a valid email');
      hasError = true;
    }

    // Validate subject (required)
    if (!subject) {
      showFieldError('contactSubject', 'Subject is required');
      hasError = true;
    }

    // Validate message (min 10 characters)
    if (message.length < 10) {
      showFieldError('contactMessage', 'Message must be at least 10 characters');
      hasError = true;
    }

    if (hasError) return;

    // Success - show confirmation and reset form
    showToast('Message sent successfully! We\'ll get back to you soon.');
    contactForm.reset();
  });
}
