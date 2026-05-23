import React, { useState } from "react";

const initialLearners = [
  { id: 1, name: "Sara Johnson", skills: ["Python", "AI", "Data Analysis"], status: "Active", apprenticeship: "Data Automation" },
  { id: 2, name: "Ali Patel", skills: ["Marketing", "Design", "Customer Support"], status: "Active", apprenticeship: "Business Process" },
  { id: 3, name: "Mona Hassan", skills: ["Cybersecurity", "Networking", "IT Support"], status: "In Training", apprenticeship: "IT Infrastructure" },
  { id: 4, name: "Carlos Rodriguez", skills: ["Document Processing", "AI", "Business Analysis"], status: "Active", apprenticeship: "Workflow Automation" },
  { id: 5, name: "Jasmine Lee", skills: ["Customer Support", "AI Chatbots", "Data Analysis"], status: "Active", apprenticeship: "Customer Service AI" }
];

const initialEmployers = [
  { id: 1, company: "Pima County", needs: ["Data Analysis", "AI", "Document Processing"], openings: 2, sector: "Government" },
  { id: 2, company: "Vantage West Credit Union", needs: ["Customer Support", "Marketing", "AI Chatbots"], openings: 1, sector: "Financial Services" },
  { id: 3, company: "Local IT Partner", needs: ["Cybersecurity", "Networking", "IT Support"], openings: 2, sector: "IT Services" },
  { id: 4, company: "Community Nonprofit Hub", needs: ["Business Analysis", "Customer Support", "Document Processing"], openings: 1, sector: "Nonprofit" },
  { id: 5, company: "SBDC Small Business Center", needs: ["Data Analysis", "Business Analysis", "Marketing"], openings: 2, sector: "Business Development" }
];

function calculateMatchScore(learner, employer) {
  const matchedSkills = learner.skills.filter(skill => employer.needs.includes(skill));
  const percentage = (matchedSkills.length / employer.needs.length) * 100;
  return { score: matchedSkills.length, percentage: Math.round(percentage), matchedSkills };
}

function getTopMatches(learner, employers, limit = 3) {
  return employers
    .map(emp => ({ ...emp, ...calculateMatchScore(learner, emp) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export default function App() {
  const [learners, setLearners] = useState(initialLearners);
  const [employers, setEmployers] = useState(initialEmployers);
  const [selectedLearner, setSelectedLearner] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLearners = learners.filter(l => {
    const matchesStatus = filterStatus === "All" || l.status === filterStatus;
    const matchesSearch = l.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const displayMatches = selectedLearner
    ? getTopMatches(selectedLearner, employers, 3)
    : [];

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>🎯 Pima Talent Match</h1>
          <p className="tagline">AI-powered learner-employer matching for Civic AI Corps</p>
        </div>
      </header>

      <div className="main-container">
        {/* Left Panel: Learners List */}
        <div className="panel learners-panel">
          <div className="panel-header">
            <h2>Civic Automation Engineers</h2>
            <span className="badge">{filteredLearners.length} / {learners.length}</span>
          </div>

          <div className="controls">
            <input
              type="text"
              placeholder="Search learners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="In Training">In Training</option>
            </select>
          </div>

          <div className="learners-list">
            {filteredLearners.map(learner => (
              <div
                key={learner.id}
                className={`learner-card ${selectedLearner?.id === learner.id ? 'active' : ''}`}
                onClick={() => setSelectedLearner(learner)}
              >
                <div className="learner-header">
                  <h3>{learner.name}</h3>
                  <span className={`status-badge status-${learner.status.replace(/\s+/g, '-').toLowerCase()}`}>
                    {learner.status}
                  </span>
                </div>
                <p className="apprenticeship">{learner.apprenticeship}</p>
                <div className="skills">
                  {learner.skills.map((skill, i) => (
                    <span key={i} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: Match Details */}
        <div className="panel matches-panel">
          {selectedLearner ? (
            <>
              <div className="panel-header">
                <h2>Best Matches for {selectedLearner.name}</h2>
              </div>

              <div className="match-details">
                <div className="learner-summary">
                  <h3>{selectedLearner.name}</h3>
                  <p><strong>Skills:</strong> {selectedLearner.skills.join(", ")}</p>
                  <p><strong>Program:</strong> {selectedLearner.apprenticeship}</p>
                  <p><strong>Status:</strong> {selectedLearner.status}</p>
                </div>

                <div className="matches-container">
                  {displayMatches.map((match, index) => (
                    <div key={match.id} className={`match-card rank-${index + 1}`}>
                      <div className="rank-badge">#{index + 1}</div>
                      <h4>{match.company}</h4>
                      <p className="sector">{match.sector} • {match.openings} opening(s)</p>

                      <div className="match-score">
                        <div className="score-circle">
                          <span className="percentage">{match.percentage}%</span>
                        </div>
                        <div className="score-details">
                          <p><strong>{match.score}</strong> skill match(es)</p>
                          <p className="matched-skills">{match.matchedSkills.join(", ")}</p>
                        </div>
                      </div>

                      <div className="needs">
                        <strong>Needs:</strong>
                        <div className="need-tags">
                          {match.needs.map((need, i) => (
                            <span key={i} className={`need-tag ${match.matchedSkills.includes(need) ? 'matched' : ''}`}>
                              {need}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button className="propose-btn">💼 Propose Match</button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <h3>👈 Select a learner to view matches</h3>
              <p>Choose a learner from the list to see their top employer matches</p>
            </div>
          )}
        </div>
      </div>

      <footer className="footer">
        <p>Civic AI Corps • Powered by AI Trailblazers</p>
      </footer>
    </div>
  );
}
