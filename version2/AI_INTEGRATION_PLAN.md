# Claude AI Integration Plan for Civic AI Talent Match

## Overview

This document outlines how to integrate Claude API into the Version 2 application to add AI-powered smart recommendations and career insights.

## Prerequisites: Getting Your Claude API Key

### Step 1: Create Anthropic Account
1. Go to https://console.anthropic.com
2. Sign up with your email or Google account
3. Verify your email address

### Step 2: Generate API Key
1. Click on your profile icon (top right)
2. Select "API Keys"
3. Click "Create Key"
4. Copy and save somewhere safe (you'll only see it once)
5. Example format: `sk-ant-xxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Step 3: Keep API Key Secure
- **NEVER commit to GitHub**
- Store in `.env` file (add to .gitignore)
- Use environment variables in production
- For this demo, we'll use a simple configuration

## Implementation Architecture

### Current Architecture
```
┌─────────────────────────────────┐
│        Browser (Frontend)       │
├─────────────────────────────────┤
│  index.html (UI)                │
│  app.js (Logic)                 │
│  matching-engine.js (Algorithm) │
│  data.js (localStorage)         │
│  styles.css (Styling)           │
└─────────────────────────────────┘
```

### Enhanced Architecture with Claude API
```
┌─────────────────────────────────────────────┐
│          Browser (Frontend)                 │
├─────────────────────────────────────────────┤
│  index.html (UI + AI Panel)                 │
│  app.js (Logic)                             │
│  matching-engine.js (Algorithm)             │
│  claude-ai.js (NEW - AI Integration)        │
│  data.js (localStorage)                     │
│  styles.css (Styling)                       │
└──────────────────┬──────────────────────────┘
                   │ HTTPS Request
                   ▼
┌─────────────────────────────────────────────┐
│     Claude API (https://api.anthropic.com)  │
├─────────────────────────────────────────────┤
│  Claude 3.5 Sonnet (Fast & Smart)           │
│  - Generates recommendations                │
│  - Analyzes skill gaps                      │
│  - Creates career paths                     │
│  - Explains matches                         │
└─────────────────────────────────────────────┘
```

## Implementation Steps

### Step 1: Create AI Integration Module

Create a new file: `version2/claude-ai.js`

```javascript
// Civic AI Talent Match - Claude AI Integration
// Requires: Claude API Key (https://console.anthropic.com)

class ClaudeAI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiUrl = 'https://api.anthropic.com/v1/messages';
    this.model = 'claude-3-5-sonnet-20241022';
  }

  // Core API call method
  async callClaude(prompt, systemPrompt = '') {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: this.model,
          max_tokens: 1024,
          system: systemPrompt || this.getDefaultSystemPrompt(),
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`API Error: ${error.error.message}`);
      }

      const data = await response.json();
      return data.content[0].text;
    } catch (error) {
      console.error('Claude AI Error:', error);
      throw error;
    }
  }

  getDefaultSystemPrompt() {
    return `You are an AI assistant for the Civic AI Talent Match platform.
Your role is to help match developers with projects and provide career guidance.
Be concise, professional, and helpful.
Focus on practical advice and actionable insights.
Always mention specific skills when relevant.`;
  }

  // Feature 1: Generate Smart Match Explanation
  async generateMatchExplanation(developer, project, matchScore) {
    const prompt = `
A developer is considering a project opportunity.

Developer Profile:
- Name: ${developer.name}
- Level: ${developer.level}
- Skills: ${developer.skills.join(', ')}

Project:
- Name: ${project.name}
- Type: ${project.type}
- Required Skills: ${project.requiredSkills.join(', ')}

Match Score: ${matchScore}%

Please provide a 2-3 sentence professional explanation of this match:
1. Why this is a good (or challenging) opportunity
2. Key aligned skills
3. Brief recommendation
Keep it conversational but professional.`;

    return await this.callClaude(prompt);
  }

  // Feature 2: Analyze Skill Gaps and Training Needs
  async analyzeSkillGaps(developer, project) {
    const matchedSkills = developer.skills.filter(s => 
      project.requiredSkills.includes(s)
    );
    const missingSkills = project.requiredSkills.filter(s =>
      !developer.skills.includes(s)
    );

    const prompt = `
Developer Skills Analysis:

Developer: ${developer.name} (${developer.level} Level)
Has: ${matchedSkills.join(', ') || 'None of the required skills'}
Missing: ${missingSkills.join(', ') || 'None - has all skills'}

Project: ${project.name}

Provide specific, actionable learning recommendations for the missing skills:
1. List each missing skill
2. Suggest 1-2 free/affordable resources (online courses, tutorials)
3. Estimate learning time for a ${developer.level.toLowerCase()} developer
4. How to apply learning in this project

Keep it practical and encouraging.`;

    return await this.callClaude(prompt);
  }

  // Feature 3: Generate Career Development Path
  async generateCareerPath(developer) {
    const prompt = `
Create a career development path for this developer:

Name: ${developer.name}
Current Level: ${developer.level}
Current Skills: ${developer.skills.join(', ')}

Based on their current skills and level, suggest:
1. Next skill to learn (that builds on current skills)
2. Recommended projects they should pursue next (3-6 months)
3. Skills to develop for senior level (if junior/mid)
4. Career growth timeline
5. Types of roles they're qualified for now vs. future

Make it specific and motivating.`;

    return await this.callClaude(prompt);
  }

  // Feature 4: Generate Employer Hiring Insights
  async generateHiringInsights(project, matchedDevelopers) {
    const topMatches = matchedDevelopers.slice(0, 5);
    const topInfo = topMatches.map(m => 
      `${m.developer.name} (${m.score}% match, ${m.developer.level}): ${m.developer.skills.join(', ')}`
    ).join('\n');

    const prompt = `
You're advising an employer on hiring for this project:

Project: ${project.name}
Type: ${project.type}
Required Skills: ${project.requiredSkills.join(', ')}
Positions Available: ${project.positions}

Top Available Developers:
${topInfo}

Provide hiring recommendations:
1. Which developers to prioritize and why
2. Potential team composition (if hiring multiple)
3. Skills gaps in top candidates and training support needed
4. Risk assessment (high/medium/low for each)
5. Recommended hiring approach

Be direct and actionable.`;

    return await this.callClaude(prompt);
  }

  // Feature 5: Match Success Prediction
  async predictMatchSuccess(developer, project, historicalData = null) {
    const prompt = `
Predict the likelihood of success for this developer-project match:

Developer: ${developer.name}
Level: ${developer.level}
Skills: ${developer.skills.join(', ')}

Project: ${project.name}
Type: ${project.type}
Required: ${project.requiredSkills.join(', ')}

Provide:
1. Success probability (%)
2. Key success factors
3. Potential challenges
4. Recommendations to increase success
5. Best-case and worst-case outcomes

Be realistic and data-driven in your assessment.`;

    return await this.callClaude(prompt);
  }

  // Feature 6: Skill Gap Analysis for Organization
  async analyzeOrganizationGaps(organization, projects, developers) {
    const allNeededSkills = [...new Set(projects.flatMap(p => p.requiredSkills))];
    const availableSkills = [...new Set(developers.flatMap(d => d.skills))];
    const gapSkills = allNeededSkills.filter(s => !availableSkills.includes(s));

    const prompt = `
Workforce gap analysis for ${organization.name}:

All Projects Need: ${allNeededSkills.join(', ')}
Developers Have: ${availableSkills.join(', ')}
Skills Gaps: ${gapSkills.length > 0 ? gapSkills.join(', ') : 'None - all skills covered'}

Provide:
1. Priority skills to recruit or train
2. Training recommendations for existing developers
3. Hiring strategy to fill gaps
4. Timeline for closing gaps
5. Cost-benefit of training vs. hiring

Make it strategic and practical.`;

    return await this.callClaude(prompt);
  }

  // Feature 7: Generate Project Description
  async generateProjectDescription(projectName, projectType, requiredSkills) {
    const prompt = `
Write a compelling job posting description for this project:

Title: ${projectName}
Type: ${projectType}
Skills Needed: ${requiredSkills.join(', ')}

Create a 3-4 sentence description that:
1. Explains what the project does
2. Why it matters to the organization
3. What developers will learn
4. Who should apply

Make it engaging and professional.`;

    return await this.callClaude(prompt);
  }

  // Feature 8: Resume/Profile Analysis
  async analyzeResume(resumeText) {
    const prompt = `
Analyze this resume and extract professional information:

${resumeText}

Extract and format as JSON:
{
  "name": "extracted name",
  "experience_level": "junior/mid/senior",
  "skills": ["skill1", "skill2", ...],
  "years_experience": number,
  "key_achievements": ["achievement1", ...],
  "best_fit_projects": "project types they'd excel at"
}`;

    return await this.callClaude(prompt);
  }
}

// Initialize with API key
function initializeClaudeAI(apiKey) {
  window.claudeAI = new ClaudeAI(apiKey);
  console.log('Claude AI initialized successfully');
}
```

### Step 2: Add API Key Configuration

Create `version2/config.js`:

```javascript
// Configuration for Claude AI
// IMPORTANT: Keep your API key secure!

const CONFIG = {
  // Get your API key from: https://console.anthropic.com
  CLAUDE_API_KEY: '', // Leave empty and set via localStorage
  
  // AI Feature Toggles
  FEATURES: {
    SMART_RECOMMENDATIONS: true,
    CAREER_INSIGHTS: true,
    SKILL_GAP_ANALYSIS: true,
    HIRING_INSIGHTS: true,
    RESUME_PARSER: true
  },

  // API Settings
  API: {
    MODEL: 'claude-3-5-sonnet-20241022',
    MAX_TOKENS: 1024,
    TIMEOUT: 30000
  }
};

// Load API key from user input or localStorage
function getClaudeApiKey() {
  const stored = localStorage.getItem('claude-api-key');
  if (stored) return stored;
  
  const userKey = prompt('Enter your Claude API key (from https://console.anthropic.com):');
  if (userKey) {
    localStorage.setItem('claude-api-key', userKey);
    return userKey;
  }
  return null;
}

// Setup on page load
document.addEventListener('DOMContentLoaded', () => {
  if (CONFIG.FEATURES.SMART_RECOMMENDATIONS || 
      CONFIG.FEATURES.CAREER_INSIGHTS) {
    const apiKey = getClaudeApiKey();
    if (apiKey) {
      initializeClaudeAI(apiKey);
    }
  }
});
```

### Step 3: Update index.html

Add script references and new UI sections:

```html
<!-- Add before closing </head> tag -->
<script src="config.js"></script>
<script src="claude-ai.js"></script>

<!-- Add new section in main app after employer-dashboard section -->
<section id="ai-insights" class="view">
  <div class="container">
    <div class="header">
      <h2>🤖 AI-Powered Insights</h2>
      <p>Get personalized recommendations from Claude AI</p>
    </div>

    <div class="ai-controls">
      <select id="ai-context" class="filter-select">
        <option value="">Select a developer or project...</option>
      </select>
      <select id="ai-feature" class="filter-select">
        <option value="">Select an analysis...</option>
        <option value="match-explanation">Match Explanation</option>
        <option value="skill-gaps">Skill Gap Analysis</option>
        <option value="career-path">Career Development Path</option>
        <option value="hiring-insights">Hiring Insights</option>
        <option value="success-prediction">Success Prediction</option>
      </select>
      <button class="btn btn-primary" onclick="generateAIInsight()">Generate Insight</button>
    </div>

    <div id="ai-loading" class="ai-loading" style="display: none;">
      <p>🤖 Claude is thinking...</p>
      <div class="spinner"></div>
    </div>

    <div id="ai-result" class="ai-result"></div>
  </div>
</section>
```

### Step 4: Update app.js

Add AI insight generation functions:

```javascript
async function generateAIInsight() {
  if (!window.claudeAI) {
    alert('Claude API not initialized. Please provide your API key.');
    return;
  }

  const context = document.getElementById('ai-context').value;
  const feature = document.getElementById('ai-feature').value;
  const loading = document.getElementById('ai-loading');
  const result = document.getElementById('ai-result');

  if (!context || !feature) {
    alert('Please select both a context and an analysis type');
    return;
  }

  loading.style.display = 'block';
  result.innerHTML = '';

  try {
    let insight = '';
    
    if (feature === 'match-explanation') {
      // Get developer and project
      const dev = DataManager.getDeveloperById(parseInt(context.split('-')[0]));
      const proj = DataManager.getProjectById(parseInt(context.split('-')[1]));
      const matches = MatchingEngine.findProjectsForDeveloper(dev.id);
      const match = matches.find(m => m.project.id === proj.id);
      insight = await window.claudeAI.generateMatchExplanation(dev, proj, match.score);
    } else if (feature === 'skill-gaps') {
      const dev = DataManager.getDeveloperById(parseInt(context));
      const proj = DataManager.getProjectById(parseInt(context));
      // Implementation continues...
    }
    // Add other features similarly

    displayAIResult(insight);
  } catch (error) {
    result.innerHTML = `<p class="error">Error: ${error.message}</p>`;
  } finally {
    loading.style.display = 'none';
  }
}

function displayAIResult(insight) {
  const result = document.getElementById('ai-result');
  result.innerHTML = `
    <div class="ai-insight-card">
      <div class="ai-insight-content">
        ${insight}
      </div>
      <button class="btn btn-small btn-outline" onclick="copyToClipboard()">
        Copy to Clipboard
      </button>
    </div>
  `;
}

function copyToClipboard() {
  const text = document.querySelector('.ai-insight-content').textContent;
  navigator.clipboard.writeText(text);
  alert('Copied to clipboard!');
}
```

### Step 5: Update styles.css

Add AI panel styling:

```css
/* AI Insights Panel */
.ai-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.ai-loading {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: white;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.spinner {
  border: 4px solid rgba(255,255,255,0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin: 1rem auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.ai-insight-card {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  border-left: 4px solid var(--primary-color);
}

.ai-insight-content {
  color: var(--text-dark);
  line-height: 1.8;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.error {
  color: var(--danger-color);
  padding: 1rem;
  background: #fed7d7;
  border-radius: 6px;
}
```

## Features to Implement

### 1. Smart Match Explanations
**When:** Developer or employer views a match
**What:** Claude explains why it's a good/challenging match
**Example Output:**
```
"Sarah's strong React and UI/UX skills make her an excellent fit for this 
Portal project. She has 2 of 4 required skills and her junior level aligns 
well with the project's need for fresh perspective. She'll need to learn 
Node.js quickly, but with mentoring, this is a great growth opportunity."
```

### 2. Career Insights
**When:** Developer views their dashboard
**What:** Personalized career development path
**Example Output:**
```
"As a Junior developer with JavaScript and React skills, your next steps:
1. Learn Node.js (complements your frontend skills) - 4-6 weeks with projects
2. Target: Backend developer or Full-stack roles
3. Recommended projects: Customer Portal, Workflow System
4. Timeline to Mid-level: 12-18 months with consistent practice"
```

### 3. Skill Gap Analysis
**When:** Employer views a project
**What:** Detailed analysis of missing skills and training needs
**Example Output:**
```
"Your project needs Database Design. Current developers lack this skill.
Options:
1. Hire specialist: Cost $80-120K, 2-4 week onboarding
2. Train existing: Pick Michael Rodriguez, 6-8 weeks to competency
3. Hybrid: Use specialist for architecture, Michael for implementation"
```

### 4. Hiring Insights
**When:** Employer wants to make hiring decisions
**What:** Strategic recommendations on which developers to hire
**Example Output:**
```
"For your 3 positions:
- Position 1: Hire Emily White (92% match) - immediate productivity
- Position 2: Hire Michael Rodriguez (78% match) + 2-week training
- Position 3: Hire and train Sarah Williams (65% match) - investment in growth
Team composition: Strong backend (Emily) + learning curve (Sarah) balanced well"
```

### 5. Success Prediction
**When:** Evaluating risk of a match
**What:** Probability of success with guidance
**Example Output:**
```
"Match Success: 85% probability
Strengths: Has 3/4 required skills, senior level matches complexity
Challenges: New to DevOps, may need paired programming
Recommendation: Green light, but assign mentor for DevOps aspects
Timeline: Productive in 2-3 weeks, expert in 8-10 weeks"
```

## Testing the Integration

### Test 1: Basic API Connection
```javascript
// In browser console
claudeAI.callClaude("Say 'Hello from Claude!' in one sentence")
  .then(response => console.log(response))
  .catch(error => console.error(error))
```

### Test 2: Match Explanation
```javascript
const dev = DataManager.getDeveloperById(1);
const proj = DataManager.getProjectById(1);
claudeAI.generateMatchExplanation(dev, proj, 78)
  .then(response => console.log(response))
```

### Test 3: Career Path
```javascript
const dev = DataManager.getDeveloperById(1);
claudeAI.generateCareerPath(dev)
  .then(response => console.log(response))
```

## Security Considerations

### API Key Protection
```javascript
// GOOD: Store in user's localStorage (for demo)
localStorage.setItem('claude-api-key', userKey);

// BETTER: For production, use backend proxy
// Frontend → Your Backend → Claude API
// Backend validates requests and rate limits
```

### Rate Limiting
```javascript
const RATE_LIMITS = {
  maxRequestsPerMinute: 10,
  requestTimeout: 30000
};
```

## Cost Estimation

**Claude 3.5 Sonnet Pricing** (as of May 2024):
- Input: $3 per 1M tokens (~750K words)
- Output: $15 per 1M tokens (~750K words)

**Estimated Usage:**
- 5 AI insights per day × 30 days = 150 requests/month
- Average: 500 tokens per request
- Cost: ~$2.50/month for small teams

## Next Steps

1. **Get API Key** (5 min)
   - Visit https://console.anthropic.com
   - Create free account
   - Generate API key

2. **Implement claude-ai.js** (30 min)
   - Create the module with all methods
   - Add proper error handling
   - Test with console commands

3. **Update UI** (20 min)
   - Add AI panel to index.html
   - Update styles.css
   - Add button to navigation

4. **Integrate into App** (20 min)
   - Connect to dashboards
   - Add AI insight buttons
   - Test all features

5. **Deploy & Demo** (10 min)
   - Push to GitHub
   - Show stakeholders AI capabilities
   - Gather feedback

**Total Implementation Time: ~90 minutes**

## Success Criteria

✅ AI insights generate without errors
✅ Smart recommendations are relevant
✅ Career paths are actionable
✅ Skill gap analysis shows real gaps
✅ Hiring insights are strategic
✅ Response time < 10 seconds
✅ Users find value in recommendations
✅ Can easily add more AI features

## Support & Troubleshooting

**"API Key not recognized"**
- Check key is from https://console.anthropic.com (not OpenAI)
- Verify no extra spaces in key
- Try regenerating key

**"Rate limit exceeded"**
- Limit requests to <10 per minute
- Add delay between requests
- Implement request queuing

**"Timeout errors"**
- Increase timeout to 30-40 seconds
- Check internet connection
- Verify Claude API is up

**"Response quality poor"**
- Improve system prompt (be more specific)
- Add more context to user prompt
- Iterate on prompt engineering

## Future Enhancements

1. **Caching** - Store common recommendations
2. **Feedback Loop** - Track which recommendations work best
3. **Learning** - Improve recommendations over time
4. **Integration** - Connect to real job boards
5. **Analytics** - Track success rates of recommendations
6. **Persistence** - Save generated insights to database

