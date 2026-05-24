// Civic AI Talent Match - Main Application Logic

// Wishlist data
const WISHLIST_ITEMS = [
  {
    title: '📊 Recommended Enhancements (Prioritized)',
    content: [
      '⭐ CRITICAL PRIORITY:',
      '1. Skillset Ranking System (0-3 Scale)',
      '   - 0 = Do not know the tool',
      '   - 1 = Familiar with tool',
      '   - 2 = Functional with tool',
      '   - 3 = Expert in tool',
      '   Impact: Foundation for accurate matching algorithm',
      '',
      '2. Mobile/Cell Phone Responsive View',
      '   Impact: Critical for user adoption and accessibility',
      '',
      '🔷 HIGH PRIORITY:',
      '3. Engineer Profile Expansion',
      '   - Add interest tracks selection',
      '   - Display recommended skillsets per track',
      '   Impact: Career pathing and better engagement',
      '',
      '4. Project Description & Requirements Expansion',
      '   - More complete project descriptions',
      '   - Clearer talent requirements',
      '   Impact: Improved matching accuracy',
      '',
      '🔹 MEDIUM PRIORITY:',
      '5. General Profile Expansion (Engineers & Projects)',
      '   Impact: Supporting details and enhancements'
    ]
  },
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
let currentOverviewSlide = 0;
let currentAboutSlide = 0;

// Global data variables (can be updated when loading from files)
let OVERVIEW_ITEMS = null;
let WISHLIST_ITEMS_LOADED = null;

// Overview data
const CLIENT_OVERVIEW_ITEMS = [
  {
    title: '1️⃣ Welcome - The Civic AI Initiative',
    content: [
      'Title: "Civic AI Corps"',
      'Subtitle: "Building a Community Talent Network for Southern Arizona"',
      'We are not placing apprentices; we are building a community talent network that helps public, nonprofit, and small business partners get more done with AI',
      'Partners: Pima County, Per Scholas, AI-Trailblazers, Vantage West'
    ]
  },
  {
    title: '2️⃣ The Problem We\'re Solving',
    content: [
      'Growing gap between organizations needing AI skills and residents who could fill those roles',
      'Community nonprofits, county offices, and small businesses lack trained people',
      'Limited pathways into tech careers in underserved areas',
      'No single organization can solve this alone',
      'Coalition of 4 partners reaches 25,000+ residents combined'
    ]
  },
  {
    title: '3️⃣ The Solution - Civic Engineer Role',
    content: [
      'New Role: "Civic Engineer" (trained as "Automators")',
      'Apprentices work directly inside organizations',
      'Build secure "Copilots" and workflow automations',
      'Real projects deployed to host organizations',
      'Apprentices earn while learning',
      'Portfolio of deployed work for future employers',
      '',
      'Benefits of Being a Civic Engineer:',
      'Meaningful impact on community and public sector organizations',
      'Earn competitive apprenticeship wages while building skills',
      'Real-world project experience on your resume',
      'Career pathway into AI and automation specialization',
      'Support from mentors and learning network',
      'Opportunity to advance into leadership and technical roles'
    ]
  },
  {
    title: '4️⃣ The Shared Ecosystem Engine',
    content: [
      '1. Pima Talent Match System (Apprentice-Built)',
      '   - "Dating app" for workforce development',
      '   - For Learners: Upload skills and badges',
      '   - For Navigators: Live map of available talent',
      '   - For Employers: Subscribe to talent feeds',
      '2. Navigator & Coach Upskilling',
      '   - "AI Super-User" Certification (2-day intensive)',
      '   - Navigators become "High-Touch Career Architects"',
      '   - AI handles overhead, focus on human connection',
      '3. SciTech Education & Career Maps',
      '   - Partnership to visualize "AI On-Ramp"',
      '   - Update existing STEM ecosystem maps'
    ]
  },
  {
    title: '5️⃣ Option 1 - Modernizing Pima County Services',
    content: [
      '"We aren\'t just training employees; we are building Pima County\'s internal R&D lab"',
      'Focus: Modernizing Pima County Services & Upskilling Government',
      'Mechanism: Apprentices shadow Pima Navigators to build Copilots',
      'Outcome: Navigators get time back; Apprentices get deployed projects',
      'Partner collaboration on IT/Cybersecurity foundation + AI automation',
      'Primary customer: Pima County as "First Customer"'
    ]
  },
  {
    title: '6️⃣ Option 2 - Micro-Agency Network for Small Business',
    content: [
      '"Don\'t wait for a corporation to hire you. Become the agency that saves Main Street"',
      'Focus: Saving Local Businesses & Creating Entrepreneurs',
      'New Role: "SMB Automation Specialist" / Micro-Agency Founders',
      'Mechanism: Teams (IT grad + AI grad) paired with small businesses',
      'Deliver "Business Starter Kit" - modernizing operations',
      'Apprentices gain testimonials and start careers',
      'Support for LLC formation and business banking through Vantage West'
    ]
  },
  {
    title: '7️⃣ Partner Roles & Ecosystem',
    content: [
      'Pima County: Recruits residents, acts as "First Customer", audits workflows',
      'Per Scholas: Tucson Satellite, IT/Cybersecurity cohorts, learner support',
      'AI-Trailblazers: AI Engineer curriculum, apprenticeship programs, mentorship',
      'Vantage West: Financial wellness coaching, marketing, Micro-Agency Launchpad'
    ]
  },
  {
    title: '8️⃣ Civic AI Pilot Concierge Service',
    content: [
      'Problem: Procurement blocks quick AI pilots - months pass before anything ships',
      'Solution: Fixed-fee 30-day pilot package',
      '- Discovery, AI teammate buildout, training, ROI report',
      '- Designed to fit under procurement thresholds',
      '- Target: Public-sector IT leaders and college decision-makers',
      'Skills Required: Sales, solutions engineering, security, customer success'
    ]
  }
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  initializeWishlist();
  initializeOverview();
  initializeAbout();
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

// ===== Developer Management =====
function setupDeveloperForm() {
  const form = document.getElementById('developer-form');
  const skillsGroup = document.getElementById('skills-rating-group');

  // Track selected skills and their ratings
  const skillRatings = {};

  // Generate skill rating interface
  ALL_SKILLS.forEach(skill => {
    const row = document.createElement('div');
    row.className = 'skill-rating-row';
    row.innerHTML = `
      <div class="skill-rating-name">${skill}</div>
      <div class="skill-rating-stars">
        <button type="button" class="skill-star-selector skill-star-0" data-skill="${skill}" data-level="0" title="Not Yet">☆</button>
        <button type="button" class="skill-star-selector skill-star-1" data-skill="${skill}" data-level="1" title="Familiar">★</button>
        <button type="button" class="skill-star-selector skill-star-2" data-skill="${skill}" data-level="2" title="Functional">★</button>
        <button type="button" class="skill-star-selector skill-star-3" data-skill="${skill}" data-level="3" title="Expert">★</button>
      </div>
    `;
    skillsGroup.appendChild(row);

    // Add click handlers for stars
    row.querySelectorAll('.skill-star-selector').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const skill = btn.dataset.skill;
        const level = parseInt(btn.dataset.level);

        // Update skill ratings
        skillRatings[skill] = level;

        // Update UI - remove all selected from this skill
        row.querySelectorAll('.skill-star-selector').forEach(b => {
          b.classList.remove('selected');
        });

        // Add selected class to clicked star and all before it
        row.querySelectorAll('.skill-star-selector').forEach(b => {
          if (parseInt(b.dataset.level) <= level) {
            b.classList.add('selected');
          }
        });

        // Update row background color based on level
        row.classList.remove('has-level-1', 'has-level-2', 'has-level-3');
        if (level === 1) {
          row.classList.add('has-level-1');
        } else if (level === 2) {
          row.classList.add('has-level-2');
        } else if (level === 3) {
          row.classList.add('has-level-3');
        }
      });
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (Object.keys(skillRatings).length === 0) {
      alert('Please select at least one skill');
      return;
    }

    // Get selected skills (only those with ratings)
    const selectedSkills = Object.keys(skillRatings);

    const newDeveloper = {
      name: document.getElementById('dev-name').value,
      email: document.getElementById('dev-email').value,
      level: document.getElementById('dev-level').value,
      skills: selectedSkills,
      skillRankings: skillRatings
    };

    DataManager.addDeveloper(newDeveloper);
    form.reset();

    // Reset skill ratings for next form use
    skillRatings = {};
    document.querySelectorAll('.skill-star-selector.selected').forEach(btn => {
      btn.classList.remove('selected');
    });

    alert('Civic Engineer added successfully!');
    loadManageDevelopersView();
  });
}

function loadManageDevelopersView() {
  // This function now only handles the form setup
  // The engineers list display has been moved to loadViewEngineersView
}

function loadViewEngineersView() {
  const developers = DataManager.getDevelopers();
  const table = document.getElementById('engineers-table');

  if (developers.length === 0) {
    table.innerHTML = '<p class="empty-state">No Civic Engineers available</p>';
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
                <button class="btn btn-small btn-primary" onclick="openSkillRanking(${dev.id})">⭐ Rate Skills</button>
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
  if (confirm('Are you sure you want to delete this Civic Engineer?')) {
    DataManager.deleteDeveloper(id);
    loadViewEngineersView();
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
  const empFilter = document.getElementById('employer-filter');

  if (empFilter) {
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
}

function loadDeveloperDashboard() {
  const developers = DataManager.getDevelopers();
  const listContainer = document.getElementById('engineer-list');

  if (developers.length === 0) {
    listContainer.innerHTML = '<p class="empty-state">No engineers available</p>';
    return;
  }

  listContainer.innerHTML = developers.map(dev => {
    const skillRank = calculateEngineerSkillRank(dev);
    return `
      <div class="engineer-list-item" onclick="selectEngineer(${dev.id})" data-engineer-id="${dev.id}">
        <span class="name">${dev.name}</span>
        <span class="skill-rank">${skillRank}</span>
      </div>
    `;
  }).join('');
}

function calculateEngineerSkillRank(engineer) {
  if (!engineer.skillRankings || Object.keys(engineer.skillRankings).length === 0) {
    return '0/3';
  }

  const rankings = Object.values(engineer.skillRankings);
  const avgRank = (rankings.reduce((a, b) => a + b, 0) / rankings.length).toFixed(1);
  return `${avgRank}/3`;
}

function selectEngineer(engineerId) {
  const developers = DataManager.getDevelopers();
  const engineer = developers.find(d => d.id === engineerId);

  if (!engineer) return;

  // Update active state in list
  document.querySelectorAll('.engineer-list-item').forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('data-engineer-id') === String(engineerId)) {
      item.classList.add('active');
    }
  });

  // Display engineer details
  displayEngineerDetails(engineer);

  // Load and display matching projects
  loadDeveloperMatches(engineerId);
}

function displayEngineerDetails(engineer) {
  const container = document.getElementById('engineer-details');

  const skillsList = (engineer.skills || []).map(skill => {
    const ranking = engineer.skillRankings?.[skill] || 0;
    const levelClass = `skill-level-${ranking}`;
    const levelText = ['Not Yet', 'Familiar', 'Functional', 'Expert'][ranking];

    return `
      <div class="skill-item">
        <span class="skill-name">${skill}</span>
        <span class="skill-level ${levelClass}">${levelText}</span>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="engineer-card">
      <div class="engineer-header">
        <h2 class="engineer-name">${engineer.name}</h2>
        <div class="engineer-meta">
          <div class="engineer-meta-item">
            <strong>Level:</strong>
            <span>${engineer.level}</span>
          </div>
          <div class="engineer-meta-item">
            <strong>Email:</strong>
            <span>${engineer.email}</span>
          </div>
          <div class="engineer-meta-item">
            <strong>Skills:</strong>
            <span>${engineer.skills?.length || 0}</span>
          </div>
        </div>
      </div>

      <div class="engineer-skills">
        <h4>Technical Skills</h4>
        ${skillsList || '<p class="empty-state">No skills listed</p>'}
      </div>

      ${engineer.pathway ? `
        <div style="border-top: 1px solid #e2e8f0; padding-top: 1rem;">
          <h4>Learning Pathway</h4>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; font-size: 0.9rem;">
            <div>
              <strong>Stage:</strong> ${engineer.pathway.stage}
            </div>
            <div>
              <strong>Provider:</strong> ${engineer.pathway.provider}
            </div>
            <div>
              <strong>Status:</strong> ${engineer.pathway.status}
            </div>
            <div>
              <strong>Start Date:</strong> ${engineer.pathway.startDate}
            </div>
          </div>
        </div>
      ` : ''}
    </div>
  `;
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
  document.getElementById('total-organizations').textContent = data.organizations.length;
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
  const overviewModal = document.getElementById('overview-modal');
  if (event.target === overviewModal) {
    closeOverviewModal();
  }
  const aboutModal = document.getElementById('about-modal');
  if (event.target === aboutModal) {
    closeAboutModal();
  }
});

// ===== Overview Modal =====
function initializeOverview() {
  const slidesContainer = document.getElementById('overview-slides');
  const indicatorsContainer = document.getElementById('overview-indicators');

  // Use OVERVIEW_ITEMS if loaded, otherwise fall back to CLIENT_OVERVIEW_ITEMS
  const items = window.OVERVIEW_ITEMS || CLIENT_OVERVIEW_ITEMS;

  // Create slides
  slidesContainer.innerHTML = items.map((item, index) => `
    <div class="wishlist-slide ${index === 0 ? 'active' : ''}">
      <h3>${item.title}</h3>
      <ul>
        ${item.content.map(point => `<li>${point}</li>`).join('')}
      </ul>
    </div>
  `).join('');

  // Create indicators
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
  // Hide current slide
  const slides = document.querySelectorAll('#overview-slides .wishlist-slide');
  const indicators = document.querySelectorAll('#overview-indicators .wishlist-indicator');

  if (slides.length === 0) return;

  slides[currentOverviewSlide].classList.remove('active');
  slides[currentOverviewSlide].classList.add('prev');
  indicators[currentOverviewSlide].classList.remove('active');

  // Show new slide
  currentOverviewSlide = index;
  slides[currentOverviewSlide].classList.remove('prev');
  slides[currentOverviewSlide].classList.add('active');
  indicators[currentOverviewSlide].classList.add('active');

  // Update button states
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

// ===== About Modal =====
function initializeAbout() {
  // No slide initialization needed for scrollable modal
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

// ===== File Viewer Modal =====
let currentFileContext = {
  fileName: '',
  filePath: '',
  originalContent: ''
};

const DATA_FILES = {
  'Civic Engineers': {
    path: 'version2/data/civic-engineers.json',
    filename: 'civic-engineers.json'
  },
  'Organizations': {
    path: 'version2/data/organizations.json',
    filename: 'organizations.json'
  },
  'Projects': {
    path: 'version2/data/projects.json',
    filename: 'projects.json'
  },
  'Overview': {
    path: 'version2/data/overview-content.json',
    filename: 'overview-content.json'
  },
  'Wishlist': {
    path: 'version2/data/wishlist-content.json',
    filename: 'wishlist-content.json'
  }
};

function loadDataFile(fileName, filePath) {
  fetch('/' + filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Get current application data
      const appData = DataManager.getData();

      // Load data into application based on file type
      if (fileName === 'Civic Engineers') {
        appData.developers = data;
        DataManager.saveData(appData);
        if (document.getElementById('developer-dashboard').classList.contains('active')) {
          loadDeveloperDashboard();
        }
        alert(`✅ Loaded ${fileName} (${data.length} engineers)`);
      } else if (fileName === 'Projects') {
        appData.projects = data;
        DataManager.saveData(appData);
        if (document.getElementById('employer-dashboard').classList.contains('active')) {
          loadProjectsDashboard();
        }
        alert(`✅ Loaded ${fileName} (${data.length} projects)`);
      } else if (fileName === 'Organizations') {
        appData.organizations = data;
        DataManager.saveData(appData);
        alert(`✅ Loaded ${fileName} (${data.length} organizations)`);
      } else if (fileName === 'Overview') {
        window.OVERVIEW_ITEMS = data;
        initializeOverview();
        alert(`✅ Loaded ${fileName} (${data.length} slides)`);
      } else if (fileName === 'Wishlist') {
        window.WISHLIST_ITEMS = data;
        initializeWishlist();
        alert(`✅ Loaded ${fileName} (${data.length} slides)`);
      }

      updateStats();
    })
    .catch(error => {
      alert(`❌ Error loading ${fileName}: ${error.message}`);
      console.error('Load error:', error);
    });
}

function viewDataFile(fileName, filePath) {
  const modal = document.getElementById('file-viewer-modal');
  const titleEl = document.getElementById('file-viewer-title');
  const contentEl = document.getElementById('file-viewer-content');
  const viewModeActions = document.getElementById('view-mode-actions');
  const editModeActions = document.getElementById('edit-mode-actions');

  titleEl.textContent = fileName + ' (Read-Only)';

  // Load file content
  fetch('/' + filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const jsonString = JSON.stringify(data, null, 2);
      contentEl.value = jsonString;
      contentEl.readOnly = true;

      // Store current file context
      currentFileContext = {
        fileName: fileName,
        filePath: filePath,
        originalContent: jsonString
      };

      // Show view mode actions
      viewModeActions.style.display = 'flex';
      editModeActions.style.display = 'none';

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    })
    .catch(error => {
      contentEl.value = 'Error loading file: ' + error.message;
      contentEl.readOnly = true;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
}

function editDataFile(fileName, filePath) {
  const modal = document.getElementById('file-viewer-modal');
  const titleEl = document.getElementById('file-viewer-title');
  const contentEl = document.getElementById('file-viewer-content');
  const viewModeActions = document.getElementById('view-mode-actions');
  const editModeActions = document.getElementById('edit-mode-actions');

  titleEl.textContent = fileName + ' (Editable)';

  // Load file content
  fetch('/' + filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const jsonString = JSON.stringify(data, null, 2);
      contentEl.value = jsonString;
      contentEl.readOnly = false;

      // Store current file context
      currentFileContext = {
        fileName: fileName,
        filePath: filePath,
        originalContent: jsonString
      };

      // Show edit mode actions
      viewModeActions.style.display = 'none';
      editModeActions.style.display = 'flex';

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    })
    .catch(error => {
      contentEl.value = 'Error loading file: ' + error.message;
      contentEl.readOnly = false;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
}

function closeFileViewer() {
  const modal = document.getElementById('file-viewer-modal');
  const contentEl = document.getElementById('file-viewer-content');

  // Reset content
  contentEl.value = '';
  contentEl.readOnly = true;
  currentFileContext = { fileName: '', filePath: '', originalContent: '' };

  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function cancelEditMode() {
  const contentEl = document.getElementById('file-viewer-content');

  // Revert to original content without saving
  contentEl.value = currentFileContext.originalContent;
  closeFileViewer();
}

function downloadFile() {
  const contentEl = document.getElementById('file-viewer-content');
  const content = contentEl.value;

  if (!currentFileContext.fileName) {
    alert('No file open to download');
    return;
  }

  try {
    // Validate JSON
    JSON.parse(content);

    // Create blob and download
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = DATA_FILES[currentFileContext.fileName].filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert('File downloaded: ' + link.download);
  } catch (error) {
    alert('Invalid JSON: ' + error.message);
  }
}

function uploadFile() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';

  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target.result;
        const parsed = JSON.parse(content);

        // Validate it's valid JSON
        const contentEl = document.getElementById('file-viewer-content');
        contentEl.value = JSON.stringify(parsed, null, 2);

        alert('File uploaded and loaded. Remember to verify the data looks correct!');
      } catch (error) {
        alert('Invalid JSON file: ' + error.message);
      }
    };
    reader.readAsText(file);
  };

  input.click();
}

// Close file viewer modal when clicking outside
window.addEventListener('click', (event) => {
  const modal = document.getElementById('file-viewer-modal');
  if (event.target === modal) {
    closeFileViewer();
  }
});

// ===== Skill Ranking System =====
let currentEngineerRanking = {
  engineerId: null,
  skills: {},
  rankings: {}
};

const SKILL_LEVELS = {
  0: 'Not Yet',
  1: 'Familiar',
  2: 'Functional',
  3: 'Expert'
};

function openSkillRanking(engineerId) {
  const engineer = DataManager.getDeveloperById(engineerId);
  if (!engineer) {
    alert('Engineer not found');
    return;
  }

  currentEngineerRanking = {
    engineerId: engineerId,
    skills: engineer.skills || [],
    rankings: engineer.skillRankings || {}
  };

  const modal = document.getElementById('skill-ranking-modal');
  const title = document.getElementById('skill-ranking-title');
  const list = document.getElementById('skill-ranking-list');

  title.textContent = `Engineer: ${engineer.name} - Rate Your Skills`;

  // Build skill rating UI
  let html = '';
  currentEngineerRanking.skills.forEach(skill => {
    const currentRating = currentEngineerRanking.rankings[skill] || 0;
    html += `
      <div class="skill-rating-item">
        <div class="skill-name">${skill}</div>
        <div class="skill-stars">
          <button class="star-btn star-0 ${currentRating === 0 ? 'active' : ''}"
                  onclick="setSkillRating('${skill}', 0)" title="Not Yet">☆</button>
          <button class="star-btn star-1 ${currentRating === 1 ? 'active' : ''}"
                  onclick="setSkillRating('${skill}', 1)" title="Familiar">★</button>
          <button class="star-btn star-2 ${currentRating === 2 ? 'active' : ''}"
                  onclick="setSkillRating('${skill}', 2)" title="Functional">★</button>
          <button class="star-btn star-3 ${currentRating === 3 ? 'active' : ''}"
                  onclick="setSkillRating('${skill}', 3)" title="Expert">★</button>
        </div>
        <div class="skill-level-text">${SKILL_LEVELS[currentRating]}</div>
      </div>
    `;
  });

  list.innerHTML = html;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function setSkillRating(skill, level) {
  currentEngineerRanking.rankings[skill] = level;

  // Update UI to reflect selection
  const items = document.querySelectorAll('.skill-rating-item');
  items.forEach(item => {
    if (item.querySelector('.skill-name').textContent === skill) {
      // Update stars
      item.querySelectorAll('.star-btn').forEach((btn, idx) => {
        if (idx <= level) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      // Update level text
      item.querySelector('.skill-level-text').textContent = SKILL_LEVELS[level];
    }
  });
}

function saveSkillRankings() {
  const engineer = DataManager.getDeveloperById(currentEngineerRanking.engineerId);
  if (!engineer) {
    alert('Engineer not found');
    return;
  }

  // Update engineer with skill rankings
  engineer.skillRankings = currentEngineerRanking.rankings;

  // Save back to data
  DataManager.updateDeveloper(engineer.id, { skillRankings: engineer.skillRankings });

  alert(`Skill rankings saved for ${engineer.name}`);
  closeSkillRanking();
}

function closeSkillRanking() {
  const modal = document.getElementById('skill-ranking-modal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
  currentEngineerRanking = { engineerId: null, skills: {}, rankings: {} };
}
