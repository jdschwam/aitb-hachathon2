// Quick data loader - run in browser console or Node
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'data');

// Read data files
const engineers = JSON.parse(fs.readFileSync(path.join(dataDir, 'civic-engineers.json'), 'utf8'));
const projects = JSON.parse(fs.readFileSync(path.join(dataDir, 'projects.json'), 'utf8'));
const organizations = JSON.parse(fs.readFileSync(path.join(dataDir, 'organizations.json'), 'utf8'));

// Combine into single data object
const allData = {
  developers: engineers,
  projects: projects,
  organizations: organizations,
  lastUpdated: new Date().toISOString()
};

console.log('Data loaded:');
console.log(`- ${engineers.length} engineers`);
console.log(`- ${projects.length} projects`);
console.log(`- ${organizations.length} organizations`);
console.log('\nTo use this in the app, paste into browser console:');
console.log('localStorage.setItem("civic-ai-talent-match-data", ' + JSON.stringify(JSON.stringify(allData)) + ')');
console.log('location.reload()');
