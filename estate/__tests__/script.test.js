/**
 * @jest-environment jsdom
 */

const { fireEvent, getByText } = require('@testing-library/dom');
require('@testing-library/jest-dom');

// ----------------------
// Mock Bootstrap Modal
// ----------------------
global.bootstrap = {
  Modal: class {
    constructor(el) {
      this.el = el;
    }
    show() {
      this.el.style.display = 'block';
    }
    hide() {
      this.el.style.display = 'none';
    }
  },
};

jest.useFakeTimers();

describe('Real Estate Page Tests', () => {
  let modalTitle, modalImg, modalPrice, modalDesc, modalContactBtn;
  let contactForm, successMessage, interestDropdown;

  beforeEach(() => {
    document.body.innerHTML = `
      <button class="view-details-btn"
              data-title="Test House"
              data-img="test.jpg"
              data-price="$1000"
              data-desc="Nice House"></button>

      <div id="houseDetailModal">
        <h5 id="modalTitle">House Details</h5>
        <img id="modalImg" />
        <p id="modalPrice"></p>
        <p id="modalDesc"></p>
        <button id="modalContactBtn"></button>
      </div>

      <div id="contactModal" style="display:none">
        <form id="contactForm">
          <input type="text" id="firstName" />
          <input type="text" id="lastName" />
          <input type="email" id="email" />
          <input type="tel" id="tel" />
          <textarea id="comments"></textarea>
          <select id="interest">
            <option value="" selected>Select</option>
            <option value="Buying">Buying</option>
          </select>
          <div class="success-message" style="display:none"></div>
          <button type="submit" class="btn btn-success">Submit</button>
        </form>
      </div>
    `;

    // Re-require your script after DOM is ready
    jest.isolateModules(() => {
      require('../javascript/script.js');
    });

    // Get modal and form elements
    modalTitle = document.getElementById('modalTitle');
    modalImg = document.getElementById('modalImg');
    modalPrice = document.getElementById('modalPrice');
    modalDesc = document.getElementById('modalDesc');
    modalContactBtn = document.getElementById('modalContactBtn');

    contactForm = document.getElementById('contactForm');
    successMessage = contactForm.querySelector('.success-message');
    interestDropdown = document.getElementById('interest');
  });

  afterEach(() => {
    jest.clearAllTimers();
    document.body.innerHTML = '';
  });

  test('House Details modal opens and displays correct data', () => {
    const btn = document.querySelector('.view-details-btn');
    fireEvent.click(btn);

    expect(modalTitle.textContent).toBe('Test House');
    expect(modalImg.src).toContain('test.jpg');
    expect(modalPrice.textContent).toBe('$1000');
    expect(modalDesc.textContent).toBe('Nice House');
  });

  test('Contact modal opens from House Details modal', () => {
    const btn = document.querySelector('.view-details-btn');
    fireEvent.click(btn);

    fireEvent.click(modalContactBtn);

    const contactModalEl = document.getElementById('contactModal');
    expect(contactModalEl.style.display).toBe('block');
  });

  test('Contact form submission shows success message and resets fields', () => {
    const inputFirst = document.getElementById('firstName');
    const inputLast = document.getElementById('lastName');
    const inputEmail = document.getElementById('email');
    const inputTel = document.getElementById('tel');
    const inputComments = document.getElementById('comments');

    // Fill in form
    inputFirst.value = 'John';
    inputLast.value = 'Doe';
    inputEmail.value = 'john@example.com';
    inputTel.value = '1234567890';
    inputComments.value = 'Test message';
    interestDropdown.selectedIndex = 1;

    fireEvent.submit(contactForm);

    // Success message shows
    expect(successMessage.style.display).toBe('block');

    // Fast-forward 3 seconds timeout
    jest.runAllTimers();

    // Fields reset
    expect(inputFirst.value).toBe('');
    expect(inputLast.value).toBe('');
    expect(inputEmail.value).toBe('');
    expect(inputTel.value).toBe('');
    expect(inputComments.value).toBe('');
    expect(interestDropdown.selectedIndex).toBe(0);

    // Success message hidden
    expect(successMessage.style.display).toBe('none');
  });
});
