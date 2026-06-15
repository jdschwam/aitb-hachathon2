// Paste this into the browser console (Ctrl+Shift+I / F12) on the app to load all data
(async function loadAllFiles() {
  console.log('Loading data files...');
  
  try {
    // Load engineers
    const engRes = await fetch('/data/civic-engineers.json');
    const engineers = await engRes.json();
    console.log('✓ Loaded', engineers.length, 'engineers');
    
    // Load projects
    const projRes = await fetch('/data/projects.json');
    const projects = await projRes.json();
    console.log('✓ Loaded', projects.length, 'projects');
    
    // Load organizations
    const orgRes = await fetch('/data/organizations.json');
    const organizations = await orgRes.json();
    console.log('✓ Loaded', organizations.length, 'organizations');
    
    // Combine and save to localStorage
    const data = {
      developers: engineers,
      projects: projects,
      organizations: organizations,
      lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem('civic-ai-talent-match-data', JSON.stringify(data));
    console.log('✓ All data saved to localStorage');
    console.log('✓ Reloading page...');
    
    // Reload the page to see the data
    setTimeout(() => location.reload(), 500);
  } catch (error) {
    console.error('Error loading data:', error);
  }
})();
