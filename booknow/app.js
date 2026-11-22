/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
const ROOMS = [
  {
    id: 1,
    name: "Deluxe Room",
    desc: "Comfortable room with king-size bed, city view, and complimentary breakfast included.",
    price: 129,
    discount: 20,
    img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&auto=format&fit=crop&q=60",
    imgAlt: "Deluxe Room"
  },
  {
    id: 2,
    name: "Superior Room",
    desc: "Spacious room with twin beds, garden view, and access to the rooftop pool.",
    price: 89,
    discount: 10,
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&auto=format&fit=crop&q=60",
    imgAlt: "Superior Room"
  },
  {
    id: 3,
    name: "Family Suite",
    desc: "Generous family suite with two bedrooms, a spacious living area, kitchenette, premium entertainment system, complimentary breakfast for four guests, and stunning panoramic ocean views — the perfect choice for families travelling with children of any age.",
    price: 199,
    discount: 15,
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&auto=format&fit=crop&q=60",
    imgAlt: "Family Suite"
  },
  {
    id: 4,
    name: "Penthouse Suite",
    desc: "Exclusive top-floor suite with private terrace, butler service, and panoramic skyline views.",
    price: 299,
    discount: 5,
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&auto=format&fit=crop&q=60",
    imgAlt: "Penthouse Suite"
  }
];

let selectedRoom = null;
let isLoggedIn = false;

/* ══════════════════════════════════════════
   NAVIGATION
══════════════════════════════════════════ */
const PAGES = ['login', 'rooms', 'booking', 'confirm'];

function showPage(name) {
  if (name !== 'login' && !isLoggedIn) name = 'login';
  PAGES.forEach(p => {
    const el = document.getElementById('page-' + p);
    if (el) el.classList.add('hidden');
  });
  const target = document.getElementById('page-' + name);
  if (target) target.classList.remove('hidden');

  if (name === 'rooms') renderRooms();
  if (name === 'booking') renderBookingSummary();
}

/* ══════════════════════════════════════════
   TOAST
══════════════════════════════════════════ */
function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast' + (type ? ' ' + type : '');
  t.classList.remove('hidden');
  setTimeout(() => t.classList.add('hidden'), 3000);
}

/* ══════════════════════════════════════════
   LOGIN — BUGGY
══════════════════════════════════════════ */
function buggyLogin() {
  const user = document.getElementById('login-user').value.trim();
  const pass = document.getElementById('login-pass').value;
  const error = document.getElementById('login-error');

  if (user !== 'guest@booknow.com' || pass !== 'stay2026') {
    error.textContent = !user || !pass
      ? 'Please enter your email and password.'
      : 'Invalid email or password.';
    error.classList.remove('hidden');
    return;
  }
  error.classList.add('hidden');
  isLoggedIn = true;
  document.getElementById('main-navbar').classList.remove('hidden');
  showPage('rooms');
}

/* ══════════════════════════════════════════
   ROOMS — BUGGY
══════════════════════════════════════════ */
function calcDiscounted(price, discountPct) {
  return (price * (1 - discountPct / 100)).toFixed(2);
}

function renderRooms() {
  const grid = document.getElementById('rooms-grid');
  grid.innerHTML = '';
  ROOMS.forEach(r => {
    const discounted = calcDiscounted(r.price, r.discount);

    const card = document.createElement('div');
    card.className = 'room-card';
    card.innerHTML = `
      <div class="room-img-wrap">
        <img src="${r.img}" alt="${r.imgAlt}">
        <span class="availability-badge badge-available">Available</span>
      </div>
      <div class="room-body">
        <div class="room-name">${r.name}</div>
        <div class="room-desc">${r.desc}</div>
        <div class="price-row">
          <span class="price-original">$${r.price}/night</span>
          <span class="price-discounted">$${discounted}/night</span>
          <span class="badge-discount">${r.discount}% OFF</span>
        </div>
        <button class="btn-book" onclick="selectRoom(${r.id})">Select Room</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function selectRoom(roomId) {
  selectedRoom = ROOMS.find(r => r.id === roomId);
  showPage('booking');
}

/* ══════════════════════════════════════════
   BOOKING — BUGGY
══════════════════════════════════════════ */
function calcNights() {
  const checkin = document.getElementById('book-checkin').value;
  const checkout = document.getElementById('book-checkout').value;
  if (!checkin || !checkout) return 1;
  const nights = Math.round((new Date(checkout) - new Date(checkin)) / 86400000);
  return nights > 0 ? nights : 1;
}

function updateTotal() {
  renderBookingSummary();
}

function renderBookingSummary() {
  if (!selectedRoom) return;
  const panel = document.getElementById('booking-summary');
  const pricePerNight = calcDiscounted(selectedRoom.price, selectedRoom.discount);
  const nights = calcNights();
  const total = (parseFloat(pricePerNight) * nights).toFixed(2);

  panel.innerHTML = `
    <div class="summary-panel">
      <h3>Booking Summary</h3>
      <div class="summary-room-name">${selectedRoom.name}</div>
      <hr class="section-divider"/>
      <div class="summary-row"><span>Price per night</span><span>$${pricePerNight}</span></div>
      <div class="summary-row"><span>Nights</span><span id="summary-nights">${nights}</span></div>
      <div class="summary-row total"><span>Estimated Total</span><span id="summary-total">$${total}</span></div>
      <p style="font-size:0.78rem;color:#94a3b8;margin-top:10px">Select dates above to calculate total</p>
    </div>
  `;
}

function setFieldError(id, invalid) {
  document.getElementById(id).classList.toggle('hidden', !invalid);
  return !invalid;
}

function validateGuestDetails() {
  const fname = document.getElementById('book-fname').value.trim();
  const lname = document.getElementById('book-lname').value.trim();
  const email = document.getElementById('book-email').value.trim();
  const phone = document.getElementById('book-phone').value.trim();

  const results = [
    setFieldError('err-fname', !fname),
    setFieldError('err-lname', !lname),
    setFieldError('err-email', !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)),
    setFieldError('err-phone', !/^\+?[\d\s\-().]*\d[\d\s\-().]*$/.test(phone))
  ];
  return results.every(Boolean);
}

function validateStayDetails() {
  const checkin = document.getElementById('book-checkin').value;
  const checkout = document.getElementById('book-checkout').value;
  const guests = parseInt(document.getElementById('book-guests').value, 10);

  const checkoutError = document.getElementById('err-checkout');
  checkoutError.textContent = !checkout
    ? 'Check-out date is required'
    : 'Check-out must be after check-in';

  const results = [
    setFieldError('err-checkin', !checkin),
    setFieldError('err-checkout', !checkout || (checkin && checkout <= checkin)),
    setFieldError('err-guests', !(guests >= 1))
  ];
  return results.every(Boolean);
}

function generateBookingRef() {
  return 'BKN-' + String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
}

function renderConfirmation(ref) {
  const nights = calcNights();
  const pricePerNight = calcDiscounted(selectedRoom.price, selectedRoom.discount);
  const rows = [
    ['Room', selectedRoom.name],
    ['Check-in', document.getElementById('book-checkin').value],
    ['Check-out', document.getElementById('book-checkout').value],
    ['Guest', `${document.getElementById('book-fname').value.trim()} ${document.getElementById('book-lname').value.trim()}`],
    ['Guests', document.getElementById('book-guests').value],
    ['Nights', String(nights)],
    ['Total', `$${(parseFloat(pricePerNight) * nights).toFixed(2)}`]
  ];

  const box = document.getElementById('confirm-summary');
  box.innerHTML = '<h4>Booking Summary</h4>';
  rows.forEach(([label, value], i) => {
    const row = document.createElement('div');
    row.className = 'confirm-row' + (i === rows.length - 1 ? ' total-row' : '');
    const l = document.createElement('span');
    l.textContent = label;
    const v = document.createElement('span');
    v.textContent = value;
    row.append(l, v);
    box.appendChild(row);
  });
  document.getElementById('confirm-ref').textContent = ref;
}

function placeBooking() {
  const guestsValid = validateGuestDetails();
  const stayValid = validateStayDetails();
  if (!guestsValid || !stayValid) return;
  showPage('confirm');
  renderConfirmation(generateBookingRef());
}

/* ══════════════════════════════════════════
   INIT
══════════════════════════════════════════ */
showPage('login');
