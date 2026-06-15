// Civic AI Talent Match - Application Entry Point

document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  initializeWishlist();
  initializeOverview();
  initializeAbout();
});

function initializeApp() {
  console.log('Initializing Civic AI Talent Match...');

  setupNavigation();
  setupDeveloperForm();
  setupProjectForm();
  setupDashboardFilters();
  setupAdminPanel();
  loadAllData();

  switchView('home');

  console.log('App initialized successfully!');
}

function loadAllData() {
  DataManager.initialize();
  console.log('Data loaded:', DataManager.getData());
}
