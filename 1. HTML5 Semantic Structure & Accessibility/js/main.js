/* ===========================================================
   main.js — progressive enhancement only.
   Every page works without this file: nav links still work,
   the form can still be submitted to a real backend once one
   is wired up. This script only adds the mobile menu toggle
   and friendlier, accessible client-side form validation.
   =========================================================== */

(function () {
  "use strict";

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.getElementById("navToggle");
  var nav = toggle ? toggle.closest(".primary-nav") : null;

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the menu with Escape, and return focus to the toggle button.
    nav.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* ---------- Contact form validation ---------- */
  var form = document.getElementById("contactForm");
  if (!form) return;

  var status = document.getElementById("formStatus");

  var validators = {
    name: function (value) {
      return value.trim().length > 1 ? "" : "Enter your full name.";
    },
    email: function (value) {
      var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(value.trim()) ? "" : "Enter a valid email address, like name@example.com.";
    },
    subject: function (value) {
      return value ? "" : "Choose a topic for your message.";
    },
    message: function (value) {
      return value.trim().length > 9 ? "" : "Write a few words about what you need (10 characters minimum).";
    }
  };

  function fieldRow(field) {
    return field.closest(".form-row");
  }

  function showError(field, message) {
    var row = fieldRow(field);
    var errorEl = document.getElementById(field.id + "-error");
    if (row) row.classList.toggle("has-error", Boolean(message));
    if (errorEl) errorEl.textContent = message;
    field.setAttribute("aria-invalid", message ? "true" : "false");
    return message;
  }

  function validateField(field) {
    var validate = validators[field.name];
    if (!validate) return "";
    return showError(field, validate(field.value));
  }

  // Validate as people leave a field, not on every keystroke —
  // this avoids scolding someone mid-sentence while still catching
  // mistakes before submission.
  ["name", "email", "subject", "message"].forEach(function (name) {
    var field = form.elements.namedItem(name);
    if (field) field.addEventListener("blur", function () { validateField(field); });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var fieldsToCheck = ["name", "email", "subject", "message"];
    var firstInvalid = null;
    var anyError = false;

    fieldsToCheck.forEach(function (name) {
      var field = form.elements.namedItem(name);
      if (!field) return;
      var message = validateField(field);
      if (message && !firstInvalid) firstInvalid = field;
      if (message) anyError = true;
    });

    if (anyError) {
      status.hidden = false;
      status.className = "form-status error";
      status.textContent = "Some information is missing or needs fixing. Check the highlighted fields below.";
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // No backend is wired up in this skeleton. Replace this block with
    // a real fetch() call to your form-handling endpoint.
    status.hidden = false;
    status.className = "form-status success";
    status.textContent = "Thanks — your message is ready to send. Connect this form to a backend or form service to deliver it.";
    form.reset();
  });
})();
