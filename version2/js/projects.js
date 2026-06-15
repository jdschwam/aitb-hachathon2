// ===== Project Management Module =====

function setupProjectForm() {
  const form = document.getElementById('project-form');
  const orgSelect = document.getElementById('project-org');
  const requiredSkillsGroup = document.getElementById('required-skills-group');

  const orgs = DataManager.getOrganizations();
  orgs.forEach(org => {
    const option = document.createElement('option');
    option.value = org.id;
    option.textContent = org.name;
    orgSelect.appendChild(option);
  });

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
