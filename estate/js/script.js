// ----------------------
// Initialize Bootstrap modals
// ----------------------
const houseDetailModalEl = document.getElementById('houseDetailModal');
const houseDetailModal = houseDetailModalEl ? new bootstrap.Modal(houseDetailModalEl) : null;

const contactModalEl = document.getElementById('contactModal');
const contactModal = contactModalEl ? new bootstrap.Modal(contactModalEl) : null;

// ----------------------
// Get House Modal elements
// ----------------------
const modalTitle = document.getElementById('modalTitle');
const modalImg = document.getElementById('modalImg');
const modalPrice = document.getElementById('modalPrice');
const modalDesc = document.getElementById('modalDesc');
const modalContactBtn = document.getElementById('modalContactBtn');


 document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  });
// ----------------------
// Populate House Details Modal when "View Details" is clicked
// ----------------------
document.querySelectorAll('.view-details-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (modalTitle) modalTitle.textContent = btn.dataset.title;
    if (modalImg) modalImg.src = btn.dataset.img;
    if (modalPrice) modalPrice.textContent = btn.dataset.price;
    if (modalDesc) modalDesc.textContent = btn.dataset.desc;

    if (houseDetailModal) {
      houseDetailModal.show();

      // Move focus to first focusable element inside the modal
      setTimeout(() => {
        const focusable = houseDetailModalEl.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable) focusable.focus();
      }, 100);
    }
  });
});

// ----------------------
// Show Contact Modal from House Modal
// ----------------------
if (modalContactBtn && contactModal) {
  modalContactBtn.addEventListener('click', () => {
    // Blur currently focused element to avoid aria-hidden warning
    if (document.activeElement) document.activeElement.blur();

    // Hide House Modal first
    if (houseDetailModal) houseDetailModal.hide();

    // Show Contact Modal and focus first focusable element
    contactModal.show();
    setTimeout(() => {
      const focusable = contactModalEl.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable) focusable.focus();
    }, 100);
  });
}

// ----------------------
// Contact Form Handling (both Home and Modal)
// ----------------------
const contactForm = document.getElementById('contactForm');
const successMessage = document.querySelector('.success-message'); // main page form message
const modalSuccessMessage = document.getElementById('formSuccess'); // modal form message
const interestDropdown = document.getElementById('interest');
const dropdownButton = document.getElementById('dropdownMenuButton1'); // optional button-style dropdown

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Display appropriate success message
    if (successMessage) successMessage.style.display = 'block';
    if (modalSuccessMessage) modalSuccessMessage.style.display = 'block';

    // Clear the form inputs
    contactForm.reset();

    // Reset dropdown if exists
    if (interestDropdown) interestDropdown.selectedIndex = 0;
    if (dropdownButton) dropdownButton.textContent = 'Choose';

    // Blur currently focused element to prevent aria-hidden warnings
    if (document.activeElement) document.activeElement.blur();

    // Hide success message and modal after 3 seconds
    setTimeout(() => {
      if (successMessage) successMessage.style.display = 'none';
      if (modalSuccessMessage) modalSuccessMessage.style.display = 'none';

      // Close modal if open
      if (contactModal) contactModal.hide();

      // Optionally focus a safe element after closing
      const safeFocus = document.querySelector('header, main, body'); 
      if (safeFocus) safeFocus.focus();
    }, 3000);
  });
}

// ----------------------
// Dropdown dynamic selection (for both button and select types)
// ----------------------

// For select dropdowns (main form)
if (interestDropdown) {
  interestDropdown.addEventListener('change', () => {
    const selected = interestDropdown.options[interestDropdown.selectedIndex].text;
    console.log(`User selected: ${selected}`);
  });
}

// For button-style dropdowns (modal)
if (dropdownButton) {
  document.querySelectorAll('.dropdown-menu .dropdown-item').forEach((item) => {
    item.addEventListener('click', () => {
      dropdownButton.textContent = item.textContent;
      console.log(`User selected: ${item.textContent}`);
    });
  });

}
