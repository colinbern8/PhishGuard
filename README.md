# PhishGuard - Cybersecurity Awareness Platform

A comprehensive cybersecurity awareness platform focused on phishing education, interactive training, and real-time threat detection tools.

## Features Implemented

### 🔐 Authentication & Onboarding
- **Landing Page**: Professional homepage with features overview, statistics, and testimonials
- **Sign Up Page**: User registration with password strength indicator and validation
- **Login Page**: Secure authentication with social login options
- **Password Reset**: Simple password recovery flow

### 📊 Main Dashboard
- **User Dashboard**: Personalized hub with quick stats, progress tracking, and recent activity
- Quick stats cards showing modules completed, current streak, total points, and rank
- Progress visualization for learning journey
- Recent activity feed and recommended modules
- Achievement showcase and quick action buttons

### 📚 Training Modules
- **Training Catalog**: Browse and filter modules by difficulty and category
- **Module Content**: Interactive lessons with rich content and navigation
- **Quiz Interface**: Multiple-choice quizzes with question navigation and flagging
- **Quiz Results**: Detailed score breakdown with explanations
- **Progress Tracking**: Comprehensive dashboard showing learning statistics and history

### 🔍 Phishing Scanner
- **Email Scanner**: Analyze suspicious email content for threats
- **URL Scanner**: Check URLs for phishing indicators
- **Scan Results**: Detailed threat analysis with risk scoring and recommendations
- **Scan History**: Track all previous scans with results

### 🏆 Gamification
- **Leaderboard**: Global rankings with top performers podium
- **Achievements**: Badge collection system with earned/locked states
- **Weekly Challenges**: Time-limited challenges with progress tracking

### 📖 Knowledge Hub
- **Article Library**: Browse cybersecurity articles and resources
- **Featured Content**: Highlighted educational materials
- **Article View**: Full article reading experience
- **Search**: Find relevant content quickly

### 🚨 Community Features
- **Incident Reporting**: Submit phishing attempts to help the community
- **Threat Feed**: Browse real phishing attempts reported by users
- **Incident Details**: View detailed threat information with community comments

### 🛠️ Security Tools
- **Password Strength Checker**: Analyze password security with strength meter
- **Password Generator**: Create strong passwords with customization
- **Breach Checker**: Check if email appears in data breaches
- **URL Expander**: Expand shortened URLs to see real destinations

### 👤 User Profile
- Profile information management
- Achievement gallery
- Activity history
- Account settings

## Design System

### Color Palette
- **Primary Blue**: #1F4E78 (Trust, security, professionalism)
- **Secondary Blue**: #2E75B6 (Technology, reliability)
- **Success Green**: #28A745 (Safe, verified, completion)
- **Warning Orange**: #FFA500 (Suspicious, caution)
- **Danger Red**: #DC3545 (High risk, threat, critical)
- **Neutral Gray**: #F8F9FA, #E9ECEF, #6C757D

### Typography
- Clean, modern font stack with proper hierarchy
- Responsive text sizing
- Clear visual hierarchy throughout

### Components
- Built with Radix UI primitives for accessibility
- Tailwind CSS v4 for styling
- Lucide React icons for consistent iconography
- Responsive design for desktop and tablet

## Navigation Structure

```
/ - Landing Page
/login - Login
/signup - Sign Up
/reset-password - Password Reset

/app - Main Application (Protected Routes)
  ├── / - Dashboard
  ├── /profile - User Profile
  ├── /training - Training Catalog
  │   ├── /:moduleId - Module Content
  │   ├── /:moduleId/quiz - Quiz
  │   └── /:moduleId/results - Quiz Results
  ├── /progress - Progress Tracking
  ├── /scanner - Phishing Scanner
  │   ├── /results - Scan Results
  │   └── /history - Scan History
  ├── /leaderboard - Leaderboard
  ├── /achievements - Achievements
  ├── /challenges - Weekly Challenges
  ├── /knowledge - Knowledge Hub
  │   ├── /:articleId - Article View
  │   └── /search - Search Results
  ├── /report - Report Phishing
  ├── /community - Community Feed
  │   └── /:incidentId - Incident Details
  └── /tools
      ├── /password - Password Checker
      ├── /breach - Breach Checker
      └── /url-expander - URL Expander
```

## Mock Data

The application uses comprehensive mock data to simulate a fully functional platform:
- User profiles with statistics
- Training modules with sections and progress
- Achievements (earned and locked)
- Leaderboard rankings
- Articles and resources
- Phishing incidents and threats
- Scan results

## Technical Stack

- **React 18** with TypeScript
- **React Router 7** for routing
- **Tailwind CSS v4** for styling
- **Radix UI** for accessible components
- **Lucide React** for icons
- **Vite** for build tooling

## Key Features

### Security-Focused Design
- Professional color scheme conveying trust and security
- Clear threat level indicators (safe/suspicious/dangerous)
- Privacy notices and data protection messaging
- Educational content emphasizing best practices

### User Experience
- Intuitive navigation with sticky header
- Progress tracking throughout the learning journey
- Gamification elements to encourage engagement
- Responsive design for various screen sizes
- Toast notifications for user feedback

### Educational Content
- Structured training modules with progressive difficulty
- Interactive quizzes with explanations
- Real-world examples and case studies
- Comprehensive knowledge base
- Community-driven threat intelligence

## Getting Started

### 🧪 Test User Credentials

To quickly access the application, use these test credentials:

**Email:** `demo@phishguard.com`  
**Password:** `PhishGuard2026!`

You'll see these credentials displayed:
- On the landing page in a green banner at the top
- On the login page with a convenient "Use Test Credentials" button
- In the browser console when the application loads

For detailed information about the test user account, see [TEST_USER.md](/TEST_USER.md)

### Quick Start

The application is ready to run. Simply access the landing page and:
1. Click "Sign In" and use the test credentials above
2. Explore the dashboard with pre-populated progress data
3. Complete training modules and quizzes
4. Scan emails and URLs for threats
5. Earn achievements and climb the leaderboard
6. Contribute to the community threat feed

## Notes

- All authentication is mocked using localStorage (frontend-only)
- Test user profile comes with 12 completed modules, 15 badges, and 1,450 points
- Scan results use predefined mock data with realistic analysis
- All features are fully navigable and interactive
- Designed for desktop-first experience with responsive mobile support
- See TEST_USER.md for complete test account details