// Civic AI Talent Match - Matching Engine
// AI-powered algorithm to match developers with projects

class MatchingEngine {
  /**
   * Calculate match score between a developer and a project
   * Score is based on skill overlap, experience level, and requirements
   */
  static calculateMatch(developer, project) {
    if (!developer || !project) return null;

    const requiredSkills = project.requiredSkills || [];
    const developerSkills = developer.skills || [];

    // Find matching skills
    const matchedSkills = developerSkills.filter(skill =>
      requiredSkills.includes(skill)
    );

    // Find missing skills
    const missingSkills = requiredSkills.filter(skill =>
      !developerSkills.includes(skill)
    );

    // Calculate skill match percentage
    const skillMatchPercentage = requiredSkills.length > 0
      ? (matchedSkills.length / requiredSkills.length) * 100
      : 0;

    // Experience level bonus (rough correlation)
    let experienceBonus = 0;
    const projectComplexity = requiredSkills.length;

    if (projectComplexity >= 4 && developer.level === 'Senior') {
      experienceBonus = 10;
    } else if (projectComplexity >= 3 && developer.level === 'Mid') {
      experienceBonus = 5;
    } else if (projectComplexity <= 3 && developer.level === 'Junior') {
      experienceBonus = 5;
    }

    // Skill diversity bonus (having more relevant skills is good)
    const skillDiversityBonus = (matchedSkills.length / requiredSkills.length) * 5;

    // Calculate final match score (0-100)
    let finalScore = skillMatchPercentage + experienceBonus + skillDiversityBonus;
    finalScore = Math.min(100, Math.max(0, Math.round(finalScore)));

    return {
      developer,
      project,
      score: finalScore,
      matchedSkills,
      missingSkills,
      skillMatchPercentage: Math.round(skillMatchPercentage),
      experienceLevel: developer.level,
      requiredCount: requiredSkills.length,
      matchedCount: matchedSkills.length,
      confidence: this.calculateConfidence(finalScore, matchedSkills.length, requiredSkills.length)
    };
  }

  /**
   * Calculate confidence level based on match quality
   */
  static calculateConfidence(score, matched, required) {
    if (score >= 80 && matched === required) return 'Excellent';
    if (score >= 60 && matched >= required - 1) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Low';
  }

  /**
   * Find best projects for a developer
   */
  static findProjectsForDeveloper(developerId, projects = null) {
    const developer = DataManager.getDeveloperById(developerId);
    if (!developer) return [];

    const allProjects = projects || DataManager.getProjects();

    const matches = allProjects
      .filter(project => project.status === 'Open')
      .map(project => this.calculateMatch(developer, project))
      .sort((a, b) => b.score - a.score);

    return matches;
  }

  /**
   * Find best developers for a project
   */
  static findDevelopersForProject(projectId, developers = null) {
    const project = DataManager.getProjectById(projectId);
    if (!project) return [];

    const allDevelopers = developers || DataManager.getDevelopers();

    const matches = allDevelopers
      .map(developer => this.calculateMatch(developer, project))
      .sort((a, b) => b.score - a.score);

    return matches;
  }

  /**
   * Find best developers for multiple projects (organization level)
   */
  static findDevelopersForOrganization(organizationId) {
    const projects = DataManager.getOrganizationProjects(organizationId);
    const allDevelopers = DataManager.getDevelopers();

    const matchesByProject = {};

    projects.forEach(project => {
      matchesByProject[project.id] = this.findDevelopersForProject(project.id, allDevelopers);
    });

    return matchesByProject;
  }

  /**
   * Get summary statistics
   */
  static getMatchStatistics(matches) {
    if (matches.length === 0) return null;

    const scores = matches.map(m => m.score);
    const average = scores.reduce((a, b) => a + b, 0) / scores.length;
    const max = Math.max(...scores);
    const min = Math.min(...scores);
    const excellent = matches.filter(m => m.score >= 80).length;
    const good = matches.filter(m => m.score >= 60 && m.score < 80).length;
    const fair = matches.filter(m => m.score >= 40 && m.score < 60).length;
    const low = matches.filter(m => m.score < 40).length;

    return {
      totalMatches: matches.length,
      averageScore: Math.round(average),
      maxScore: max,
      minScore: min,
      distribution: {
        excellent,
        good,
        fair,
        low
      }
    };
  }

  /**
   * Generate recommendation text based on match
   */
  static generateRecommendation(match) {
    const { score, confidence, matchedCount, requiredCount, missingSkills } = match;

    let recommendation = '';

    if (confidence === 'Excellent') {
      recommendation = `Excellent match! This developer has all required skills and ${matchedCount} matching requirements.`;
    } else if (confidence === 'Good') {
      recommendation = `Good match! This developer has ${matchedCount}/${requiredCount} required skills. Missing: ${missingSkills.join(', ')}`;
    } else if (confidence === 'Fair') {
      recommendation = `Fair match. This developer has ${matchedCount}/${requiredCount} required skills and could grow into the role.`;
    } else {
      recommendation = `Limited match. Consider other candidates or provide training for: ${missingSkills.join(', ')}`;
    }

    return recommendation;
  }

  /**
   * Calculate team composition for multiple developers
   */
  static analyzeTeamComposition(developerIds) {
    const developers = developerIds.map(id => DataManager.getDeveloperById(id)).filter(Boolean);

    // Collect all skills
    const allSkills = new Set();
    developers.forEach(dev => {
      dev.skills.forEach(skill => allSkills.add(skill));
    });

    // Count skill coverage
    const skillCoverage = {};
    allSkills.forEach(skill => {
      skillCoverage[skill] = developers.filter(dev => dev.skills.includes(skill)).length;
    });

    // Experience distribution
    const experienceLevels = {
      Junior: developers.filter(d => d.level === 'Junior').length,
      Mid: developers.filter(d => d.level === 'Mid').length,
      Senior: developers.filter(d => d.level === 'Senior').length
    };

    return {
      totalMembers: developers.length,
      uniqueSkills: allSkills.size,
      skillCoverage,
      experienceLevels,
      averageSkillsPerDeveloper: Math.round((developers.reduce((sum, d) => sum + d.skills.length, 0) / developers.length) * 10) / 10
    };
  }

  /**
   * Generate match report for employer viewing
   */
  static generateProjectReport(projectId) {
    const project = DataManager.getProjectById(projectId);
    const org = DataManager.getOrganizationById(project.organizationId);
    const matches = this.findDevelopersForProject(projectId);
    const stats = this.getMatchStatistics(matches);
    const topMatches = matches.slice(0, 5);

    return {
      project,
      organization: org,
      totalMatches: matches.length,
      statistics: stats,
      topMatches,
      recommendations: topMatches.map(m => ({
        developer: m.developer,
        score: m.score,
        recommendation: this.generateRecommendation(m)
      }))
    };
  }

  /**
   * Generate match report for developer viewing
   */
  static generateDeveloperReport(developerId) {
    const developer = DataManager.getDeveloperById(developerId);
    const matches = this.findProjectsForDeveloper(developerId);
    const stats = this.getMatchStatistics(matches);
    const topMatches = matches.slice(0, 5);

    return {
      developer,
      totalOpportunities: matches.length,
      statistics: stats,
      topMatches,
      recommendations: topMatches.map(m => ({
        project: m.project,
        organization: DataManager.getOrganizationById(m.project.organizationId),
        score: m.score,
        recommendation: this.generateRecommendation(m)
      }))
    };
  }
}

// Helper functions for UI integration
function getMatchColor(score) {
  if (score >= 80) return '#48bb78'; // Green - Excellent
  if (score >= 60) return '#ed8936'; // Orange - Good
  if (score >= 40) return '#ecc94b'; // Yellow - Fair
  return '#f56565'; // Red - Low
}

function getMatchLabel(score) {
  if (score >= 80) return 'Excellent Match';
  if (score >= 60) return 'Good Match';
  if (score >= 40) return 'Fair Match';
  return 'Limited Match';
}
