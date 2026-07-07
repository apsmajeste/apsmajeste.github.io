/* ============================================================
   APS MAJESTE — Scroll reveal + small UI behaviors
   ============================================================ */

export function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );

  els.forEach((el) => io.observe(el));
}

/* ---------- Toast (newsletter / form feedback) ---------- */
export function showToast(message) {
  const toast = document.querySelector('[data-toast]');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(showToast._t);
  showToast._t = window.setTimeout(() => toast.classList.remove('is-visible'), 3200);
}

/* ---------- Sanitize input (basic XSS prevention) ---------- */
function sanitizeInput(value) {
  if (!value) return '';
  // Strip HTML tags and limit length
  const div = document.createElement('div');
  div.textContent = value;
  return div.innerHTML.slice(0, 5000);
}

/* ---------- Newsletter (footer) ---------- */
export function initNewsletter() {
  const form = document.querySelector('[data-newsletter]');
  if (!form) return;
  let isSubmitting = false; // Double-submit protection

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent double-submit

    const email = form.querySelector('input[type="email"]');
    if (!email || !email.value) return;

    // Validate email
    if (!email.validity.valid) {
      email.focus();
      showToast('Please enter a valid email address.');
      return;
    }

    isSubmitting = true;
    showToast('Thank you — welcome to the APS MAJESTE ritual.');
    form.reset();
    // Re-enable after 3 seconds (matching toast duration)
    window.setTimeout(() => { isSubmitting = false; }, 3000);
  });
}

/* ---------- FAQ (handled natively via <details>, but allow analytics) ---------- */
export function initFaq() {
  const items = document.querySelectorAll('.faq__item');
  items.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        // Close siblings in the same .faq group for an accordion feel
        const group = item.closest('.faq');
        if (!group) return;
        group.querySelectorAll('.faq__item').forEach((sib) => {
          if (sib !== item && sib.open) sib.open = false;
        });
      }
    });
  });
}

/* ---------- Contact form (demo, no backend) ---------- */
export function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;
  let isSubmitting = false; // Double-submit protection

  // Add inline validation feedback
  const fields = form.querySelectorAll('input[required], textarea[required], select[required]');
  fields.forEach((field) => {
    field.addEventListener('invalid', () => {
      field.classList.add('form-field--error');
      // Show custom error message
      let msg = 'This field is required';
      if (field.type === 'email' && field.validity.typeMismatch) {
        msg = 'Please enter a valid email address';
      }
      showToast(msg);
      // Focus the first invalid field
      setTimeout(() => field.focus(), 100);
    });
    field.addEventListener('input', () => {
      field.classList.remove('form-field--error');
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent double-submit

    // Validate all fields
    let firstInvalid = null;
    fields.forEach((field) => {
      if (!field.validity.valid) {
        field.classList.add('form-field--error');
        if (!firstInvalid) firstInvalid = field;
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();
      let msg = 'Please fill in all required fields';
      if (firstInvalid.type === 'email' && firstInvalid.validity.typeMismatch) {
        msg = 'Please enter a valid email address';
      }
      showToast(msg);
      return;
    }

    // Sanitize the message field
    const messageField = form.querySelector('#message');
    if (messageField) {
      messageField.value = sanitizeInput(messageField.value);
    }

    isSubmitting = true;
    showToast('Message received. Our concierge will reply within 24 hours.');
    form.reset();
    // Re-enable after 3 seconds
    window.setTimeout(() => { isSubmitting = false; }, 3000);
  });
}

/* ---------- Back to top button ---------- */
export function initBackToTop() {
  // Create the button
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.textContent = '↑';
  btn.type = 'button';
  document.body.appendChild(btn);

  // Show/hide based on scroll position
  const onScroll = () => {
    if (window.scrollY > 800) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // Scroll to top on click
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
