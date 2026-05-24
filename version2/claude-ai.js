// Civic AI Talent Match - Claude AI Integration
// Features: Smart recommendations, career insights, skill gap analysis
// Requires: Claude API Key from https://console.anthropic.com

class ClaudeAI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiUrl = 'https://api.anthropic.com/v1/messages';
    this.model = 'claude-3-5-sonnet-20241022';
    this.requestCount = 0;
    this.lastRequestTime = 0;
    this.minRequestInterval = 100; // milliseconds between requests
  }

  /**
   * Core method to call Claude API
   */
  async callClaude(prompt, systemPrompt = '') {
    // Rate limiting
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    if (timeSinceLastRequest < this.minRequestInterval) {
      await new Promise(resolve =>
        setTimeout(resolve, this.minRequestInterval - timeSinceLastRequest)
      );
    }
    this.lastRequestTime = Date.now();

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
        console.error('API Error Response:', error);
        throw new Error(`API Error: ${error.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      return data.content[0].text;
    } catch (error) {
      console.error('Claude API Error:', error);
      throw error;
    }
  }

  getDefaultSystemPrompt() {
    return `You are an expert HR and workforce development AI assistant for the Civic AI Talent Match platform.
Your role is to help match developers with projects and provide career guidance.
Guidelines:
- Be concise and specific (2-4 sentences for explanations)
- Always mention specific skills when relevant
- Provide actionable, practical advice
- Be encouraging but honest
- Focus on career growth and development
- Consider both technical and soft skills`;
  }

  /**
   * Feature 1: Generate Smart Match Explanation
   * Explains why a developer-project pairing is good or challenging
   */
  async generateMatchExplanation(developer, project, matchScore, matchedSkills, missingSkills) {
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

Match Analysis:
- Score: ${matchScore}%
- Matched Skills: ${matchedSkills.length > 0 ? matchedSkills.join(', ') : 'None'}
- Missing Skills: ${missingSkills.length > 0 ? missingSkills.join(', ') : 'None - Perfect match!'}

Provide a brief (2-3 sentences) professional explanation of this match:
1. How well aligned this opportunity is
2. Key strengths or concerns
3. Brief recommendation (Yes/Maybe/No)`;

    return await this.callClaude(prompt);
  }

  /**
   * Feature 2: Analyze Skill Gaps and Recommend Training
   */
  async analyzeSkillGaps(developer, project) {
    const matchedSkills = developer.skills.filter(s =>
      project.requiredSkills.includes(s)
    );
    const missingSkills = project.requiredSkills.filter(s =>
      !developer.skills.includes(s)
    );

    const prompt = `
Skill Gap Analysis for Developer

Developer: ${developer.name} (${developer.level} Level)
Has These Skills: ${matchedSkills.length > 0 ? matchedSkills.join(', ') : 'None of the required skills'}
Missing Skills: ${missingSkills.length > 0 ? missingSkills.join(', ') : 'None - has all required skills!'}

Project: ${project.name} (${project.type})

For each missing skill, provide:
1. Skill name
2. Recommended free learning resource (course, tutorial, documentation)
3. Estimated learning time (for a ${developer.level.toLowerCase()} developer)
4. How to apply this skill in this project

Keep recommendations practical and encouraging. If no missing skills, congratulate them!`;

    return await this.callClaude(prompt);
  }

  /**
   * Feature 3: Generate Career Development Path
   */
  async generateCareerPath(developer) {
    const prompt = `
Create a personalized career development plan for this developer:

Name: ${developer.name}
Current Level: ${developer.level}
Current Skills: ${developer.skills.join(', ')}

Provide a 3-5 year career development plan:
1. Next skill to learn that builds on their current skills
2. Recommended project types to pursue in the next 6 months
3. Skills needed to reach the next career level
4. Timeline for career progression (junior→mid→senior)
5. Types of roles they're best suited for now

Be specific, motivating, and realistic. Reference their current skills.`;

    return await this.callClaude(prompt);
  }

  /**
   * Feature 4: Generate Employer Hiring Insights
   */
  async generateHiringInsights(project, matchedDevelopers) {
    const topMatches = matchedDevelopers.slice(0, 5);
    const topInfo = topMatches.map(m =>
      `${m.developer.name} (${m.score}% match, ${m.developer.level}): ${m.matchedSkills.length}/${m.requiredCount} skills, Missing: ${m.missingSkills.join(', ') || 'none'}`
    ).join('\n');

    const prompt = `
Strategic Hiring Recommendation for Employer

Project: ${project.name}
Type: ${project.type}
Required Skills: ${project.requiredSkills.join(', ')}
Positions Available: ${project.positions}

Top Available Candidates:
${topInfo}

Provide hiring strategy:
1. Which developers to prioritize and why
2. Recommended team composition if hiring multiple
3. Training/support needs for each candidate
4. Risk assessment (high/medium/low)
5. Expected productivity timeline

Be direct and strategic in your recommendations.`;

    return await this.callClaude(prompt);
  }

  /**
   * Feature 5: Predict Match Success Probability
   */
  async predictMatchSuccess(developer, project, matchScore) {
    const matchedSkills = developer.skills.filter(s =>
      project.requiredSkills.includes(s)
    );

    const prompt = `
Assess likelihood of success for this developer-project assignment:

Developer: ${developer.name}
Level: ${developer.level}
Skills: ${developer.skills.join(', ')}

Project: ${project.name}
Type: ${project.type}
Required: ${project.requiredSkills.join(', ')}
Matched Skills: ${matchedSkills.join(', ') || 'None'}

Match Score: ${matchScore}%

Provide success assessment:
1. Success probability (0-100%)
2. Key success factors (3 things going right)
3. Potential challenges (2-3 concerns)
4. Mitigation strategies (how to increase success)
5. Timeline to full productivity

Be realistic and grounded in the data.`;

    return await this.callClaude(prompt);
  }

  /**
   * Feature 6: Analyze Workforce Skills Gaps
   */
  async analyzeWorkforceGaps(organizationName, projects, developers) {
    const allNeededSkills = [...new Set(projects.flatMap(p => p.requiredSkills))];
    const availableSkills = [...new Set(developers.flatMap(d => d.skills))];
    const gapSkills = allNeededSkills.filter(s => !availableSkills.includes(s));

    const prompt = `
Workforce Skills Gap Analysis for ${organizationName}

All Project Requirements: ${allNeededSkills.join(', ')}
Available Skills in Team: ${availableSkills.join(', ')}
Skills Gaps: ${gapSkills.length > 0 ? gapSkills.join(', ') : 'None - all skills covered!'}

Provide organizational analysis:
1. Priority skills to recruit or train (1-3 most important)
2. Training recommendations for existing developers
3. Hiring strategy to fill gaps
4. Timeline for closing gaps (1 month, 3 months, 6 months)
5. Budget considerations (rough estimate)

Make it strategic and actionable for leadership.`;

    return await this.callClaude(prompt);
  }

  /**
   * Feature 7: Generate Project Job Description
   */
  async generateProjectDescription(projectName, projectType, requiredSkills) {
    const prompt = `
Write an engaging job posting description for this opportunity:

Project Title: ${projectName}
Project Type: ${projectType}
Required Skills: ${requiredSkills.join(', ')}

Create a 3-4 sentence job description that:
1. Clearly explains what the project does
2. Why it's important to the organization
3. What developers will learn and accomplish
4. Who should apply (experience level)

Make it appealing to developers and professional.`;

    return await this.callClaude(prompt);
  }

  /**
   * Feature 8: Parse Resume to Extract Skills
   */
  async parseResume(resumeText) {
    const prompt = `
Analyze this resume and extract professional information in JSON format:

${resumeText}

Extract and return ONLY valid JSON (no markdown, no code blocks):
{
  "name": "Full Name",
  "experience_level": "junior/mid/senior",
  "years_experience": number,
  "skills": ["skill1", "skill2", "skill3"],
  "languages": ["language1", "language2"],
  "key_achievements": ["achievement1", "achievement2"],
  "education": "degree and institution",
  "best_project_types": "types of projects they excel at"
}

Be thorough but strict with the JSON format.`;

    const response = await this.callClaude(prompt);
    try {
      // Extract JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return null;
    } catch (error) {
      console.error('Failed to parse resume response:', error);
      return null;
    }
  }

  /**
   * Feature 9: Generate Team Composition Recommendation
   */
  async analyzeTeamComposition(projectName, selectedDeveloperIds) {
    const developers = selectedDeveloperIds
      .map(id => DataManager.getDeveloperById(id))
      .filter(Boolean);

    const teamInfo = developers
      .map(d => `${d.name} (${d.level}, skills: ${d.skills.join(', ')})`)
      .join('\n');

    const prompt = `
Analyze this team composition for a project:

Project: ${projectName}

Team Members:
${teamInfo}

Provide team assessment:
1. Team strengths (skills coverage, diversity)
2. Potential gaps or weaknesses
3. Recommended roles for each person
4. Collaboration dynamics (juniors/seniors balance)
5. Overall team readiness (0-100%)

Be constructive and identify how to optimize the team.`;

    return await this.callClaude(prompt);
  }

  /**
   * Feature 10: Generate Onboarding Plan
   */
  async generateOnboardingPlan(developer, project) {
    const missingSkills = project.requiredSkills.filter(s =>
      !developer.skills.includes(s)
    );

    const prompt = `
Create a detailed onboarding plan for this developer on a project:

Developer: ${developer.name} (${developer.level} Level)
Project: ${project.name}
Missing Skills: ${missingSkills.length > 0 ? missingSkills.join(', ') : 'None'}

Provide a week-by-week onboarding plan for the first month:
- Week 1: Initial orientation and setup
- Week 2: Skill development and ramp up
- Week 3: Contribution and learning
- Week 4: Full productivity targets

For each week, include:
1. Key objectives
2. Resources/mentoring needed
3. Deliverables/milestones
4. Success metrics

Make it realistic and supportive.`;

    return await this.callClaude(prompt);
  }
}

// Initialize globally when page loads
let claudeAI = null;

function initializeClaudeAI(apiKey) {
  if (!apiKey || apiKey.trim() === '') {
    console.error('Claude API key is required');
    return false;
  }
  claudeAI = new ClaudeAI(apiKey);
  console.log('✅ Claude AI initialized successfully');
  return true;
}

// Check for API key in localStorage or request from user
document.addEventListener('DOMContentLoaded', () => {
  const storedKey = localStorage.getItem('claude-api-key');
  if (storedKey) {
    initializeClaudeAI(storedKey);
  }
});
