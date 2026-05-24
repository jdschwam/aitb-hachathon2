# Claude AI Integration - Quick Start Guide

## Get Started in 5 Minutes

### Step 1: Get Your Claude API Key (2 min)

1. Go to **https://console.anthropic.com**
2. Sign up or login (free account)
3. Click **"API Keys"** in the left sidebar
4. Click **"Create Key"**
5. Copy the key (looks like: `sk-ant-xxxxxxxxxxxx`)
6. Save it somewhere safe!

### Step 2: Test the AI Demo (2 min)

1. Start your local server (if not running):
   ```bash
   cd /Users/dschwam3/Projects/AITB/Hackathon-3/version2
   python3 -m http.server 8000
   ```

2. Open **http://localhost:8000/AI_DEMO.html** in your browser

3. Paste your API key into the "Set Up Your Claude API Key" section

4. Click **"Save API Key"**

5. Try any demo button to see Claude AI in action!

### Step 3: Use AI in Main App (1 min)

The AI features are ready to use throughout the application:

**In Developer Dashboard:**
- Click on a developer
- View project matches
- (Coming soon) Click "AI Insight" button to get Claude explanation

**In Employer Dashboard:**
- Click on a project
- View developer matches
- (Coming soon) Click "Get Recommendations" for AI hiring insights

**In Admin Panel:**
- (Coming soon) "Generate Job Descriptions" with Claude
- (Coming soon) "Parse Resume" to auto-extract skills

---

## What You Can Do With Claude AI

### 1. **Match Explanations** 🎯
```
"Sara has strong Python and data analysis skills - perfect for the Budget 
Analytics Dashboard. She'll need to quickly learn database design, but her 
senior level suggests she can handle it in 2-3 weeks."
```

### 2. **Career Paths** 📈
```
"As a junior developer, focus on learning Node.js to complement your 
JavaScript skills. Target: Full-stack developer in 12-18 months. Recommended 
projects: Customer Portal, then Workflow System."
```

### 3. **Skill Gaps** 📚
```
"Missing: Database Design. Resources:
- Free: freeCodeCamp PostgreSQL tutorial (8 hours)
- Practice: Design the project database schema
- Timeline: 3-4 weeks for junior developer"
```

### 4. **Hiring Insights** 💼
```
"Recommendation: Hire Emily White (92% match) immediately. Michael Rodriguez 
(78% match) with 2-week training. Sarah Williams (65% match) as investment 
in junior talent. Strong team composition."
```

### 5. **Success Prediction** 🎲
```
"Success probability: 85%
Strengths: Has 3/4 skills, experience level matches complexity
Challenges: New to DevOps, needs mentoring
Timeline: Productive week 2, expert level week 8"
```

### 6. **Workforce Analysis** 🏢
```
"City of Tucson has coverage in 11/15 skills. Priority gaps: Cloud Infrastructure, 
DevOps. Recommendation: Hire 1-2 specialists + train existing team in 3 months."
```

### 7. **Job Descriptions** 📝
```
"Budget Analytics Dashboard: Transform how the City manages budgets. This 
project applies AI and data analysis to million-dollar allocation decisions. 
You'll learn scalable database design. Ideal for mid-level Python developers."
```

---

## API Usage & Costs

### Pricing
- **Input:** $3 per 1M tokens (~750K words)
- **Output:** $15 per 1M tokens (~750K words)

### Estimated Monthly Cost
- 10 insights/day × 30 days = 300 requests
- Average 500 tokens/request
- **~$1-2/month** for small team

### Free Credits
- New accounts get generous free credits
- Usually enough for weeks of testing

---

## Browser Console Commands

Open your browser console (F12) and try:

```javascript
// Check if Claude is initialized
claudeAI
// Should show: ClaudeAI { apiKey: "...", apiUrl: "..." }

// Test a simple call
await claudeAI.callClaude("Say hello!")

// Generate a match explanation
const dev = DataManager.getDeveloperById(1);
const proj = DataManager.getProjectById(1);
await claudeAI.generateMatchExplanation(dev, proj, 85)

// Analyze skill gaps
await claudeAI.analyzeSkillGaps(dev, proj)

// Generate career path
await claudeAI.generateCareerPath(dev)

// Test workforce analysis
const projects = DataManager.getOrganizationProjects(1);
const devs = DataManager.getDevelopers();
await claudeAI.analyzeWorkforceGaps("City of Tucson", projects, devs)
```

---

## Integration Examples

### In Your Own Code

```javascript
// 1. Set up API key (user provides once)
const apiKey = prompt("Enter Claude API key:");
initializeClaudeAI(apiKey);

// 2. Use Claude features
const developer = DataManager.getDeveloperById(1);
const project = DataManager.getProjectById(1);

// Get smart recommendation
const explanation = await claudeAI.generateMatchExplanation(
  developer, project, 85
);
console.log(explanation);

// Get career advice
const careerPath = await claudeAI.generateCareerPath(developer);
console.log(careerPath);

// Analyze training needs
const gaps = await claudeAI.analyzeSkillGaps(developer, project);
console.log(gaps);
```

### Add Button to Dashboard

```html
<!-- In developer-dashboard section -->
<button class="btn btn-secondary" onclick="getAIRecommendation()">
  🤖 Get AI Recommendation
</button>

<!-- In styles.css -->
<script>
async function getAIRecommendation() {
  const devId = document.getElementById('developer-filter').value;
  const dev = DataManager.getDeveloperById(parseInt(devId));
  
  const explanation = await claudeAI.generateCareerPath(dev);
  alert(explanation);
}
</script>
```

---

## Troubleshooting

### "API Key not recognized"
- ✅ Get key from **console.anthropic.com** (not OpenAI!)
- ✅ Copy full key without extra spaces
- ✅ Make sure to click "Save API Key" button
- ✅ Try refreshing the page

### "Network Error" or "Timeout"
- ✅ Check your internet connection
- ✅ Verify Claude API is online: https://status.anthropic.com
- ✅ Wait a few seconds and retry
- ✅ Try a simpler demo first

### "Feature returns blank"
- ✅ Check browser console (F12) for error messages
- ✅ Verify API key is saved: `localStorage.getItem('claude-api-key')`
- ✅ Check sample data exists: `DataManager.getDevelopers()`
- ✅ Try running a demo from AI_DEMO.html first

### "Only get partial response"
- ✅ Some features may be limited to 1024 tokens
- ✅ Try asking simpler questions first
- ✅ Refresh and try again

---

## Next Steps

### Immediate (15 min)
- [ ] Get API key from console.anthropic.com
- [ ] Test AI_DEMO.html page
- [ ] Try 2-3 different AI features
- [ ] Explore in browser console

### Short Term (30 min)
- [ ] Add AI buttons to main dashboards
- [ ] Show AI recommendations in match cards
- [ ] Test with all 10 developers and 5 projects

### Medium Term (1-2 hours)
- [ ] Create dedicated "AI Insights" dashboard
- [ ] Add career path recommendations
- [ ] Implement team composition analysis
- [ ] Generate job descriptions for all projects

### Long Term
- [ ] Save AI insights to database
- [ ] Compare AI predictions vs. actual outcomes
- [ ] Improve prompts based on feedback
- [ ] Add more Claude AI features

---

## API Methods Available

All methods in `claude-ai.js`:

| Method | Purpose | Time |
|--------|---------|------|
| `generateMatchExplanation()` | Explain a developer-project match | 3-5 sec |
| `analyzeSkillGaps()` | Identify missing skills and training | 3-5 sec |
| `generateCareerPath()` | Create career development plan | 5-8 sec |
| `generateHiringInsights()` | Strategic hiring recommendations | 5-8 sec |
| `predictMatchSuccess()` | Success probability and risk | 3-5 sec |
| `analyzeWorkforceGaps()` | Organization-wide skills analysis | 5-8 sec |
| `generateProjectDescription()` | Write job postings | 2-3 sec |
| `parseResume()` | Extract skills from resume | 5-8 sec |
| `analyzeTeamComposition()` | Team strength and gaps | 5-8 sec |
| `generateOnboardingPlan()` | First-month onboarding schedule | 5-8 sec |

---

## Security & Privacy

✅ **Safe:**
- API key stored only in your browser
- Not shared or logged anywhere
- Can clear anytime

⚠️ **Remember:**
- Don't share your API key
- Clear it if using shared computer
- Check console for errors

---

## File Structure

```
version2/
├── index.html               - Main application
├── claude-ai.js            - ✨ NEW: Claude AI methods
├── config.js               - ✨ NEW: Configuration setup
├── AI_DEMO.html            - ✨ NEW: Interactive demo
├── AI_INTEGRATION_PLAN.md   - Full documentation
├── CLAUDE_AI_QUICKSTART.md  - This file
├── data.js                 - Data management
├── matching-engine.js      - Matching algorithm
├── app.js                  - Main app logic
├── styles.css              - Styling
└── README.md               - Original docs
```

---

## Questions?

Check:
1. **AI_DEMO.html** - See live examples
2. **claude-ai.js** - See code comments
3. **AI_INTEGRATION_PLAN.md** - Full technical details
4. **Browser console** (F12) - See errors and debug

---

## Ready to Go! 🚀

Your application now has access to Claude AI's intelligence for:
- Smart recommendations
- Career guidance
- Skill gap analysis
- Hiring strategy
- Team optimization
- And more!

**Next: Open AI_DEMO.html and try it now!**

