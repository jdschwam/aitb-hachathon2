// ===== Admin Panel Module =====

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

function setupAdminPanel() {
  // Admin buttons are handled inline
}

function loadAdminPanel() {
  const data = DataManager.getData();

  document.getElementById('total-developers').textContent = data.developers.length;
  document.getElementById('total-projects').textContent = data.projects.length;
  document.getElementById('total-organizations').textContent = data.organizations.length;
  document.getElementById('total-skills').textContent = ALL_SKILLS.length;

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

function loadDataFile(fileName, filePath) {
  fetch('/' + filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const appData = DataManager.getData();

      if (fileName === 'Civic Engineers') {
        const engineers = data.engineers || data;
        appData.developers = engineers;
        DataManager.saveData(appData);
        if (document.getElementById('developer-dashboard').classList.contains('active')) {
          loadDeveloperDashboard();
        }
        alert(`✅ Loaded ${fileName} (${engineers.length} engineers)`);
      } else if (fileName === 'Projects') {
        const projects = data.projects || data;
        appData.projects = projects;
        DataManager.saveData(appData);
        if (document.getElementById('employer-dashboard').classList.contains('active')) {
          loadEmployerDashboard();
        }
        alert(`✅ Loaded ${fileName} (${projects.length} projects)`);
      } else if (fileName === 'Organizations') {
        const organizations = data.organizations || data;
        appData.organizations = organizations;
        DataManager.saveData(appData);
        alert(`✅ Loaded ${fileName} (${organizations.length} organizations)`);
      } else if (fileName === 'Overview') {
        const items = data.overview || data;
        window.OVERVIEW_ITEMS = items;
        initializeOverview();
        alert(`✅ Loaded ${fileName} (${items.length} slides)`);
      } else if (fileName === 'Wishlist') {
        const items = data.wishlist || data;
        window.WISHLIST_ITEMS = items;
        initializeWishlist();
        alert(`✅ Loaded ${fileName} (${items.length} slides)`);
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

      currentFileContext = {
        fileName: fileName,
        filePath: filePath,
        originalContent: jsonString
      };

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

      currentFileContext = {
        fileName: fileName,
        filePath: filePath,
        originalContent: jsonString
      };

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

  contentEl.value = '';
  contentEl.readOnly = true;
  currentFileContext = { fileName: '', filePath: '', originalContent: '' };

  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function cancelEditMode() {
  const contentEl = document.getElementById('file-viewer-content');
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
    JSON.parse(content);

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

function updateStats() {
  const data = DataManager.getData();
  if (!data) return;
  const devCount = document.getElementById('total-developers');
  const projCount = document.getElementById('total-projects');
  const orgCount = document.getElementById('total-organizations');
  const skillCount = document.getElementById('total-skills');

  if (devCount) devCount.textContent = data.developers.length;
  if (projCount) projCount.textContent = data.projects.length;
  if (orgCount) orgCount.textContent = data.organizations.length;
  if (skillCount) skillCount.textContent = ALL_SKILLS.length;
}

// Close file viewer modal when clicking outside
window.addEventListener('click', (event) => {
  const modal = document.getElementById('file-viewer-modal');
  if (event.target === modal) {
    closeFileViewer();
  }
});
