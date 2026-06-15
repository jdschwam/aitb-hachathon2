// ===== Navigation Module =====

function setupNavigation() {
  // Handle data-view links
  document.querySelectorAll('.nav-link[data-view]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const view = e.target.getAttribute('data-view');
      switchView(view);
    });
  });

  // Prevent default behavior on all nav-links with onclick
  document.querySelectorAll('.nav-link[onclick]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
    });
  });
}

function switchView(viewId) {
  // Hide all views
  document.querySelectorAll('.view').forEach(view => {
    view.classList.remove('active');
  });

  // Show selected view
  const selectedView = document.getElementById(viewId);
  if (selectedView) {
    selectedView.classList.add('active');
    console.log(`Switched to view: ${viewId}`);

    // Load data when switching to specific views
    if (viewId === 'developer-dashboard') {
      loadDeveloperDashboard();
    } else if (viewId === 'employer-dashboard') {
      loadEmployerDashboard();
    } else if (viewId === 'manage-developers') {
      loadManageDevelopersView();
    } else if (viewId === 'view-engineers') {
      loadViewEngineersView();
    } else if (viewId === 'manage-employers') {
      loadManageEmployersView();
    } else if (viewId === 'admin') {
      loadAdminPanel();
    } else if (viewId === 'about') {
      initializeAboutPage();
    }
  }
}
