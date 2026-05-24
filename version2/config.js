// Configuration for Claude AI Integration
// Get your API key from: https://console.anthropic.com

const CONFIG = {
  // Claude AI Settings
  CLAUDE: {
    ENABLED: true,
    API_KEY: localStorage.getItem('claude-api-key') || '', // Loaded from localStorage
    MODEL: 'claude-3-5-sonnet-20241022',
    MAX_TOKENS: 1024,
    TIMEOUT: 30000
  },

  // Feature Toggles
  AI_FEATURES: {
    SMART_RECOMMENDATIONS: true,
    CAREER_INSIGHTS: true,
    SKILL_GAP_ANALYSIS: true,
    HIRING_INSIGHTS: true,
    TEAM_COMPOSITION: true,
    ONBOARDING_PLANS: true,
    RESUME_PARSER: true,
    WORKFORCE_ANALYSIS: true,
    MATCH_EXPLANATIONS: true,
    SUCCESS_PREDICTION: true
  },

  // UI Settings
  UI: {
    THEME: 'light', // light or dark
    ANIMATIONS: true,
    SHOW_API_STATUS: true
  }
};

/**
 * Request API key from user and store it
 */
function requestClaudeApiKey() {
  const currentKey = localStorage.getItem('claude-api-key');
  if (currentKey) {
    const useExisting = confirm('You have a saved API key. Use it? (Cancel to enter a new one)');
    if (useExisting) {
      return currentKey;
    }
  }

  const apiKey = prompt(
    'Enter your Claude API key (get one at https://console.anthropic.com):\n\n' +
    'It will be stored locally in your browser for this session.'
  );

  if (apiKey && apiKey.trim() !== '') {
    localStorage.setItem('claude-api-key', apiKey.trim());
    return apiKey.trim();
  }

  return null;
}

/**
 * Clear stored API key
 */
function clearClaudeApiKey() {
  localStorage.removeItem('claude-api-key');
  console.log('Claude API key cleared');
}

/**
 * Check if Claude AI is properly initialized
 */
function isClaudeAvailable() {
  return typeof claudeAI !== 'undefined' && claudeAI !== null;
}

/**
 * Setup Claude AI on page load
 */
function setupClaudeAI() {
  if (!CONFIG.CLAUDE.ENABLED) {
    console.log('Claude AI is disabled in configuration');
    return false;
  }

  let apiKey = localStorage.getItem('claude-api-key');

  if (!apiKey) {
    console.log('No Claude API key found. User must provide one to use AI features.');
    return false;
  }

  if (initializeClaudeAI(apiKey)) {
    CONFIG.CLAUDE.API_KEY = apiKey;
    console.log('✅ Claude AI is ready for use');
    return true;
  }

  return false;
}

/**
 * Log current configuration
 */
function logConfiguration() {
  console.log('=== Civic AI Talent Match Configuration ===');
  console.log('Claude AI Enabled:', CONFIG.CLAUDE.ENABLED);
  console.log('API Key Present:', !!localStorage.getItem('claude-api-key'));
  console.log('AI Features Enabled:');
  Object.entries(CONFIG.AI_FEATURES).forEach(([feature, enabled]) => {
    console.log(`  ${feature}: ${enabled ? '✅' : '❌'}`);
  });
}

// Setup on page load
document.addEventListener('DOMContentLoaded', () => {
  logConfiguration();
  setupClaudeAI();
});
