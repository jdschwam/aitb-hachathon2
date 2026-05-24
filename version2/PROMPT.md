# Comprehensive Web App Build Prompt: Civic AI Talent Match

## Project Overview

Build a modern, single-page web application called "Civic AI Talent Match" that connects Civic Engineers with meaningful community projects using AI-powered matching. The application should enable three user personas: civic engineers (job seekers), project employers (hiring organizations), and administrators.

**Core Purpose:** Create a talent marketplace that matches skilled civic engineers with community projects based on skill levels, experience, and project requirements.

---

## Technology Stack

- **Frontend:** Vanilla JavaScript (ES6+), no frameworks
- **Styling:** Custom CSS3 with responsive design
- **Data Storage:** Client-side localStorage for persistence + JSON data files
- **Server:** Simple HTTP server (Python http.server on port 8000)
- **Data Format:** JSON files for all data

---

## Project Directory Structure

```
version2/
├── index.html                 # Main HTML file with all sections
├── app.js                      # Core application logic (1400+ lines)
├── styles.css                  # All styling (1200+ lines)
├── data.js                     # Data management and initialization
├── matching-engine.js          # AI matching algorithm
├── data/
│   ├── civic-engineers.json    # 20+ engineers with skills
│   ├── projects.json           # 25+ projects with requirements
│   ├── organizations.json      # 5+ organizations
│   ├── overview-content.json   # Overview modal content
│   └── wishlist-content.json   # Wishlist/roadmap content
└── README.md
```

---

## Data Models

### Engineer Profile
```json
{
  "id": "unique-id",
  "name": "Full Name",
  "title": "Job Title",
  "organization": "Current Org",
  "experience": "Years of experience",
  "bio": "Professional summary",
  "skillRankings": {
    "JavaScript": 3,
    "Python": 2,
    "Project Management": 3
  },
  "pathway": {
    "stage": "Current career stage",
    "provider": "Training provider",
    "status": "Active/Inactive",
    "dates": { "start": "2024-01-01", "end": "2024-12-31" }
  },
  "contact": {
    "email": "engineer@example.com",
    "phone": "123-456-7890",
    "location": "City, State"
  }
}
```

### Project
```json
{
  "id": "unique-id",
  "title": "Project Name",
  "description": "Detailed project description",
  "organization": "Organization Name",
  "requiredSkills": [
    { "name": "Skill Name", "level": 2 }
  ],
  "positions": 2,
  "duration": "3-6 months",
  "type": "Community Service/Contract/Internship",
  "status": "Open/In Progress/Completed",
  "dates": { "start": "2024-01-01", "end": "2024-06-30" },
  "impact": "Description of impact"
}
```

### Skill Ranking System
- **0:** Do not know the tool
- **1:** Familiar with tool (basic understanding)
- **2:** Functional with tool (can use independently)
- **3:** Expert in tool (can teach others)

---

## Core Features

### 1. Home View
- **Hero Section:** 
  - Large title: "Civic AI Talent Match"
  - Tagline: "AI-Powered Opportunity Matching for Workforce Development"
  - Three call-to-action buttons: "I'm a Civic Engineer", "View Projects", "Admin Panel"
- **Info Cards Section:** Display 4 key value propositions with icons
- **Responsive Layout:** Full-width hero on desktop, stacked on mobile

### 2. Civic Engineers Dashboard
- **Two-Column Layout:**
  - **Left Sidebar:** Scrollable list of all engineers with search/filter
  - **Right Panel:** Selected engineer's detailed profile card
- **Engineer List:**
  - Display: Name, Title, Organization
  - Highlight active/selected engineer
  - Support hover effects
  - Clickable to select engineer
- **Engineer Detail Card:**
  - Full name, title, organization, contact info
  - Bio/description
  - Skill rankings with color coding (0=gray, 1=yellow, 2=orange, 3=green)
  - Matched projects list
  - Edit/View buttons for admin functionality

### 3. Projects Dashboard
- **Two-Column Layout:**
  - **Left Sidebar:** Scrollable list of all projects
  - **Right Panel:** Selected project's details
- **Project List:**
  - Display: Project title, organization, positions available
  - Status indicator
  - Clickable to select
- **Project Detail Card:**
  - Full description
  - Required skills with levels
  - Organization details
  - Matched engineers list
  - Timeline/dates

### 4. Manage Developers View
- **Add New Developer Form:**
  - Name, title, organization, bio, contact info
  - Skill ranking interface with star selectors (0-3 scale)
  - Form validation
  - Submit/Reset buttons
- **Developer List with Actions:**
  - View, Edit, Delete buttons for each developer
  - Confirmation dialogs for destructive actions
  - Real-time update after changes

### 5. Manage Projects View
- **Add New Project Form:**
  - Title, description, organization, positions, duration
  - Required skills selector with level dropdown
  - Status selector
  - Date range picker
- **Project List with Actions:**
  - View, Edit, Delete buttons
  - Confirmation dialogs
  - Real-time updates

### 6. Manage Employers View
- **Add New Organization Form:**
  - Organization name, type, description
  - Contact info, website, social media
- **Organization List with Actions:**
  - View, Edit, Delete buttons
  - Active/inactive toggle

### 7. Admin Panel
- **System Statistics:**
  - Total Engineers count
  - Total Projects count
  - Total Organizations count
  - Total Skills count
  - Display as cards with large numbers
- **Data Files Management:**
  - List of all JSON data files (civic-engineers, organizations, projects, overview-content, wishlist-content)
  - For each file show:
    - File icon (emoji)
    - File name
    - File path
    - Three buttons: Load, View (read-only), Edit (with save/upload)
  - Each file on single line with buttons horizontally aligned
- **System Actions:**
  - Export all data (as JSON download)
  - Reset data (restore to defaults with confirmation)
  - Clear all data (dangerous action, requires confirmation)

### 8. Modal Dialogs

#### Overview Modal
- **Slides with Navigation:**
  - Multiple slides with content about the platform
  - Previous/Next buttons
  - Dot indicators for current slide
  - Auto-populated from overview-content.json
- **Close Button:** X button and click outside to close

#### Wishlist/Roadmap Modal
- **Multiple Slides:**
  - Current implementation status
  - Recommended enhancements (prioritized)
  - Future features
  - Expansion plans
  - AI improvements
- **Content Structure:** Each slide has title and bullet-point content
- **Navigation:** Back/Forward buttons with disabled states at boundaries
- **Indicators:** Dot navigation showing current slide position

#### About Modal
- **Multiple Information Slides:**
  - About the platform
  - Team information
  - Contact information
  - Resources and links
- **Same slide structure as Overview/Wishlist**

#### File Viewer Modal
- **Two Modes:**
  - **View Mode (Read-Only):** Display file content in textarea (non-editable)
  - **Edit Mode (Editable):** Allow editing JSON content
- **Actions:**
  - View mode: Close button
  - Edit mode: Download, Upload, Cancel buttons
- **Content Display:** JSON formatted with proper indentation

#### Skill Ranking Modal
- **Star Rating Interface:** 0-3 stars for each skill
- **Skill List:** All available skills with current ratings
- **Save/Cancel Buttons**
- **Real-time Update:** Update display immediately on save

---

## Navigation System

### Navbar
- **Logo:** "🎯 Civic AI Talent Match" (clickable, returns to home)
- **Navigation Links:**
  - Home (data-view="home")
  - 📋 Overview (onclick modal)
  - Civic Engineers (data-view="developer-dashboard")
  - Projects (data-view="employer-dashboard")
  - Admin (data-view="admin")
  - ℹ️ About (onclick modal)
  - 🎯 Wishlist (onclick modal)
- **View Switching:** Toggle visibility of sections, only one active at a time
- **Modal Triggers:** Prevent default link behavior, open modals instead

---

## AI Matching Algorithm

### Matching Engine (matching-engine.js)
- **Match Engineers to Projects:**
  - Compare engineer skills vs. project required skills
  - Calculate match score (0-100%) based on:
    - Skill level match (higher engineer level = better match)
    - Number of matching skills vs. total required
    - Experience level alignment
  - Sort by match score descending
  - Only show matches above 40% threshold

- **Match Projects to Engineers:**
  - Same algorithm reversed
  - Show top projects for each engineer

- **Score Calculation:**
  ```
  Match Score = (Matched Skill Points / Total Required Points) * 100
  Where Skill Point = engineer_level / required_level (max 1.0 per skill)
  ```

---

## Styling Requirements

### Color Scheme
- **Primary:** #667eea (Purple-blue)
- **Secondary:** #764ba2 (Deep purple)
- **Success:** #48bb78 (Green)
- **Warning:** #ed8936 (Orange)
- **Danger:** #f56565 (Red)
- **Background:** #f7f7f7 (Light gray)
- **Text:** #333 (Dark gray)
- **Border:** #e0e0e0 (Light border)

### Typography
- **Font Family:** System fonts or "Segoe UI", Tahoma, Geneva, Verdana, sans-serif
- **Headings:** Bold, larger sizes (h1: 2.5rem, h2: 1.8rem, h3: 1.3rem)
- **Body Text:** 1rem, line-height: 1.5
- **Monospace:** 'Courier New' for code/JSON display

### Layout Components
- **Container:** Max-width 1200px, centered, padding 2rem
- **Cards:** Rounded corners (8px), subtle shadow, 1rem padding, white background
- **Buttons:**
  - Primary: Purple background, white text, hover darken
  - Secondary: Light background, colored text, hover shade
  - Outline: Transparent, colored border, hover background
  - Icon buttons: No background, emoji-only, 1.5rem font
- **Inputs:** Full-width, padding 0.75rem, border 1px solid #e0e0e0, focus outline
- **Modals:** Overlay (dark semi-transparent), centered dialog, max-width 600px

### Responsive Design
- **Desktop:** Full layout, sidebars visible, grid layouts
- **Tablet (768px):** Single column for sidebars, stack sections
- **Mobile (<576px):** Full-width, hidden sidebars accessible via toggle, large touch targets
- **Breakpoint Media Queries:** @media (max-width: 768px) and @media (max-width: 576px)

---

## State Management & Data Flow

### Data Initialization (data.js)
- **DataManager Class:**
  - `initialize()`: Load initial data
  - `getData()`: Get all data
  - `saveData()`: Persist to localStorage
  - `addDeveloper()`: Add new engineer
  - `updateDeveloper()`: Modify engineer
  - `deleteDeveloper()`: Remove engineer
  - Similar methods for projects, organizations

### Local Storage
- **Keys:**
  - `civicEngineers`: Array of engineer objects
  - `projects`: Array of project objects
  - `organizations`: Array of organization objects
  - `lastUpdated`: Timestamp

### Global State Variables
- `currentView`: Currently displayed section
- `currentEngineer`: Selected engineer in dashboard
- `currentProject`: Selected project in dashboard
- `currentFileContext`: File being viewed/edited
- `currentWishlistSlide`: Current slide index
- `currentOverviewSlide`: Current slide index
- `currentAboutSlide`: Current slide index

---

## JavaScript Functions

### Navigation & View Management
- `setupNavigation()`: Initialize navbar event listeners
- `switchView(viewId)`: Show/hide sections, handle state
- `updateStats()`: Update admin panel counts

### Engineer Management
- `loadDeveloperDashboard()`: Populate engineer list
- `selectEngineer(id)`: Select and display engineer details
- `displayEngineerDetails()`: Render engineer card
- `addDeveloper()`: Form submission handler
- `editEngineer(id)`: Load engineer into form
- `deleteEngineer(id)`: Remove engineer with confirmation
- `setupDeveloperForm()`: Initialize skill ranking interface

### Project Management
- `loadProjectsDashboard()`: Populate project list
- `selectProject(id)`: Select and display project details
- `displayProjectDetails()`: Render project card
- `addProject()`: Form submission
- `editProject(id)`: Load project into form
- `deleteProject(id)`: Remove project

### Modal Functions
- `openWishlistModal()` / `closeWishlistModal()`
- `openOverviewModal()` / `closeOverviewModal()`
- `openAboutModal()` / `closeAboutModal()`
- `nextWishlistSlide()` / `previousWishlistSlide()` / `goToWishlistSlide(index)`
- `nextOverviewSlide()` / `previousOverviewSlide()`
- `nextAboutSlide()` / `previousAboutSlide()`
- `updateWishlistButtons()`: Disable nav buttons at boundaries

### File Management
- `loadDataFile(name, path)`: Load and initialize file
- `viewDataFile(name, path)`: Open file in read-only mode
- `editDataFile(name, path)`: Open file in editable mode
- `closeFileViewer()`: Close modal
- `downloadFile()`: Download edited file as JSON
- `uploadFile()`: Upload new JSON file
- `saveEditedFile()`: Save changes

### Admin Functions
- `exportData()`: Download all data as JSON
- `resetData()`: Restore default data with confirmation
- `clearAllData()`: Delete all user data with confirmation

### Utility Functions
- `initializeApp()`: Main initialization on page load
- `initializeWishlist()`: Build wishlist slides from data
- `initializeOverview()`: Build overview slides from data
- `initializeAbout()`: Build about slides from data
- `calculateMatch()`: Call matching engine, get score
- `formatDate()`: Convert dates to readable format
- `validateJSON()`: Validate JSON before saving

---

## Event Handling

### Navigation Links
- **Data-view Links:** `addEventListener` with `switchView()`
- **Onclick Links:** `addEventListener` with `preventDefault()` for onclick handlers
- **Click Outside Modals:** Close modal when clicking overlay background

### Form Submissions
- Prevent default form behavior
- Validate required fields
- Update data via DataManager
- Refresh display
- Show success/error feedback

### Skill Ranking Interface
- Star selectors for each skill (0-3)
- Visual feedback on hover
- Click to select rating
- Save button to persist

### Slide Navigation
- Previous/Next buttons with boundary checks
- Disabled state at first/last slide
- Dot indicators for current position, clickable for direct navigation

---

## Error Handling

- **Fetch Errors:** Display user-friendly message in modals
- **JSON Parsing:** Catch parse errors, show warning
- **Missing Data:** Graceful fallback to empty state
- **Validation Errors:** Highlight invalid fields in forms
- **localStorage Issues:** Fallback to in-memory storage if unavailable

---

## Performance Considerations

- Lazy load engineer/project lists as needed
- Debounce search/filter inputs
- Cache computed matching scores
- Minimize DOM re-renders
- Use event delegation where appropriate

---

## Testing Considerations

- Include sample data with diverse skill levels
- Create test engineers: junior (mostly 0-1), mid-level (1-2), senior (2-3)
- Create projects with varying skill requirements
- Test all CRUD operations
- Verify matching algorithm accuracy
- Test modals open/close properly
- Verify data persists to localStorage
- Test responsive layout at different breakpoints

---

## Build Instructions

1. **Create directory structure** with all folders and files
2. **Implement HTML structure** with all 7 view sections and modals
3. **Create data files** with sample engineers, projects, organizations
4. **Build CSS** with responsive design and all component styles
5. **Implement data.js** with DataManager class and initialization
6. **Implement matching-engine.js** with matching algorithm
7. **Build app.js** with all functions in this order:
   - Global variables and constants
   - Initialization functions
   - Navigation setup
   - View switching
   - Engineer management
   - Project management
   - Modal management
   - File management
   - Admin functions
   - Utility functions
8. **Start Python server** in version2 directory: `python3 -m http.server 8000`
9. **Test all features** in browser at `http://localhost:8000`

---

## Additional Notes

- Use `document.addEventListener('DOMContentLoaded', ...)` for initialization
- Store current file context during edit operations for save/upload
- Implement proper error boundaries with try-catch
- Use JSON.stringify() and JSON.parse() for data serialization
- Keep code modular with single-responsibility functions
- Use meaningful variable names (no single letters except loop counters)
- Comment only the "why", not the "what"
- Test that all onclick handlers prevent default properly
- Ensure modals close without disrupting user's current view
- Validate all file operations before processing
