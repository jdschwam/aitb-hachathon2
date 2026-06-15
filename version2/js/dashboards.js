// ===== Dashboard Module =====

function setupDashboardFilters() {
  const empFilter = document.getElementById('employer-filter');

  if (empFilter) {
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
