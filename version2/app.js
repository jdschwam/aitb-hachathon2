// Civic AI Talent Match - Main Application Logic

// Wishlist data
const WISHLIST_ITEMS = [
  {
    title: '🏢 Expanded Civic Organizations',
    content: [
      'Add more nonprofit organizations including:',
      'Social services agencies and food banks',
      'Environmental conservation groups',
      'Education and literacy programs',
      'Healthcare and wellness nonprofits',
      'Community development organizations',
      'Arts and cultural institutions'
    ]
  },
  {
    title: '👤 Enhanced Developer Profiles',
    content: [
      'Expand developer information to include:',
      'Personal background and professional history',
      'Years of experience in the working world',
      'Career aspirations (technical, management, construction, health, etc.)',
      'Preferred industries and work environments',
      'Learning goals and skill development paths',
      'Community engagement and volunteer interests'
    ]
  },
  {
    title: '🤖 AI-Powered Aspirations Matching',
    content: [
      'Leverage AI to improve matching by considering:',
      'Career trajectory alignment with project types',
      'Long-term growth opportunities for developers',
      'Organizational culture fit assessment',
      'Skill gap identification for career advancement',
      'Mentorship and leadership opportunities',
      'Remote work and schedule flexibility matching'
    ]
  },
  {
    title: '📋 Expanded Project Definitions',
    content: [
      'Enhance project information with:',
      'Detailed project timelines and duration',
      'Impact metrics and success criteria',
      'Team composition and collaboration needs',
      'Budget and compensation information',
      'Training and support available',
      'Career growth opportunities within projects',
      'Remote/hybrid work options'
    ]
  },
  {
    title: '🎓 Skills Development Pathways',
    content: [
      'Create structured learning paths:',
      'Track skill progression over time',
      'Recommend training resources',
      'Connect developers with mentors',
      'Gamify skill achievements with badges',
      'Partner with educational institutions',
      'Provide certification support'
    ]
  },
  {
    title: '📊 Advanced Analytics & Reporting',
    content: [
      'Implement comprehensive analytics:',
      'Career outcome tracking for participants',
      'Project success and impact metrics',
      'Organization ROI calculations',
      'Skills demand forecasting',
      'Diversity and inclusion metrics',
      'Community economic impact reporting'
    ]
  },
  {
    title: '🤝 Team Assembly Intelligence',
    content: [
      'AI-powered team building:',
      'Recommend ideal team compositions',
      'Balance technical and soft skills',
      'Consider team dynamics and personalities',
      'Optimize for knowledge transfer',
      'Predict team collaboration success',
      'Create diverse and inclusive teams'
    ]
  },
  {
    title: '💼 Organizational Insights',
    content: [
      'Provide value to partner organizations:',
      'Workforce planning tools',
      'Talent pipeline development',
      'Skills inventory management',
      'Succession planning assistance',
      'Market competitiveness analysis',
      'Industry benchmark comparisons'
    ]
  },
  {
    title: '🌐 Mobile & Integration',
    content: [
      'Expand platform accessibility:',
      'Native mobile applications (iOS & Android)',
      'API integrations with HR systems',
      'Calendar and scheduling integration',
      'Email and notification systems',
      'Document storage and sharing',
      'Real-time collaboration tools'
    ]
  },
  {
    title: '🎯 Impact & Sustainability',
    content: [
      'Drive long-term community impact:',
      'Track economic mobility outcomes',
      'Support social equity initiatives',
      'Build sustainable partnerships',
      'Create funding mechanisms',
      'Scale to additional regions',
      'Measure and report on SDG alignment'
    ]
  }
];

let currentWishlistSlide = 0;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  initializeWishlist();
});

function initializeApp() {
  console.log('Initializing Civic AI Talent Match...');

  // Set up navigation
  setupNavigation();

  // Set up form handlers
  setupDeveloperForm();
  setupProjectForm();

  // Set up dashboard filters
  setupDashboardFilters();

  // Set up admin panel
  setupAdminPanel();

  // Load initial data
  loadAllData();

  // Show home view by default
  switchView('home');

  console.log('App initialized successfully!');
}

// ===== Navigation =====
function setupNavigation() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const view = e.target.getAttribute('data-view');
      switchView(view);
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
    } else if (viewId === 'manage-employers') {
      loadManageEmployersView();
    } else if (viewId === 'admin') {
      loadAdminPanel();
    } else if (viewId === 'about') {
      initializeAboutPage();
    }
  }
}

// ===== Developer Management =====
function setupDeveloperForm() {
  const form = document.getElementById('developer-form');
  const skillsGroup = document.getElementById('skills-group');

  // Generate skill checkboxes
  ALL_SKILLS.forEach(skill => {
    const label = document.createElement('label');
    label.className = 'checkbox-item';
    label.innerHTML = `
      <input type="checkbox" name="skills" value="${skill}">
      <label>${skill}</label>
    `;
    skillsGroup.appendChild(label);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const selectedSkills = Array.from(form.querySelectorAll('input[name="skills"]:checked'))
      .map(cb => cb.value);

    if (selectedSkills.length === 0) {
      alert('Please select at least one skill');
      return;
    }

    const newDeveloper = {
      name: document.getElementById('dev-name').value,
      email: document.getElementById('dev-email').value,
      level: document.getElementById('dev-level').value,
      skills: selectedSkills
    };

    DataManager.addDeveloper(newDeveloper);
    form.reset();
    alert('Developer added successfully!');
    loadManageDevelopersView();
  });
}

function loadManageDevelopersView() {
  const developers = DataManager.getDevelopers();
  const table = document.getElementById('developers-table');

  if (developers.length === 0) {
    table.innerHTML = '<p class="empty-state">No developers added yet</p>';
    return;
  }

  const html = `
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Level</th>
          <th>Skills</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${developers.map(dev => `
          <tr>
            <td><strong>${dev.name}</strong><br><small>${dev.email}</small></td>
            <td><span class="skill-tag">${dev.level}</span></td>
            <td><div class="skills-list">${dev.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}</div></td>
            <td>
              <div class="table-actions">
                <button class="btn btn-small btn-secondary" onclick="editDeveloper(${dev.id})">Edit</button>
                <button class="btn btn-small btn-danger" onclick="deleteDeveloperConfirm(${dev.id})">Delete</button>
              </div>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  table.innerHTML = html;
}

function deleteDeveloperConfirm(id) {
  if (confirm('Are you sure you want to delete this developer?')) {
    DataManager.deleteDeveloper(id);
    loadManageDevelopersView();
  }
}

function editDeveloper(id) {
  // This could be expanded to show an edit form
  alert('Edit functionality coming soon!');
}

// ===== Project Management =====
function setupProjectForm() {
  const form = document.getElementById('project-form');
  const orgSelect = document.getElementById('project-org');
  const requiredSkillsGroup = document.getElementById('required-skills-group');

  // Load organizations
  const orgs = DataManager.getOrganizations();
  orgs.forEach(org => {
    const option = document.createElement('option');
    option.value = org.id;
    option.textContent = org.name;
    orgSelect.appendChild(option);
  });

  // Generate skill checkboxes
  ALL_SKILLS.forEach(skill => {
    const label = document.createElement('label');
    label.className = 'checkbox-item';
    label.innerHTML = `
      <input type="checkbox" name="required-skills" value="${skill}">
      <label>${skill}</label>
    `;
    requiredSkillsGroup.appendChild(label);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const selectedSkills = Array.from(form.querySelectorAll('input[name="required-skills"]:checked'))
      .map(cb => cb.value);

    if (selectedSkills.length === 0) {
      alert('Please select at least one required skill');
      return;
    }

    const newProject = {
      organizationId: parseInt(document.getElementById('project-org').value),
      name: document.getElementById('project-name').value,
      type: document.getElementById('project-type').value,
      requiredSkills: selectedSkills,
      positions: parseInt(document.getElementById('project-positions').value)
    };

    DataManager.addProject(newProject);
    form.reset();
    alert('Project added successfully!');
    loadManageEmployersView();
  });
}

function loadManageEmployersView() {
  const projects = DataManager.getProjects();
  const table = document.getElementById('projects-table');

  if (projects.length === 0) {
    table.innerHTML = '<p class="empty-state">No projects added yet</p>';
    return;
  }

  const html = `
    <table class="table">
      <thead>
        <tr>
          <th>Project</th>
          <th>Organization</th>
          <th>Type</th>
          <th>Required Skills</th>
          <th>Positions</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${projects.map(proj => {
          const org = DataManager.getOrganizationById(proj.organizationId);
          return `
            <tr>
              <td><strong>${proj.name}</strong></td>
              <td>${org.name}</td>
              <td>${proj.type}</td>
              <td><div class="skills-list">${proj.requiredSkills.map(s => `<span class="skill-tag">${s}</span>`).join('')}</div></td>
              <td><strong>${proj.positions}</strong></td>
              <td>
                <div class="table-actions">
                  <button class="btn btn-small btn-secondary" onclick="editProject(${proj.id})">Edit</button>
                  <button class="btn btn-small btn-danger" onclick="deleteProjectConfirm(${proj.id})">Delete</button>
                </div>
              </td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;

  table.innerHTML = html;
}

function deleteProjectConfirm(id) {
  if (confirm('Are you sure you want to delete this project?')) {
    DataManager.deleteProject(id);
    loadManageEmployersView();
  }
}

function editProject(id) {
  alert('Edit functionality coming soon!');
}

// ===== Dashboard Filters =====
function setupDashboardFilters() {
  const devFilter = document.getElementById('developer-filter');
  const empFilter = document.getElementById('employer-filter');

  // Load developers
  const developers = DataManager.getDevelopers();
  developers.forEach(dev => {
    const option = document.createElement('option');
    option.value = dev.id;
    option.textContent = `${dev.name} (${dev.level})`;
    devFilter.appendChild(option);
  });

  devFilter.addEventListener('change', (e) => {
    if (e.target.value) {
      loadDeveloperMatches(parseInt(e.target.value));
    } else {
      document.getElementById('developer-matches').innerHTML =
        '<p class="empty-state">Select your profile to see matching opportunities</p>';
    }
  });

  // Load organizations
  const orgs = DataManager.getOrganizations();
  orgs.forEach(org => {
    const option = document.createElement('option');
    option.value = org.id;
    option.textContent = org.name;
    empFilter.appendChild(option);
  });

  empFilter.addEventListener('change', (e) => {
    if (e.target.value) {
      loadEmployerMatches(parseInt(e.target.value));
    } else {
      document.getElementById('employer-matches').innerHTML =
        '<p class="empty-state">Select your organization to see available talent matches</p>';
    }
  });
}

function loadDeveloperDashboard() {
  const developers = DataManager.getDevelopers();
  const devFilter = document.getElementById('developer-filter');
  devFilter.innerHTML = '<option value="">Select Your Profile...</option>';

  developers.forEach(dev => {
    const option = document.createElement('option');
    option.value = dev.id;
    option.textContent = `${dev.name} (${dev.level})`;
    devFilter.appendChild(option);
  });
}

function loadEmployerDashboard() {
  const orgs = DataManager.getOrganizations();
  const empFilter = document.getElementById('employer-filter');
  empFilter.innerHTML = '<option value="">Select Your Organization...</option>';

  orgs.forEach(org => {
    const option = document.createElement('option');
    option.value = org.id;
    option.textContent = org.name;
    empFilter.appendChild(option);
  });
}

function loadDeveloperMatches(developerId) {
  const matches = MatchingEngine.findProjectsForDeveloper(developerId);
  const container = document.getElementById('developer-matches');

  if (matches.length === 0) {
    container.innerHTML = '<p class="empty-state">No projects available at this time</p>';
    return;
  }

  container.innerHTML = matches.map(match => {
    const org = DataManager.getOrganizationById(match.project.organizationId);
    const color = getMatchColor(match.score);

    return `
      <div class="match-card">
        <h3>${match.project.name}</h3>
        <p class="match-card-org">${org.name}</p>

        <div class="match-info">
          <div>
            <div class="match-label">Your Match Score</div>
            <div style="font-size: 1.5rem; font-weight: 700; color: ${color};">${match.score}%</div>
          </div>
          <div>
            <div class="match-label">Confidence</div>
            <div style="font-weight: 600; color: ${color};">${match.confidence}</div>
          </div>
        </div>

        <div class="match-bar">
          <div class="match-bar-fill" style="width: ${match.score}%; background: linear-gradient(90deg, ${color}, ${color});"></div>
        </div>

        <div style="margin-top: 1rem;">
          <div class="match-label">Skills Match</div>
          <div class="skills-list">
            ${match.matchedSkills.map(s => `<span class="skill-tag matched">${s}</span>`).join('')}
            ${match.missingSkills.map(s => `<span class="skill-tag needed">${s}</span>`).join('')}
          </div>
        </div>

        <div style="margin-top: 1rem;">
          <p><strong>Project Type:</strong> ${match.project.type}</p>
          <p><strong>Positions:</strong> ${match.project.positions}</p>
        </div>
      </div>
    `;
  }).join('');
}

function loadEmployerMatches(organizationId) {
  const org = DataManager.getOrganizationById(organizationId);
  const projects = DataManager.getOrganizationProjects(organizationId);
  const container = document.getElementById('employer-matches');

  if (projects.length === 0) {
    container.innerHTML = '<p class="empty-state">No projects added yet. <a href="#" onclick="switchView(\'manage-employers\')" class="btn btn-small btn-primary">Create a project</a></p>';
    return;
  }

  container.innerHTML = projects.map(project => {
    const matches = MatchingEngine.findDevelopersForProject(project.id);
    const topMatches = matches.slice(0, 3);

    return `
      <div class="match-card">
        <h3>${project.name}</h3>
        <p class="match-card-org">${project.type}</p>

        <div class="match-info">
          <div>
            <div class="match-label">Available Matches</div>
            <div style="font-size: 1.5rem; font-weight: 700;">${matches.length}</div>
          </div>
          <div>
            <div class="match-label">Positions</div>
            <div style="font-size: 1.5rem; font-weight: 700;">${project.positions}</div>
          </div>
        </div>

        <div style="margin-top: 1rem;">
          <div class="match-label">Required Skills</div>
          <div class="skills-list">
            ${project.requiredSkills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
          </div>
        </div>

        <div style="margin-top: 1rem; border-top: 1px solid #e2e8f0; padding-top: 1rem;">
          <div class="match-label">Top Developer Matches</div>
          ${topMatches.length > 0 ? `
            <div style="margin-top: 0.5rem;">
              ${topMatches.map(m => `
                <div style="padding: 0.75rem; border-bottom: 1px solid #e2e8f0; background-color: #fafafa;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong>${m.developer.name}</strong>
                    <span style="background-color: ${getMatchColor(m.score)}; color: white; padding: 0.25rem 0.75rem; border-radius: 4px; font-weight: 600; font-size: 0.9rem;">${m.score}%</span>
                  </div>
                  <small style="color: #718096; display: block; margin: 0.3rem 0;">${m.developer.level} • ${m.matchedCount}/${m.requiredCount} skills match</small>
                  <div style="margin-top: 0.5rem; display: flex; flex-wrap: wrap; gap: 0.4rem;">
                    ${m.matchedSkills.map(s => `<span style="background-color: #c6f6d5; color: #22543d; padding: 0.25rem 0.5rem; border-radius: 3px; font-size: 0.8rem; font-weight: 500;">${s}</span>`).join('')}
                    ${m.missingSkills.map(s => `<span style="background-color: #fed7d7; color: #742a2a; padding: 0.25rem 0.5rem; border-radius: 3px; font-size: 0.8rem; font-weight: 500; border: 1px solid #fc8181;">${s}</span>`).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          ` : '<p style="color: #718096; font-size: 0.9rem;">No matches yet</p>'}
        </div>
      </div>
    `;
  }).join('');
}

// ===== Admin Panel =====
function setupAdminPanel() {
  // Admin buttons are handled inline
}

function loadAdminPanel() {
  const data = DataManager.getData();

  // Update statistics
  document.getElementById('total-developers').textContent = data.developers.length;
  document.getElementById('total-projects').textContent = data.projects.length;
  document.getElementById('total-employers').textContent = data.organizations.length;
  document.getElementById('total-skills').textContent = ALL_SKILLS.length;

  // Show raw data
  document.getElementById('data-export').value = DataManager.exportJSON();
}

function exportData() {
  const json = DataManager.exportJSON();
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'civic-ai-data.json';
  a.click();
  URL.revokeObjectURL(url);
}

function resetData() {
  if (confirm('Are you sure? This will reset all data to sample data.')) {
    DataManager.resetToSampleData();
    alert('Data reset successfully!');
    location.reload();
  }
}

function clearAllData() {
  if (confirm('WARNING: This will delete ALL data. Are you sure?')) {
    if (confirm('This cannot be undone. Are you absolutely sure?')) {
      DataManager.clearAllData();
      alert('All data cleared!');
      location.reload();
    }
  }
}

function loadAllData() {
  // This function can be used to load initial data into the UI
  console.log('Data loaded:', DataManager.getData());
}

// ===== About Page =====
function initializeAboutPage() {
  const buildDate = new Date();
  const year = buildDate.getFullYear();
  const month = String(buildDate.getMonth() + 1).padStart(2, '0');
  const day = String(buildDate.getDate()).padStart(2, '0');
  const hours = String(buildDate.getHours()).padStart(2, '0');
  const minutes = String(buildDate.getMinutes()).padStart(2, '0');
  const seconds = String(buildDate.getSeconds()).padStart(2, '0');

  // Format: YYYY.MM.DD-HH.MM.SS
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

// ===== Wishlist Modal =====
function initializeWishlist() {
  const slidesContainer = document.getElementById('wishlist-slides');
  const indicatorsContainer = document.getElementById('wishlist-indicators');

  // Create slides
  slidesContainer.innerHTML = WISHLIST_ITEMS.map((item, index) => `
    <div class="wishlist-slide ${index === 0 ? 'active' : ''}">
      <h3>${item.title}</h3>
      <ul>
        ${item.content.map(point => `<li>${point}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  // Create indicators
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
  // Hide current slide
  const slides = document.querySelectorAll('.wishlist-slide');
  const indicators = document.querySelectorAll('.wishlist-indicator');

  slides[currentWishlistSlide].classList.remove('active');
  slides[currentWishlistSlide].classList.add('prev');
  indicators[currentWishlistSlide].classList.remove('active');

  // Show new slide
  currentWishlistSlide = index;
  slides[currentWishlistSlide].classList.remove('prev');
  slides[currentWishlistSlide].classList.add('active');
  indicators[currentWishlistSlide].classList.add('active');

  // Update button states
  updateWishlistButtons();
}

function updateWishlistButtons() {
  const backBtn = document.querySelector('.wishlist-controls .wishlist-btn-nav:first-child');
  const forwardBtn = document.querySelector('.wishlist-controls .wishlist-btn-nav:last-child');

  backBtn.disabled = currentWishlistSlide === 0;
  forwardBtn.disabled = currentWishlistSlide === WISHLIST_ITEMS.length - 1;
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
  const modal = document.getElementById('wishlist-modal');
  if (event.target === modal) {
    closeWishlistModal();
  }
});
