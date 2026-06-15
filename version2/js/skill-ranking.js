// ===== Skill Ranking Module =====

let currentEngineerRanking = {
  engineerId: null,
  skills: {},
  rankings: {}
};

const SKILL_LEVELS = {
  0: 'Not Yet',
  1: 'Familiar',
  2: 'Functional',
  3: 'Expert'
};

function openSkillRanking(engineerId) {
  const engineer = DataManager.getDeveloperById(engineerId);
  if (!engineer) {
    alert('Engineer not found');
    return;
  }

  currentEngineerRanking = {
    engineerId: engineerId,
    skills: engineer.skills || [],
    rankings: engineer.skillRankings || {}
  };

  const modal = document.getElementById('skill-ranking-modal');
  const title = document.getElementById('skill-ranking-title');
  const list = document.getElementById('skill-ranking-list');

  title.textContent = `Engineer: ${engineer.name} - Rate Your Skills`;

  let html = '';
  currentEngineerRanking.skills.forEach(skill => {
    const currentRating = currentEngineerRanking.rankings[skill] || 0;
    html += `
      <div class="skill-rating-item">
        <div class="skill-name">${skill}</div>
        <div class="skill-stars">
          <button class="star-btn star-0 ${currentRating === 0 ? 'active' : ''}"
                  onclick="setSkillRating('${skill}', 0)" title="Not Yet">☆</button>
          <button class="star-btn star-1 ${currentRating === 1 ? 'active' : ''}"
                  onclick="setSkillRating('${skill}', 1)" title="Familiar">★</button>
          <button class="star-btn star-2 ${currentRating === 2 ? 'active' : ''}"
                  onclick="setSkillRating('${skill}', 2)" title="Functional">★</button>
          <button class="star-btn star-3 ${currentRating === 3 ? 'active' : ''}"
                  onclick="setSkillRating('${skill}', 3)" title="Expert">★</button>
        </div>
        <div class="skill-level-text">${SKILL_LEVELS[currentRating]}</div>
      </div>
    `;
  });

  list.innerHTML = html;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function setSkillRating(skill, level) {
  currentEngineerRanking.rankings[skill] = level;

  const items = document.querySelectorAll('.skill-rating-item');
  items.forEach(item => {
    if (item.querySelector('.skill-name').textContent === skill) {
      item.querySelectorAll('.star-btn').forEach((btn, idx) => {
        if (idx <= level) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      item.querySelector('.skill-level-text').textContent = SKILL_LEVELS[level];
    }
  });
}

function saveSkillRankings() {
  const engineer = DataManager.getDeveloperById(currentEngineerRanking.engineerId);
  if (!engineer) {
    alert('Engineer not found');
    return;
  }

  engineer.skillRankings = currentEngineerRanking.rankings;

  DataManager.updateDeveloper(engineer.id, { skillRankings: engineer.skillRankings });

  alert(`Skill rankings saved for ${engineer.name}`);
  closeSkillRanking();
}

function closeSkillRanking() {
  const modal = document.getElementById('skill-ranking-modal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
  currentEngineerRanking = { engineerId: null, skills: {}, rankings: {} };
}
