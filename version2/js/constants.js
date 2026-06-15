// ===== Application Constants =====

const WISHLIST_ITEMS = [
  {
    title: '📊 Recommended Enhancements (Prioritized)',
    content: [
      '⭐ CRITICAL PRIORITY:',
      '1. Skillset Ranking System (0-3 Scale)',
      '   - 0 = Do not know the tool',
      '   - 1 = Familiar with tool',
      '   - 2 = Functional with tool',
      '   - 3 = Expert in tool',
      '   Impact: Foundation for accurate matching algorithm',
      '',
      '2. Mobile/Cell Phone Responsive View',
      '   Impact: Critical for user adoption and accessibility',
      '',
      '🔷 HIGH PRIORITY:',
      '3. Engineer Profile Expansion',
      '   - Add interest tracks selection',
      '   - Display recommended skillsets per track',
      '   Impact: Career pathing and better engagement',
      '',
      '4. Project Description & Requirements Expansion',
      '   - More complete project descriptions',
      '   - Clearer talent requirements',
      '   Impact: Improved matching accuracy',
      '',
      '🔹 MEDIUM PRIORITY:',
      '5. General Profile Expansion (Engineers & Projects)',
      '   Impact: Supporting details and enhancements'
    ]
  },
  {
    title: '🏢 Expanded Civic Organizations',
    content: [
      'Add more nonprofit organizations including:',
      'Social services agencies and food banks',
      'Environmental conservation groups',
      'Education and literacy programs',
      'Healthcare and wellness nonprofits',
      'Community development organizations',
      'Arts and cultural institutions'
    ]
  },
  {
    title: '👤 Enhanced Developer Profiles',
    content: [
      'Expand developer information to include:',
      'Personal background and professional history',
      'Years of experience in the working world',
      'Career aspirations (technical, management, construction, health, etc.)',
      'Preferred industries and work environments',
      'Learning goals and skill development paths',
      'Community engagement and volunteer interests'
    ]
  },
  {
    title: '🤖 AI-Powered Aspirations Matching',
    content: [
      'Leverage AI to improve matching by considering:',
      'Career trajectory alignment with project types',
      'Long-term growth opportunities for developers',
      'Organizational culture fit assessment',
      'Skill gap identification for career advancement',
      'Mentorship and leadership opportunities',
      'Remote work and schedule flexibility matching'
    ]
  },
  {
    title: '📋 Expanded Project Definitions',
    content: [
      'Enhance project information with:',
      'Detailed project timelines and duration',
      'Impact metrics and success criteria',
      'Team composition and collaboration needs',
      'Budget and compensation information',
      'Training and support available',
      'Career growth opportunities within projects',
      'Remote/hybrid work options'
    ]
  },
  {
    title: '🎓 Skills Development Pathways',
    content: [
      'Create structured learning paths:',
      'Track skill progression over time',
      'Recommend training resources',
      'Connect developers with mentors',
      'Gamify skill achievements with badges',
      'Partner with educational institutions',
      'Provide certification support'
    ]
  },
  {
    title: '📊 Advanced Analytics & Reporting',
    content: [
      'Implement comprehensive analytics:',
      'Career outcome tracking for participants',
      'Project success and impact metrics',
      'Organization ROI calculations',
      'Skills demand forecasting',
      'Diversity and inclusion metrics',
      'Community economic impact reporting'
    ]
  },
  {
    title: '🤝 Team Assembly Intelligence',
    content: [
      'AI-powered team building:',
      'Recommend ideal team compositions',
      'Balance technical and soft skills',
      'Consider team dynamics and personalities',
      'Optimize for knowledge transfer',
      'Predict team collaboration success',
      'Create diverse and inclusive teams'
    ]
  },
  {
    title: '💼 Organizational Insights',
    content: [
      'Provide value to partner organizations:',
      'Workforce planning tools',
      'Talent pipeline development',
      'Skills inventory management',
      'Succession planning assistance',
      'Market competitiveness analysis',
      'Industry benchmark comparisons'
    ]
  },
  {
    title: '🌐 Mobile & Integration',
    content: [
      'Expand platform accessibility:',
      'Native mobile applications (iOS & Android)',
      'API integrations with HR systems',
      'Calendar and scheduling integration',
      'Email and notification systems',
      'Document storage and sharing',
      'Real-time collaboration tools'
    ]
  },
  {
    title: '🎯 Impact & Sustainability',
    content: [
      'Drive long-term community impact:',
      'Track economic mobility outcomes',
      'Support social equity initiatives',
      'Build sustainable partnerships',
      'Create funding mechanisms',
      'Scale to additional regions',
      'Measure and report on SDG alignment'
    ]
  }
];

const CLIENT_OVERVIEW_ITEMS = [
  {
    title: '1️⃣ Welcome - The Civic AI Initiative',
    content: [
      'Title: "Civic AI Corps"',
      'Subtitle: "Building a Community Talent Network for Southern Arizona"',
      'We are not placing apprentices; we are building a community talent network that helps public, nonprofit, and small business partners get more done with AI',
      'Partners: Pima County, Per Scholas, AI-Trailblazers, Vantage West'
    ]
  },
  {
    title: '2️⃣ The Problem We\'re Solving',
    content: [
      'Growing gap between organizations needing AI skills and residents who could fill those roles',
      'Community nonprofits, county offices, and small businesses lack trained people',
      'Limited pathways into tech careers in underserved areas',
      'No single organization can solve this alone',
      'Coalition of 4 partners reaches 25,000+ residents combined'
    ]
  },
  {
    title: '3️⃣ The Solution - Civic Engineer Role',
    content: [
      'New Role: "Civic Engineer" (trained as "Automators")',
      'Apprentices work directly inside organizations',
      'Build secure "Copilots" and workflow automations',
      'Real projects deployed to host organizations',
      'Apprentices earn while learning',
      'Portfolio of deployed work for future employers',
      '',
      'Benefits of Being a Civic Engineer:',
      'Meaningful impact on community and public sector organizations',
      'Earn competitive apprenticeship wages while building skills',
      'Real-world project experience on your resume',
      'Career pathway into AI and automation specialization',
      'Support from mentors and learning network',
      'Opportunity to advance into leadership and technical roles'
    ]
  },
  {
    title: '4️⃣ The Shared Ecosystem Engine',
    content: [
      '1. Pima Talent Match System (Apprentice-Built)',
      '   - "Dating app" for workforce development',
      '   - For Learners: Upload skills and badges',
      '   - For Navigators: Live map of available talent',
      '   - For Employers: Subscribe to talent feeds',
      '2. Navigator & Coach Upskilling',
      '   - "AI Super-User" Certification (2-day intensive)',
      '   - Navigators become "High-Touch Career Architects"',
      '   - AI handles overhead, focus on human connection',
      '3. SciTech Education & Career Maps',
      '   - Partnership to visualize "AI On-Ramp"',
      '   - Update existing STEM ecosystem maps'
    ]
  },
  {
    title: '5️⃣ Option 1 - Modernizing Pima County Services',
    content: [
      '"We aren\'t just training employees; we are building Pima County\'s internal R&D lab"',
      'Focus: Modernizing Pima County Services & Upskilling Government',
      'Mechanism: Apprentices shadow Pima Navigators to build Copilots',
      'Outcome: Navigators get time back; Apprentices get deployed projects',
      'Partner collaboration on IT/Cybersecurity foundation + AI automation',
      'Primary customer: Pima County as "First Customer"'
    ]
  },
  {
    title: '6️⃣ Option 2 - Micro-Agency Network for Small Business',
    content: [
      '"Don\'t wait for a corporation to hire you. Become the agency that saves Main Street"',
      'Focus: Saving Local Businesses & Creating Entrepreneurs',
      'New Role: "SMB Automation Specialist" / Micro-Agency Founders',
      'Mechanism: Teams (IT grad + AI grad) paired with small businesses',
      'Deliver "Business Starter Kit" - modernizing operations',
      'Apprentices gain testimonials and start careers',
      'Support for LLC formation and business banking through Vantage West'
    ]
  },
  {
    title: '7️⃣ Partner Roles & Ecosystem',
    content: [
      'Pima County: Recruits residents, acts as "First Customer", audits workflows',
      'Per Scholas: Tucson Satellite, IT/Cybersecurity cohorts, learner support',
      'AI-Trailblazers: AI Engineer curriculum, apprenticeship programs, mentorship',
      'Vantage West: Financial wellness coaching, marketing, Micro-Agency Launchpad'
    ]
  },
  {
    title: '8️⃣ Civic AI Pilot Concierge Service',
    content: [
      'Problem: Procurement blocks quick AI pilots - months pass before anything ships',
      'Solution: Fixed-fee 30-day pilot package',
      '- Discovery, AI teammate buildout, training, ROI report',
      '- Designed to fit under procurement thresholds',
      '- Target: Public-sector IT leaders and college decision-makers',
      'Skills Required: Sales, solutions engineering, security, customer success'
    ]
  }
];

let currentWishlistSlide = 0;
let currentOverviewSlide = 0;
let currentAboutSlide = 0;

let OVERVIEW_ITEMS = null;
let WISHLIST_ITEMS_LOADED = null;

function getMatchColor(score) {
  if (score >= 80) return '#48bb78';
  if (score >= 60) return '#ed8936';
  if (score >= 40) return '#ecc94b';
  return '#cbd5e0';
}
