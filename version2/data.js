// Civic AI Talent Match - Data Management
const DATA_KEY = 'civic-ai-talent-match-data';

// All available skills in the system
const ALL_SKILLS = [
  'Python',
  'JavaScript',
  'React',
  'Node.js',
  'Database Design',
  'Data Analysis',
  'Machine Learning',
  'Cloud Infrastructure',
  'API Development',
  'Mobile Development',
  'Cybersecurity',
  'DevOps',
  'UI/UX Design',
  'Project Management',
  'Business Analysis',
  'Java',
  'Go',
  'Docker',
  'Kubernetes',
  'AWS',
  'Azure',
  'GraphQL',
  'TypeScript',
  'SQL',
  'Testing',
  'Vue.js',
  'Angular',
  'Agile',
  'System Design',
  'Git',
  'MongoDB',
  'PostgreSQL',
  'Redis',
  'Terraform',
  'Jenkins',
  'Elasticsearch',
  'Nginx',
  'REST API',
  'WebSockets',
  'OAuth'
];

// Sample data structure
const SAMPLE_DATA = {
  organizations: [
    {
      id: 1,
      name: 'City of Tucson',
      type: 'Government',
      contact: 'hr@tucsonaz.gov',
      description: 'Municipal government for the City of Tucson'
    },
    {
      id: 2,
      name: 'Pima Community College',
      type: 'Education',
      contact: 'careers@pima.edu',
      description: 'Community college serving Southern Arizona'
    },
    {
      id: 3,
      name: 'Pima County',
      type: 'Government',
      contact: 'jobs@pima.gov',
      description: 'Pima County government services'
    },
    {
      id: 4,
      name: 'Desert Healthcare Foundation',
      type: 'Non-Profit',
      contact: 'careers@dhf.org',
      description: 'Healthcare-focused non-profit organization'
    },
    {
      id: 5,
      name: 'University of Arizona',
      type: 'Education',
      contact: 'careers@arizona.edu',
      description: 'Major research university'
    }
  ],

  projectTypes: [
    {
      id: 1,
      name: 'Data Analysis Platform',
      requiredSkills: ['Python', 'Data Analysis', 'Database Design']
    },
    {
      id: 2,
      name: 'Process Automation',
      requiredSkills: ['Python', 'API Development', 'DevOps']
    },
    {
      id: 3,
      name: 'Customer Portal',
      requiredSkills: ['React', 'Node.js', 'Database Design', 'UI/UX Design']
    },
    {
      id: 4,
      name: 'Mobile App',
      requiredSkills: ['Mobile Development', 'JavaScript', 'UI/UX Design']
    },
    {
      id: 5,
      name: 'Workflow System',
      requiredSkills: ['JavaScript', 'Node.js', 'Business Analysis']
    },
    {
      id: 6,
      name: 'Machine Learning Pipeline',
      requiredSkills: ['Python', 'Machine Learning', 'Data Analysis', 'Cloud Infrastructure']
    },
    {
      id: 7,
      name: 'Microservices Architecture',
      requiredSkills: ['Java', 'Docker', 'Kubernetes', 'DevOps', 'API Development']
    },
    {
      id: 8,
      name: 'Real-time Dashboard',
      requiredSkills: ['React', 'JavaScript', 'TypeScript', 'API Development']
    },
    {
      id: 9,
      name: 'Security Audit Platform',
      requiredSkills: ['Cybersecurity', 'Python', 'DevOps', 'Cloud Infrastructure']
    },
    {
      id: 10,
      name: 'Healthcare Records System',
      requiredSkills: ['Database Design', 'Java', 'Cybersecurity', 'System Design']
    },
    {
      id: 11,
      name: 'Financial Analytics Tool',
      requiredSkills: ['Python', 'Data Analysis', 'SQL', 'Testing']
    },
    {
      id: 12,
      name: 'Web Content Management',
      requiredSkills: ['React', 'Node.js', 'UI/UX Design', 'Database Design']
    },
    {
      id: 13,
      name: 'API Integration Service',
      requiredSkills: ['Go', 'API Development', 'Database Design', 'DevOps']
    },
    {
      id: 14,
      name: 'Progressive Web App',
      requiredSkills: ['JavaScript', 'React', 'UI/UX Design', 'Mobile Development']
    },
    {
      id: 15,
      name: 'Cloud Migration Project',
      requiredSkills: ['AWS', 'Azure', 'DevOps', 'System Design']
    },
    {
      id: 16,
      name: 'Data Pipeline Platform',
      requiredSkills: ['Python', 'SQL', 'Data Analysis', 'Apache Spark', 'Cloud Infrastructure', 'Terraform']
    },
    {
      id: 17,
      name: 'Distributed Cache System',
      requiredSkills: ['Go', 'Redis', 'System Design', 'DevOps', 'Docker', 'Kubernetes']
    },
    {
      id: 18,
      name: 'Full-Stack E-commerce',
      requiredSkills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'UI/UX Design', 'Testing']
    },
    {
      id: 19,
      name: 'Real-time Messaging Platform',
      requiredSkills: ['WebSockets', 'Node.js', 'Redis', 'MongoDB', 'Docker', 'DevOps']
    },
    {
      id: 20,
      name: 'Enterprise Search Solution',
      requiredSkills: ['Elasticsearch', 'Java', 'REST API', 'System Design', 'DevOps', 'Testing']
    },
    {
      id: 21,
      name: 'Multi-tenant SaaS Platform',
      requiredSkills: ['React', 'Node.js', 'PostgreSQL', 'Kubernetes', 'OAuth', 'System Design', 'Cybersecurity']
    },
    {
      id: 22,
      name: 'Infrastructure as Code',
      requiredSkills: ['Terraform', 'AWS', 'DevOps', 'Docker', 'Jenkins', 'Git', 'System Design']
    },
    {
      id: 23,
      name: 'Real-time Analytics Engine',
      requiredSkills: ['Python', 'Elasticsearch', 'Machine Learning', 'SQL', 'Data Analysis', 'Cloud Infrastructure']
    },
    {
      id: 24,
      name: 'Blockchain Integration',
      requiredSkills: ['JavaScript', 'TypeScript', 'Go', 'System Design', 'Cryptography', 'Testing']
    },
    {
      id: 25,
      name: 'AI Model Serving Platform',
      requiredSkills: ['Python', 'Machine Learning', 'Docker', 'Kubernetes', 'REST API', 'DevOps', 'System Design']
    }
  ],

  developers: [
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex.johnson@email.com',
      level: 'Senior',
      skills: ['Python', 'Data Analysis', 'Machine Learning', 'Database Design', 'SQL', 'Cloud Infrastructure', 'API Development'],
      skillRankings: { 'Python': 3, 'Data Analysis': 3, 'Machine Learning': 2, 'Database Design': 2, 'SQL': 3, 'Cloud Infrastructure': 1, 'API Development': 0 },
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      level: 'Mid',
      skills: ['React', 'JavaScript', 'UI/UX Design', 'Node.js', 'TypeScript', 'Testing', 'CSS'],
      skillRankings: { 'React': 2, 'JavaScript': 2, 'UI/UX Design': 2, 'Node.js': 1, 'TypeScript': 1, 'Testing': 0, 'CSS': 3 },
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      name: 'James Chen',
      email: 'james.chen@email.com',
      level: 'Senior',
      skills: ['Node.js', 'DevOps', 'Cloud Infrastructure', 'Cybersecurity', 'Docker', 'Kubernetes', 'System Design', 'Java'],
      skillRankings: { 'Node.js': 3, 'DevOps': 3, 'Cloud Infrastructure': 2, 'Cybersecurity': 2, 'Docker': 3, 'Kubernetes': 2, 'System Design': 1, 'Java': 0 },
      createdAt: new Date().toISOString()
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah.williams@email.com',
      level: 'Junior',
      skills: ['JavaScript', 'React', 'UI/UX Design', 'HTML', 'CSS', 'Git'],
      skillRankings: { 'JavaScript': 1, 'React': 1, 'UI/UX Design': 1, 'HTML': 2, 'CSS': 1, 'Git': 0 },
      createdAt: new Date().toISOString()
    },
    {
      id: 5,
      name: 'Michael Rodriguez',
      email: 'michael.r@email.com',
      level: 'Mid',
      skills: ['Python', 'API Development', 'Database Design', 'DevOps', 'Docker', 'Testing', 'Git'],
      skillRankings: { 'Python': 2, 'API Development': 2, 'Database Design': 2, 'DevOps': 1, 'Docker': 1, 'Testing': 0, 'Git': 3 },
      createdAt: new Date().toISOString()
    },
    {
      id: 6,
      name: 'Lisa Zhang',
      email: 'lisa.zhang@email.com',
      level: 'Senior',
      skills: ['Machine Learning', 'Python', 'Data Analysis', 'Cloud Infrastructure', 'TensorFlow', 'Statistical Analysis', 'SQL'],
      skillRankings: { 'Machine Learning': 3, 'Python': 3, 'Data Analysis': 3, 'Cloud Infrastructure': 2, 'TensorFlow': 2, 'Statistical Analysis': 3, 'SQL': 1 },
      createdAt: new Date().toISOString()
    },
    {
      id: 7,
      name: 'David Brown',
      email: 'david.brown@email.com',
      level: 'Mid',
      skills: ['Mobile Development', 'JavaScript', 'React', 'UI/UX Design', 'React Native', 'iOS', 'Android'],
      skillRankings: { 'Mobile Development': 2, 'JavaScript': 2, 'React': 2, 'UI/UX Design': 2, 'React Native': 1, 'iOS': 0, 'Android': 1 },
      createdAt: new Date().toISOString()
    },
    {
      id: 8,
      name: 'Jessica Lee',
      email: 'jessica.lee@email.com',
      level: 'Junior',
      skills: ['Python', 'Business Analysis', 'Project Management', 'Excel', 'SQL', 'Documentation'],
      skillRankings: { 'Python': 1, 'Business Analysis': 1, 'Project Management': 0, 'Excel': 2, 'SQL': 0, 'Documentation': 1 },
      createdAt: new Date().toISOString()
    },
    {
      id: 9,
      name: 'Robert Martinez',
      email: 'robert.m@email.com',
      level: 'Senior',
      skills: ['Node.js', 'API Development', 'Database Design', 'Cybersecurity', 'MongoDB', 'REST APIs', 'Testing', 'System Design'],
      skillRankings: { 'Node.js': 3, 'API Development': 3, 'Database Design': 2, 'Cybersecurity': 3, 'MongoDB': 2, 'REST APIs': 3, 'Testing': 1, 'System Design': 2 },
      createdAt: new Date().toISOString()
    },
    {
      id: 10,
      name: 'Emily White',
      email: 'emily.white@email.com',
      level: 'Mid',
      skills: ['React', 'JavaScript', 'Node.js', 'Database Design', 'DevOps', 'AWS', 'Testing'],
      skillRankings: { 'React': 2, 'JavaScript': 2, 'Node.js': 2, 'Database Design': 1, 'DevOps': 1, 'AWS': 0, 'Testing': 2 },
      createdAt: new Date().toISOString()
    },
    {
      id: 11,
      name: 'Kevin Park',
      email: 'kevin.park@email.com',
      level: 'Senior',
      skills: ['Java', 'Microservices', 'Docker', 'Kubernetes', 'System Design', 'Spring Boot', 'Database Design'],
      skillRankings: { 'Java': 3, 'Microservices': 3, 'Docker': 3, 'Kubernetes': 2, 'System Design': 2, 'Spring Boot': 3, 'Database Design': 1 },
      createdAt: new Date().toISOString()
    },
    {
      id: 12,
      name: 'Sophia Patel',
      email: 'sophia.patel@email.com',
      level: 'Mid',
      skills: ['Python', 'Machine Learning', 'Data Analysis', 'SQL', 'Cloud Infrastructure', 'Pandas', 'Scikit-learn'],
      skillRankings: { 'Python': 2, 'Machine Learning': 2, 'Data Analysis': 2, 'SQL': 1, 'Cloud Infrastructure': 1, 'Pandas': 2, 'Scikit-learn': 0 },
      createdAt: new Date().toISOString()
    },
    {
      id: 13,
      name: 'Marcus Johnson',
      email: 'marcus.j@email.com',
      level: 'Junior',
      skills: ['JavaScript', 'React', 'TypeScript', 'Testing', 'UI/UX Design', 'CSS', 'HTML'],
      skillRankings: { 'JavaScript': 1, 'React': 1, 'TypeScript': 0, 'Testing': 0, 'UI/UX Design': 1, 'CSS': 2, 'HTML': 1 },
      createdAt: new Date().toISOString()
    },
    {
      id: 14,
      name: 'Angela Torres',
      email: 'angela.torres@email.com',
      level: 'Senior',
      skills: ['AWS', 'Azure', 'DevOps', 'Kubernetes', 'Cloud Infrastructure', 'Terraform', 'Jenkins', 'Security'],
      skillRankings: { 'AWS': 3, 'Azure': 3, 'DevOps': 3, 'Kubernetes': 2, 'Cloud Infrastructure': 2, 'Terraform': 2, 'Jenkins': 1, 'Security': 3 },
      createdAt: new Date().toISOString()
    },
    {
      id: 15,
      name: 'Nathan Reeves',
      email: 'nathan.reeves@email.com',
      level: 'Mid',
      skills: ['Go', 'API Development', 'Docker', 'DevOps', 'System Design', 'gRPC', 'Protocol Buffers'],
      skillRankings: { 'Go': 2, 'API Development': 2, 'Docker': 2, 'DevOps': 2, 'System Design': 1, 'gRPC': 1, 'Protocol Buffers': 0 },
      createdAt: new Date().toISOString()
    },
    {
      id: 16,
      name: 'Isabella Cruz',
      email: 'isabella.cruz@email.com',
      level: 'Senior',
      skills: ['JavaScript', 'React', 'Vue.js', 'UI/UX Design', 'Agile', 'Project Management', 'Product Strategy'],
      skillRankings: { 'JavaScript': 3, 'React': 3, 'Vue.js': 2, 'UI/UX Design': 2, 'Agile': 3, 'Project Management': 3, 'Product Strategy': 1 },
      createdAt: new Date().toISOString()
    },
    {
      id: 17,
      name: 'Oliver Thompson',
      email: 'oliver.thompson@email.com',
      level: 'Junior',
      skills: ['Python', 'Data Analysis', 'SQL', 'Business Analysis', 'Testing', 'Tableau'],
      skillRankings: { 'Python': 1, 'Data Analysis': 1, 'SQL': 1, 'Business Analysis': 0, 'Testing': 0, 'Tableau': 1 },
      createdAt: new Date().toISOString()
    },
    {
      id: 18,
      name: 'Rachel Green',
      email: 'rachel.green@email.com',
      level: 'Senior',
      skills: ['Cybersecurity', 'Java', 'Python', 'DevOps', 'System Design', 'Network Security', 'Penetration Testing', 'Compliance'],
      skillRankings: { 'Cybersecurity': 3, 'Java': 3, 'Python': 2, 'DevOps': 3, 'System Design': 2, 'Network Security': 3, 'Penetration Testing': 2, 'Compliance': 1 },
      createdAt: new Date().toISOString()
    },
    {
      id: 19,
      name: 'Daniel Kim',
      email: 'daniel.kim@email.com',
      level: 'Mid',
      skills: ['Mobile Development', 'JavaScript', 'React', 'TypeScript', 'UI/UX Design', 'Flutter', 'Firebase'],
      skillRankings: { 'Mobile Development': 2, 'JavaScript': 2, 'React': 2, 'TypeScript': 2, 'UI/UX Design': 2, 'Flutter': 1, 'Firebase': 0 },
      createdAt: new Date().toISOString()
    },
    {
      id: 20,
      name: 'Victoria Santos',
      email: 'victoria.santos@email.com',
      level: 'Mid',
      skills: ['Node.js', 'JavaScript', 'GraphQL', 'API Development', 'Database Design', 'Testing', 'MongoDB'],
      skillRankings: { 'Node.js': 2, 'JavaScript': 2, 'GraphQL': 2, 'API Development': 2, 'Database Design': 1, 'Testing': 1, 'MongoDB': 0 },
      createdAt: new Date().toISOString()
    }
  ],

  projects: [
    {
      id: 1,
      organizationId: 1,
      name: 'Budget Analytics Dashboard',
      type: 'Data Analysis Platform',
      requiredSkills: ['Python', 'Data Analysis', 'Database Design'],
      positions: 2,
      status: 'Open',
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      organizationId: 1,
      name: 'Permit Processing Automation',
      type: 'Process Automation',
      requiredSkills: ['Python', 'API Development', 'DevOps'],
      positions: 1,
      status: 'Open',
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      organizationId: 2,
      name: 'Student Portal Redesign',
      type: 'Customer Portal',
      requiredSkills: ['React', 'Node.js', 'Database Design', 'UI/UX Design'],
      positions: 3,
      status: 'Open',
      createdAt: new Date().toISOString()
    },
    {
      id: 4,
      organizationId: 2,
      name: 'Campus Directory Mobile App',
      type: 'Mobile App',
      requiredSkills: ['Mobile Development', 'JavaScript', 'UI/UX Design'],
      positions: 2,
      status: 'Open',
      createdAt: new Date().toISOString()
    },
    {
      id: 5,
      organizationId: 1,
      name: 'Service Request Workflow',
      type: 'Workflow System',
      requiredSkills: ['JavaScript', 'Node.js', 'Business Analysis'],
      positions: 1,
      status: 'Open',
      createdAt: new Date().toISOString()
    },
    {
      id: 6,
      organizationId: 3,
      name: 'Predictive Analytics Engine',
      type: 'Machine Learning Pipeline',
      requiredSkills: ['Python', 'Machine Learning', 'Data Analysis', 'Cloud Infrastructure'],
      positions: 2,
      status: 'Open',
      createdAt: new Date().toISOString()
    },
    {
      id: 7,
      organizationId: 4,
      name: 'Healthcare Integration Platform',
      type: 'Microservices Architecture',
      requiredSkills: ['Java', 'Docker', 'Kubernetes', 'DevOps', 'API Development'],
      positions: 3,
      status: 'Open',
      createdAt: new Date().toISOString()
    },
    {
      id: 8,
      organizationId: 5,
      name: 'University Analytics Dashboard',
      type: 'Real-time Dashboard',
      requiredSkills: ['React', 'JavaScript', 'TypeScript', 'API Development'],
      positions: 2,
      status: 'Open',
      createdAt: new Date().toISOString()
    },
    {
      id: 9,
      organizationId: 1,
      name: 'Infrastructure Security Audit',
      type: 'Security Audit Platform',
      requiredSkills: ['Cybersecurity', 'Python', 'DevOps', 'Cloud Infrastructure'],
      positions: 1,
      status: 'Open',
      createdAt: new Date().toISOString()
    },
    {
      id: 10,
      organizationId: 4,
      name: 'Patient Records System',
      type: 'Healthcare Records System',
      requiredSkills: ['Database Design', 'Java', 'Cybersecurity', 'System Design'],
      positions: 2,
      status: 'Open',
      createdAt: new Date().toISOString()
    },
    {
      id: 11,
      organizationId: 3,
      name: 'Tax Revenue Analytics',
      type: 'Financial Analytics Tool',
      requiredSkills: ['Python', 'Data Analysis', 'SQL', 'Testing'],
      positions: 1,
      status: 'Open',
      createdAt: new Date().toISOString()
    },
    {
      id: 12,
      organizationId: 2,
      name: 'Course Management Portal',
      type: 'Web Content Management',
      requiredSkills: ['React', 'Node.js', 'UI/UX Design', 'Database Design'],
      positions: 3,
      status: 'Open',
      createdAt: new Date().toISOString()
    },
    {
      id: 13,
      organizationId: 5,
      name: 'Third-party API Integration',
      type: 'API Integration Service',
      requiredSkills: ['Go', 'API Development', 'Database Design', 'DevOps'],
      positions: 1,
      status: 'Open',
      createdAt: new Date().toISOString()
    },
    {
      id: 14,
      organizationId: 4,
      name: 'Health Tracking Mobile App',
      type: 'Progressive Web App',
      requiredSkills: ['JavaScript', 'React', 'UI/UX Design', 'Mobile Development'],
      positions: 2,
      status: 'Open',
      createdAt: new Date().toISOString()
    },
    {
      id: 15,
      organizationId: 1,
      name: 'Legacy System Cloud Migration',
      type: 'Cloud Migration Project',
      requiredSkills: ['AWS', 'Azure', 'DevOps', 'System Design'],
      positions: 2,
      status: 'Open',
      createdAt: new Date().toISOString()
    },
    {
      id: 16,
      organizationId: 3,
      name: 'County Data Processing Pipeline',
      type: 'Data Pipeline Platform',
      requiredSkills: ['Python', 'SQL', 'Data Analysis', 'Apache Spark', 'Cloud Infrastructure', 'Terraform'],
      positions: 2,
      status: 'Open',
      createdAt: new Date().toISOString()
    },
    {
      id: 17,
      organizationId: 4,
      name: 'Healthcare Caching Layer',
      type: 'Distributed Cache System',
      requiredSkills: ['Go', 'Redis', 'System Design', 'DevOps', 'Docker', 'Kubernetes'],
      positions: 1,
      status: 'Open',
      createdAt: new Date().toISOString()
    },
    {
      id: 18,
      organizationId: 5,
      name: 'Student Marketplace Platform',
      type: 'Full-Stack E-commerce',
      requiredSkills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'UI/UX Design', 'Testing'],
      positions: 3,
      status: 'Open',
      createdAt: new Date().toISOString()
    },
    {
      id: 19,
      organizationId: 2,
      name: 'College Notification System',
      type: 'Real-time Messaging Platform',
      requiredSkills: ['WebSockets', 'Node.js', 'Redis', 'MongoDB', 'Docker', 'DevOps'],
      positions: 2,
      status: 'Open',
      createdAt: new Date().toISOString()
    },
    {
      id: 20,
      organizationId: 4,
      name: 'Medical Records Search',
      type: 'Enterprise Search Solution',
      requiredSkills: ['Elasticsearch', 'Java', 'REST API', 'System Design', 'DevOps', 'Testing'],
      positions: 1,
      status: 'Open',
      createdAt: new Date().toISOString()
    },
    {
      id: 21,
      organizationId: 5,
      name: 'University Multi-Tenant Portal',
      type: 'Multi-tenant SaaS Platform',
      requiredSkills: ['React', 'Node.js', 'PostgreSQL', 'Kubernetes', 'OAuth', 'System Design', 'Cybersecurity'],
      positions: 3,
      status: 'Open',
      createdAt: new Date().toISOString()
    },
    {
      id: 22,
      organizationId: 1,
      name: 'Infrastructure Automation',
      type: 'Infrastructure as Code',
      requiredSkills: ['Terraform', 'AWS', 'DevOps', 'Docker', 'Jenkins', 'Git', 'System Design'],
      positions: 2,
      status: 'Open',
      createdAt: new Date().toISOString()
    },
    {
      id: 23,
      organizationId: 3,
      name: 'Real-time Government Analytics',
      type: 'Real-time Analytics Engine',
      requiredSkills: ['Python', 'Elasticsearch', 'Machine Learning', 'SQL', 'Data Analysis', 'Cloud Infrastructure'],
      positions: 2,
      status: 'Open',
      createdAt: new Date().toISOString()
    },
    {
      id: 24,
      organizationId: 4,
      name: 'Blockchain Medical Records',
      type: 'Blockchain Integration',
      requiredSkills: ['JavaScript', 'TypeScript', 'Go', 'System Design', 'Cryptography', 'Testing'],
      positions: 1,
      status: 'Open',
      createdAt: new Date().toISOString()
    },
    {
      id: 25,
      organizationId: 5,
      name: 'AI-Powered Tutoring Engine',
      type: 'AI Model Serving Platform',
      requiredSkills: ['Python', 'Machine Learning', 'Docker', 'Kubernetes', 'REST API', 'DevOps', 'System Design'],
      positions: 2,
      status: 'Open',
      createdAt: new Date().toISOString()
    }
  ]
};

// Data management functions
class DataManager {
  static initialize() {
    // Check if data exists in localStorage
    if (!localStorage.getItem(DATA_KEY)) {
      console.log('Initializing with sample data...');
      this.saveData(SAMPLE_DATA);
    }
  }

  static getData() {
    const data = localStorage.getItem(DATA_KEY);
    return data ? JSON.parse(data) : null;
  }

  static saveData(data) {
    localStorage.setItem(DATA_KEY, JSON.stringify(data));
  }

  static addDeveloper(developer) {
    const data = this.getData();
    const newId = Math.max(...data.developers.map(d => d.id), 0) + 1;
    const newDeveloper = {
      ...developer,
      id: newId,
      createdAt: new Date().toISOString()
    };
    data.developers.push(newDeveloper);
    this.saveData(data);
    return newDeveloper;
  }

  static updateDeveloper(id, updates) {
    const data = this.getData();
    const index = data.developers.findIndex(d => d.id === id);
    if (index !== -1) {
      data.developers[index] = { ...data.developers[index], ...updates };
      this.saveData(data);
      return data.developers[index];
    }
    return null;
  }

  static deleteDeveloper(id) {
    const data = this.getData();
    data.developers = data.developers.filter(d => d.id !== id);
    this.saveData(data);
  }

  static addProject(project) {
    const data = this.getData();
    const newId = Math.max(...data.projects.map(p => p.id), 0) + 1;
    const newProject = {
      ...project,
      id: newId,
      status: 'Open',
      createdAt: new Date().toISOString()
    };
    data.projects.push(newProject);
    this.saveData(data);
    return newProject;
  }

  static updateProject(id, updates) {
    const data = this.getData();
    const index = data.projects.findIndex(p => p.id === id);
    if (index !== -1) {
      data.projects[index] = { ...data.projects[index], ...updates };
      this.saveData(data);
      return data.projects[index];
    }
    return null;
  }

  static deleteProject(id) {
    const data = this.getData();
    data.projects = data.projects.filter(p => p.id !== id);
    this.saveData(data);
  }

  static getDevelopers() {
    return this.getData().developers;
  }

  static getProjects() {
    return this.getData().projects;
  }

  static getOrganizations() {
    return this.getData().organizations;
  }

  static getProjectTypes() {
    return this.getData().projectTypes;
  }

  static getOrganizationProjects(organizationId) {
    return this.getData().projects.filter(p => p.organizationId === organizationId);
  }

  static getProjectById(id) {
    return this.getData().projects.find(p => p.id === id);
  }

  static getDeveloperById(id) {
    return this.getData().developers.find(d => d.id === id);
  }

  static getOrganizationById(id) {
    return this.getData().organizations.find(o => o.id === id);
  }

  static resetToSampleData() {
    this.saveData(JSON.parse(JSON.stringify(SAMPLE_DATA)));
  }

  static clearAllData() {
    localStorage.removeItem(DATA_KEY);
  }

  static exportJSON() {
    return JSON.stringify(this.getData(), null, 2);
  }
}

// Initialize on page load
DataManager.initialize();
