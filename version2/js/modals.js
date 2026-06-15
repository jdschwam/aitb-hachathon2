// ===== Modal Module =====

function initializeWishlist() {
  const slidesContainer = document.getElementById('wishlist-slides');
  const indicatorsContainer = document.getElementById('wishlist-indicators');

  slidesContainer.innerHTML = WISHLIST_ITEMS.map((item, index) => `
    <div class="wishlist-slide ${index === 0 ? 'active' : ''}">
      <h3>${item.title}</h3>
      <ul>
        ${item.content.map(point => `<li>${point}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  indicatorsContainer.innerHTML = WISHLIST_ITEMS.map((_, index) => `
    <div class="wishlist-indicator ${index === 0 ? 'active' : ''}" onclick="goToWishlistSlide(${index})"></div>
  `).join('');

  currentWishlistSlide = 0;
}

function openWishlistModal() {
  const modal = document.getElementById('wishlist-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  updateWishlistButtons();
}

function closeWishlistModal() {
  const modal = document.getElementById('wishlist-modal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function nextWishlistSlide() {
  if (currentWishlistSlide < WISHLIST_ITEMS.length - 1) {
    goToWishlistSlide(currentWishlistSlide + 1);
  }
}

function previousWishlistSlide() {
  if (currentWishlistSlide > 0) {
    goToWishlistSlide(currentWishlistSlide - 1);
  }
}

function goToWishlistSlide(index) {
  const slides = document.querySelectorAll('.wishlist-slide');
  const indicators = document.querySelectorAll('.wishlist-indicator');

  slides[currentWishlistSlide].classList.remove('active');
  slides[currentWishlistSlide].classList.add('prev');
  indicators[currentWishlistSlide].classList.remove('active');

  currentWishlistSlide = index;
  slides[currentWishlistSlide].classList.remove('prev');
  slides[currentWishlistSlide].classList.add('active');
  indicators[currentWishlistSlide].classList.add('active');

  updateWishlistButtons();
}

function updateWishlistButtons() {
  const backBtn = document.querySelector('.wishlist-controls .wishlist-btn-nav:first-child');
  const forwardBtn = document.querySelector('.wishlist-controls .wishlist-btn-nav:last-child');

  backBtn.disabled = currentWishlistSlide === 0;
  forwardBtn.disabled = currentWishlistSlide === WISHLIST_ITEMS.length - 1;
}

function initializeOverview() {
  const slidesContainer = document.getElementById('overview-slides');
  const indicatorsContainer = document.getElementById('overview-indicators');

  const items = window.OVERVIEW_ITEMS || CLIENT_OVERVIEW_ITEMS;

  slidesContainer.innerHTML = items.map((item, index) => `
    <div class="wishlist-slide ${index === 0 ? 'active' : ''}">
      <h3>${item.title}</h3>
      <ul>
        ${item.content.map(point => `<li>${point}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  indicatorsContainer.innerHTML = items.map((_, index) => `
    <div class="wishlist-indicator ${index === 0 ? 'active' : ''}" onclick="goToOverviewSlide(${index})"></div>
  `).join('');

  currentOverviewSlide = 0;
}

function openOverviewModal() {
  const modal = document.getElementById('overview-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  updateOverviewButtons();
}

function closeOverviewModal() {
  const modal = document.getElementById('overview-modal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function nextOverviewSlide() {
  const items = window.OVERVIEW_ITEMS || CLIENT_OVERVIEW_ITEMS;
  if (currentOverviewSlide < items.length - 1) {
    goToOverviewSlide(currentOverviewSlide + 1);
  }
}

function previousOverviewSlide() {
  if (currentOverviewSlide > 0) {
    goToOverviewSlide(currentOverviewSlide - 1);
  }
}

function goToOverviewSlide(index) {
  const slides = document.querySelectorAll('#overview-slides .wishlist-slide');
  const indicators = document.querySelectorAll('#overview-indicators .wishlist-indicator');

  if (slides.length === 0) return;

  slides[currentOverviewSlide].classList.remove('active');
  slides[currentOverviewSlide].classList.add('prev');
  indicators[currentOverviewSlide].classList.remove('active');

  currentOverviewSlide = index;
  slides[currentOverviewSlide].classList.remove('prev');
  slides[currentOverviewSlide].classList.add('active');
  indicators[currentOverviewSlide].classList.add('active');

  updateOverviewButtons();
}

function updateOverviewButtons() {
  const controls = document.querySelector('#overview-modal .wishlist-controls');
  if (!controls) return;

  const backBtn = controls.querySelector('.wishlist-btn-nav:first-child');
  const forwardBtn = controls.querySelector('.wishlist-btn-nav:last-child');

  const items = window.OVERVIEW_ITEMS || CLIENT_OVERVIEW_ITEMS;
  backBtn.disabled = currentOverviewSlide === 0;
  forwardBtn.disabled = currentOverviewSlide === items.length - 1;
}

function initializeAbout() {
  currentAboutSlide = 0;
}

function openAboutModal() {
  const modal = document.getElementById('about-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeAboutModal() {
  const modal = document.getElementById('about-modal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function initializeAboutPage() {
  const buildDate = new Date();
  const year = buildDate.getFullYear();
  const month = String(buildDate.getMonth() + 1).padStart(2, '0');
  const day = String(buildDate.getDate()).padStart(2, '0');
  const hours = String(buildDate.getHours()).padStart(2, '0');
  const minutes = String(buildDate.getMinutes()).padStart(2, '0');
  const seconds = String(buildDate.getSeconds()).padStart(2, '0');

  const versionNumber = `${year}.${month}.${day}-${hours}.${minutes}.${seconds}`;
  const dateString = buildDate.toLocaleString();

  const versionDateElement = document.getElementById('version-date');
  const versionNumberElement = document.getElementById('version-number');

  if (versionDateElement) {
    versionDateElement.textContent = dateString;
  }
  if (versionNumberElement) {
    versionNumberElement.textContent = versionNumber;
  }
}

window.addEventListener('click', (event) => {
  const modal = document.getElementById('wishlist-modal');
  if (event.target === modal) {
    closeWishlistModal();
  }
  const overviewModal = document.getElementById('overview-modal');
  if (event.target === overviewModal) {
    closeOverviewModal();
  }
  const aboutModal = document.getElementById('about-modal');
  if (event.target === aboutModal) {
    closeAboutModal();
  }
});
