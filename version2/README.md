# Civic AI Talent Match - Version 2

**AI-Powered Opportunity Matching Platform for Workforce Development**

An interactive web application that intelligently matches developers/learners with employer projects using AI-powered skill matching algorithms. Built with vanilla HTML, CSS, and JavaScript.

## Overview

Civic AI Talent Match solves the workforce development challenge: training programs produce talented learners, but struggle to connect them with meaningful opportunities. This platform automates the matching process using intelligent algorithms that analyze skills, experience levels, and project requirements.

### Key Features

✅ **Developer Management** - Create and manage developer profiles with skills and experience levels
✅ **Employer Management** - Define projects with specific skill requirements
✅ **AI Matching Engine** - Intelligent algorithm calculates match scores (0-100%)
✅ **Developer Dashboard** - Find projects that match your skillset
✅ **Employer Dashboard** - Discover developers for your projects
✅ **Matching Scores** - Shows percentage match with skill-by-skill breakdown
✅ **Sample Data** - Pre-populated with 2 employers, 5 projects, and 10 developers
✅ **Local Storage** - All data persists in browser (no server needed)
✅ **Admin Panel** - Manage system data, import/export, reset to sample data

## Quick Start

### Option 1: Simple File Server (Recommended)

**Using Python 3:**
```bash
cd /Users/dschwam3/Projects/AITB/Hackathon-3/version2
python3 -m http.server 8000
```

Then open your browser to: **http://localhost:8000**

**Using Python 2:**
```bash
cd /Users/dschwam3/Projects/AITB/Hackathon-3/version2
python -m SimpleHTTPServer 8000
```

**Using Node.js (http-server):**
```bash
# Install http-server globally (one time)
npm install -g http-server

# Then run
cd /Users/dschwam3/Projects/AITB/Hackathon-3/version2
http-server -p 8000
```

**Using PHP:**
```bash
cd /Users/dschwam3/Projects/AITB/Hackathon-3/version2
php -S localhost:8000
```

### Option 2: Direct Browser Opening

Simply double-click `index.html` or drag it into your browser. This will work with full functionality, but remote data loading may be restricted.

## Stopping and Restarting the Server

### Stopping the Server

**For Python or Node.js servers:**
Press `Ctrl+C` in the terminal window where the server is running. You should see the process terminate and your command prompt return.

**For PHP:**
Press `Ctrl+C` in the terminal window where the server is running.

### Restarting the Server

To restart the server, use the same command you used to start it:

**Python 3:**

```bash
cd /Users/dschwam3/Projects/AITB/Hackathon-3/version2
python3 -m http.server 8000
```

**Python 2:**

```bash
cd /Users/dschwam3/Projects/AITB/Hackathon-3/version2
python -m SimpleHTTPServer 8000
```

**Node.js:**

```bash
cd /Users/dschwam3/Projects/AITB/Hackathon-3/version2
http-server -p 8000
```

**PHP:**

```bash
cd /Users/dschwam3/Projects/AITB/Hackathon-3/version2
php -S localhost:8000
```

### Using the Provided Scripts

Alternatively, you can use the provided startup scripts:

**On Mac/Linux:**

```bash
cd /Users/dschwam3/Projects/AITB/Hackathon-3/version2
./start.sh
```

**On Windows:**

```bash
cd /Users/dschwam3/Projects/AITB/Hackathon-3/version2
start.bat
```

Press `Ctrl+C` to stop these scripts as well.

### Troubleshooting Port Issues

If port 8000 is already in use by another process:

1. **Find what's using the port (Mac/Linux):**

   ```bash
   lsof -i :8000
   ```

2. **Kill the process (if needed):**

   ```bash
   kill -9 <PID>
   ```

   (Replace `<PID>` with the process ID from the previous command)

3. **Use a different port:**

   ```bash
   python3 -m http.server 8001
   ```

   Then access at `http://localhost:8001`

## System Architecture

```
version2/
├── index.html              # Main HTML structure and layout
├── styles.css              # Professional styling (responsive, gradient design)
├── data.js                 # Data management & localStorage handling
├── matching-engine.js      # AI matching algorithm & calculations
├── app.js                  # Application logic & UI interactions
└── README.md              # This file
```

## Sample Data Included

### Organizations
- **City of Tucson** - Government sector
- **Pima Community College** - Education sector

### Projects (5 total)
1. **Budget Analytics Dashboard** (Data Analysis Platform)
   - Skills: Python, Data Analysis, Database Design
   - Positions: 2

2. **Permit Processing Automation** (Process Automation)
   - Skills: Python, API Development, DevOps
   - Positions: 1

3. **Student Portal Redesign** (Customer Portal)
   - Skills: React, Node.js, Database Design, UI/UX Design
   - Positions: 3

4. **Campus Directory Mobile App** (Mobile App)
   - Skills: Mobile Development, JavaScript, UI/UX Design
   - Positions: 2

5. **Service Request Workflow** (Workflow System)
   - Skills: JavaScript, Node.js, Business Analysis
   - Positions: 1

### Developers (10 total)
Each developer has different skillsets from a pool of 15 skills:
- Python, JavaScript, React, Node.js
- Database Design, Data Analysis, Machine Learning
- Cloud Infrastructure, API Development, Mobile Development
- Cybersecurity, DevOps, UI/UX Design
- Project Management, Business Analysis

Experience levels: Junior (0-2 years), Mid (2-5 years), Senior (5+ years)

## How to Use

### For Developers

1. **Navigate to "Developers"** from the home page
2. **Select Your Profile** from the dropdown (or create a new one)
3. **View Matching Projects** with:
   - Match score percentage (0-100%)
   - Confidence level (Excellent/Good/Fair/Low)
   - Your matched skills (highlighted)
   - Required skills you're missing
   - Project details and number of positions

### For Employers

1. **Navigate to "Employers"** from the home page
2. **Select Your Organization**
3. **View Your Projects** with:
   - Available developer matches for each project
   - Top 3 developer recommendations with scores
   - Breakdown of matched skills
4. **Create New Projects**:
   - Click "Create Project"
   - Fill in project details
   - Select required skills
   - Matches are calculated automatically

### Admin Functions

1. **Navigate to "Admin Panel"**
2. **View System Statistics**
   - Total developers, projects, organizations, skills
3. **Database Management**
   - Export data to JSON file
   - Reset to sample data
   - Clear all data
4. **View Raw Data**
   - See all data in JSON format
   - Copy or analyze as needed

## Matching Algorithm

The AI matching engine calculates scores based on:

### Skill Matching (50%)
- Percentage of project required skills that developer has
- Direct comparison of skill lists

### Experience Level Bonus (10%)
- Senior developers get bonus for complex projects (4+ skills)
- Mid-level developers get bonus for moderate projects (3 skills)
- Junior developers get bonus for simple projects (≤3 skills)

### Skill Diversity Bonus (5%)
- Bonus for developers with multiple relevant skills
- Encourages well-rounded team composition

### Final Score Calculation
```
Score = Skill Match % + Experience Bonus + Skill Diversity Bonus
Result = Capped at 0-100 range
```

### Confidence Levels
- **Excellent** (80-100%): All required skills present
- **Good** (60-79%): Most required skills, trainable gaps
- **Fair** (40-59%): Core skills present, significant training needed
- **Low** (<40%): Limited match, consider alternatives

## Data Persistence

All data is stored in your browser's **localStorage** under the key `civic-ai-talent-match-data`. This means:

✅ Data persists even after closing the browser
✅ No server or internet connection required
✅ Completely private (stored locally on your machine)
❌ Data is lost if you clear browser cache
❌ Data is specific to each browser and domain

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Requires JavaScript enabled

## Adding New Developers

1. Go to **Admin → Manage Developers**
2. Fill in the form:
   - Name
   - Email
   - Experience Level
   - Select skills (minimum 1)
3. Click "Add Developer"
4. New developer appears in all dashboards and matching

## Adding New Projects

1. Go to **Admin → Manage Employers**
2. Fill in the form:
   - Organization (select from list)
   - Project Name
   - Project Type
   - Select required skills
   - Number of positions
3. Click "Add Project"
4. Developers see new project in their dashboard immediately

## Exporting Data

1. Go to **Admin Panel**
2. Click **"📥 Export Data"**
3. JSON file downloads to your computer
4. Can be used to backup or share data

## Resetting Data

### Reset to Sample Data
- Admin → Click "🔄 Reset to Sample Data"
- Restores original 10 developers and 5 projects
- All custom additions are lost

### Clear All Data
- Admin → Click "🗑️ Clear All Data"
- Removes everything
- Start fresh by adding new developers and projects

## Customization

### Changing Skills Pool
Edit the `ALL_SKILLS` array in `data.js`:
```javascript
const ALL_SKILLS = [
  'Python',
  'JavaScript',
  // Add more skills here
];
```

### Modifying Sample Data
Edit the `SAMPLE_DATA` object in `data.js` to change:
- Organizations
- Project types
- Initial developers
- Initial projects

### Adjusting Match Algorithm
Edit `matching-engine.js` function `calculateMatch()` to:
- Change skill weight percentages
- Adjust experience bonuses
- Add new matching criteria

## Troubleshooting

### Data Not Saving
- Check browser console (F12) for errors
- Ensure localStorage is enabled
- Try a different browser
- Clear cache and reload

### Matches Not Showing
- Ensure developers are selected with skills
- Check that projects have required skills defined
- Verify both developers and projects exist
- Try resetting to sample data

### Styling Looks Wrong
- Hard refresh browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Check that styles.css is in same directory
- Try a different browser

## Features Coming Soon

- Edit existing developers and projects
- Advanced filtering (experience level, specific skills)
- Recommendation explanations
- Team composition analyzer
- Match notifications
- Database backend integration
- User authentication
- PDF report generation

## Architecture Details

### Data Layer (data.js)
- `DataManager` class handles all data operations
- Methods for CRUD operations (Create, Read, Update, Delete)
- localStorage abstraction
- Sample data initialization

### Matching Engine (matching-engine.js)
- `MatchingEngine` class with static methods
- `calculateMatch()` - Core matching algorithm
- `findProjectsForDeveloper()` - Developer perspective
- `findDevelopersForProject()` - Employer perspective
- Helper functions for UI integration

### Application Logic (app.js)
- Event listeners and form handling
- View switching and navigation
- Dashboard population and rendering
- Admin functions

### UI (index.html + styles.css)
- Semantic HTML structure
- CSS Grid and Flexbox layouts
- Responsive design
- Form components and tables
- Animations and transitions

## Performance

- Lightweight: < 50KB total (all files combined)
- Fast matching: Processes hundreds of matches instantly
- No external dependencies
- Runs entirely in browser
- No network requests required

## Privacy & Security

- ✅ All data stays on your device
- ✅ No data sent to servers
- ✅ No tracking or analytics
- ✅ No authentication required (local only)
- ⚠️ Not suitable for production sensitive data
- ⚠️ Only share device with trusted users

## Development Notes

### Code Organization
- Modular design: separate concerns
- No build process needed
- Plain JavaScript (ES6)
- localStorage for persistence
- Mobile-responsive CSS

### Extending the Application

To add new features:

1. **New view** - Add `<section>` in index.html, add styles in styles.css
2. **New data** - Add to `SAMPLE_DATA` object in data.js
3. **New logic** - Add methods to DataManager or MatchingEngine classes
4. **UI interactions** - Add listeners and handlers in app.js

## License

This is a hackathon project created for demonstration purposes.

## Support

For questions or issues:
1. Check the Troubleshooting section
2. Review the code comments
3. Check browser console (F12) for error messages
4. Try resetting to sample data

## Project Credits

**Civic AI Talent Match v2**
- HTML/JS Implementation
- AI Matching Algorithm
- Data Persistence Layer
- Responsive Web Design

Based on the Civic AI Corps initiative and workforce development best practices.

---

**Ready to get started? Open http://localhost:8000 in your browser!**
