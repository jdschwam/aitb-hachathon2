// ===== Developer Management Module =====

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
}

function editDeveloper(id) {
  // This could be expanded to show an edit form
  alert('Edit functionality coming soon!');
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
