# Manifesto Watch - Project Overview

## 📋 Project Summary

**Manifesto Watch** is a comprehensive political accountability platform for tracking Indian election manifestos and government promises. It monitors central and state-level political party commitments, tracks their implementation progress, and provides citizens with transparent data on government accountability.

**Live URL:** https://www.manifestowatch.in  
**Repository:** https://github.com/manifestowatchindia/manifesto-watch  
**Current Branch:** `development` (active development)  
**Production Branch:** `production` (deployed to Vercel)

---

## 🏗️ Architecture

### Technology Stack

**Frontend:**
- React 19.1.0 with TypeScript 4.9.5
- React Router 7.1.1 for routing
- Bootstrap 5.3.3 for styling
- React Helmet Async 2.0.5 for SEO
- Jest + React Testing Library for testing

**Backend:**
- FastAPI (Python) - Separate repository
- PostgreSQL database
- RESTful API architecture

**Deployment:**
- Frontend: Vercel (recommended) or Netlify
- Backend: Railway, Render, or similar platforms
- Continuous deployment from GitHub

### Architecture Type

**Pure API-Only Architecture:**
- No mock data or fallbacks
- All data fetched from backend API at `http://127.0.0.1:8000` (local) or production API
- Backend dependency is **required** for all features to work
- 5-minute API response caching for performance

---

## 📊 Key Features

### 1. Central Government Tracking
- **BJP+ (NDA) 2024 Manifesto Tracker** - Track 15 categories of promises
- **INDIA Alliance 2024** - Opposition alliance manifesto
- **BJP 2019** - Historical reference
- **Government Dashboard** - Comprehensive promise tracking across all categories
- **Category Detail Pages** - Deep dive into specific promise categories

### 2. State & UT Elections
- State Legislative Assembly manifestos
- Union Territory Assembly manifestos  
- Currently tracking: AAP Delhi 2020, INC Puducherry 2021
- Filter by state, year, and search

### 3. Promise Tracking System
**15 Promise Categories:**
1. Infrastructure & Transport
2. Health
3. Education & Skills
4. Economy, Industry & Jobs
5. Agriculture & Food
6. Social Welfare & Safety Nets
7. Defense & Security
8. Technology & Innovation
9. Environment & Climate
10. Housing & Urban Development
11. Women & Child Welfare
12. Youth & Sports
13. Rural Development
14. Energy
15. Governance & Transparency

**Promise Status Tracking:**
- ✅ Delivered (100% complete)
- 🔵 Under Implementation (60% progress)
- 🟠 Actioned (40% progress)
- ⚪ Announced (10% progress)
- ❌ Deferred (Not completed)

**Promise Metadata:**
- Measurable vs. Non-measurable
- Budget mentions
- Timeline (100 days, 5 years, Vision 2047)
- Geography (National, State, Urban, Rural, Mixed)
- Citations and sources

### 4. Interactive Features
- **Interactive India Map** - Explore all 28 states + 8 UTs
- **Political Landscape** - Browse parties by state
- **News Updates** - Real-time RSS feeds from major Indian news sources
- **Search & Filters** - Advanced filtering by category, status, year, state

### 5. SEO & Accessibility
- Dynamic meta tags for all pages
- Sitemap.xml with all routes
- Robots.txt configured
- Mobile-responsive design
- Lazy loading for performance

---

## 🗂️ Project Structure

```
manifesto-watch/
├── docs/                          # Documentation
│   ├── DEPLOYMENT.md             # Deployment guide (Vercel/Netlify)
│   └── PROJECT_OVERVIEW.md       # This file
├── public/                        # Static assets
│   ├── index.html
│   ├── sitemap.xml               # SEO sitemap
│   ├── robots.txt                # Search engine rules
│   └── static/images/            # Images and party logos
├── src/
│   ├── components/               # Reusable components
│   │   ├── CategoryCard.tsx
│   │   ├── IndiaMap.tsx
│   │   └── SEO.tsx
│   ├── data/
│   │   └── categories.ts         # 15 promise categories
│   ├── layouts/                  # Page components
│   │   ├── Homepage/
│   │   ├── Manifestos/
│   │   │   ├── CentralManifestos.tsx
│   │   │   └── StateManifestos.tsx
│   │   ├── ManifestoWatch/
│   │   │   ├── BJP2024Tracker.tsx
│   │   │   ├── ManifestoWatchDashboard.tsx
│   │   │   └── CategoryDetailPage.tsx
│   │   ├── NewsUpdates/
│   │   ├── PoliticalLandscape/
│   │   ├── InteractiveMap/
│   │   ├── Tracking/
│   │   ├── NavbarAndFooter/
│   │   └── Legal/               # Disclaimer, Terms, Privacy, FAQ
│   ├── lib/
│   │   ├── config.ts            # API configuration
│   │   ├── data.ts              # Data utilities
│   │   ├── types.ts             # TypeScript types
│   │   └── slug.ts              # URL slug generation
│   ├── services/
│   │   ├── api.ts               # API client
│   │   ├── promiseService.ts    # Promise data service
│   │   ├── manifestoService.ts  # Manifesto data service
│   │   └── __tests__/           # Service tests
│   ├── utils/
│   │   ├── indiaMapPaths.ts     # SVG map data
│   │   ├── newsCache.ts         # News caching
│   │   └── partyLogos.ts        # Party logo utilities
│   ├── App.tsx                  # Main app with routes
│   └── index.tsx                # Entry point
├── database_migration.sql        # Database schema migrations
├── package.json                  # Dependencies
└── tsconfig.json                 # TypeScript config
```

---

## 🔌 API Integration

### Backend Requirements

**Base URL:** Configured via `REACT_APP_API_BASE_URL` environment variable

**Required Endpoints:**

```
GET /api/v1/manifestos              # List all manifestos
GET /api/v1/manifestos/{id}         # Get manifesto by ID
GET /api/v1/promises                # List all promises
GET /api/v1/promises/{id}           # Get promise by ID
GET /api/v1/categories              # List all categories
GET /api/v1/categories/{id}         # Get category by ID
GET /health                         # Health check
```

**Query Parameters:**
- `type` - Filter by election type (lok_sabha, state_assembly, ut_assembly)
- `year` - Filter by election year
- `category_id` - Filter by category
- `manifesto_id` - Filter by manifesto
- `status` - Filter by promise status
- `limit` - Pagination limit
- `offset` - Pagination offset

### Data Models

**Manifesto:**
```typescript
{
  id: string;                    // e.g., "bjp-2024"
  party_name: string;            // e.g., "BJP"
  election_year: number;         // e.g., 2024
  election_type: ElectionType;   // lok_sabha | state_assembly | ut_assembly
  alliance_name: string | null;  // e.g., "NDA"
  region_name: string | null;    // e.g., "Delhi"
  region_code: string | null;    // e.g., "DL"
  region_kind: RegionKind;       // national | state | union_territory
  language: string;              // e.g., "English"
  document_url: string | null;   // PDF URL
  published_date: string;        // ISO date
  is_winner: boolean;            // Election winner flag
}
```

**Promise:**
```typescript
{
  id: string;
  title: string;
  categoryId: string;            // Maps to category ID
  subTheme?: string;
  type: PromiseType;             // policy | program | infrastructure | legal
  timeline: Timeline;            // 100d | 5yr | 2047
  measurable: boolean;
  metric?: {
    label: string;
    target?: string;
    unit?: string;
  };
  hasBudgetMention?: boolean;
  status: PromiseStatus;         // Announced | Actioned | Under implementation | Delivered | Deferred
  geography: Geography;          // national | state | urban | rural | mixed
  citations: Citation[];
  description?: string;
}
```

### CORS Configuration

Backend must allow requests from:
```python
allow_origins=[
    "https://manifestowatch.in",
    "https://www.manifestowatch.in",
    "https://manifesto-watch.vercel.app",
    "http://localhost:3000"  # Development
]
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ or 18+
- npm or yarn
- Backend API running (required)

### Installation

```bash
# Clone repository
git clone https://github.com/manifestowatchindia/manifesto-watch.git
cd manifesto-watch

# Switch to development branch
git checkout development

# Install dependencies
npm install

# Set up environment variables
# Create .env.development file:
echo "REACT_APP_API_BASE_URL=http://127.0.0.1:8000" > .env.development

# Start development server
npm start
# Opens http://localhost:3000
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

**Note:** Tests require Node 18+ for `AbortSignal.timeout()` support.

---

## 🌐 Deployment

### Vercel (Recommended)

**Quick Deploy:**
1. Connect GitHub repository to Vercel
2. Set environment variable: `REACT_APP_API_BASE_URL=https://your-api-url.com`
3. Set production branch to `production`
4. Deploy

**Build Settings:**
- Framework: Create React App
- Build Command: `npm run build`
- Output Directory: `build`
- Node Version: 16.x or higher

### Netlify

Similar setup with:
- Build Command: `npm run build`
- Publish Directory: `build`
- Add environment variables in settings

### Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `REACT_APP_API_BASE_URL` | Yes | Backend API base URL | `https://api.manifestowatch.in` |

---

## 🎯 Current Status

### ✅ Completed Features
- Pure API-only architecture (removed all mock data)
- Central manifestos tracking (BJP 2024, INDIA 2024, BJP 2019)
- 15-category promise tracking system
- State/UT manifestos integration
- Interactive India map with all states/UTs
- Political landscape explorer
- News updates from RSS feeds
- SEO optimization (meta tags, sitemap, robots.txt)
- Comprehensive test suite
- Deployment documentation
- Branch structure (production/development)

### ⚠️ Known Issues
1. **Central Manifestos page** - Uses hardcoded data, needs API integration
2. **Limited State Data** - Only 2 state manifestos in database (Delhi 2020, Puducherry 2021)
3. **Missing PDFs** - Most manifestos have null document_url
4. **Node Version** - Tests require Node 18+ (AbortSignal.timeout)

### 🚧 Pending Enhancements
1. Connect Central Manifestos page to API
2. Add more state assembly manifestos
3. INDIA Alliance 2024 dedicated tracker
4. Cross-manifesto comparison tools
5. Historical tracking (BJP 2019 achievements)
6. Data visualization charts
7. Export/download features
8. User comments/feedback system

---

## 📦 Database Schema

### Manifestos Table
```sql
CREATE TABLE manifestos (
  id TEXT PRIMARY KEY,
  party_name TEXT NOT NULL,
  election_year INTEGER NOT NULL,
  election_type TEXT NOT NULL,
  alliance_name TEXT,
  region_name TEXT,
  region_code TEXT,
  region_kind TEXT,
  language TEXT NOT NULL,
  document_url TEXT,
  published_date DATE NOT NULL,
  is_winner BOOLEAN DEFAULT FALSE
);
```

### Promises Table
```sql
CREATE TABLE promises (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category_id TEXT NOT NULL,
  manifesto_id TEXT REFERENCES manifestos(id),
  sub_theme TEXT,
  type TEXT NOT NULL,
  timeline TEXT NOT NULL,
  measurable BOOLEAN DEFAULT FALSE,
  metric JSONB,
  has_budget_mention BOOLEAN DEFAULT FALSE,
  status TEXT NOT NULL,
  geography TEXT NOT NULL,
  description TEXT,
  citations JSONB
);
```

### Categories (Frontend Only)
15 predefined categories in `src/data/categories.ts`

---

## 🔧 Development Workflow

### Branch Strategy
- **`production`** - Production-ready code, deployed to Vercel
- **`development`** - Active development, preview deployments
- **`main`** - Legacy/reference branch

### Making Changes
1. Work in `development` branch
2. Commit and push changes
3. Create PR from `development` → `production`
4. Merge and auto-deploy

### Git Commands
```bash
# Switch to development
git checkout development

# Make changes, then:
git add .
git commit -m "Description of changes"
git push

# When ready for production:
# Create PR on GitHub: development → production
```

---

## 📱 Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Homepage | Landing page with features overview |
| `/political-landscape` | PoliticalLandscape | Browse parties by state |
| `/interactive-map` | InteractiveMap | Interactive India map |
| `/tracking` | Tracking | Promise tracking overview |
| `/manifestos/central` | CentralManifestos | Lok Sabha manifestos |
| `/manifestos/states` | StateManifestos | State/UT manifestos |
| `/manifestos/central/2024/bjp/15pointsversion` | BJP2024Tracker | BJP 2024 detailed tracker |
| `/government-dashboard` | ManifestoWatchDashboard | Government promise dashboard |
| `/government-dashboard/category/:slug` | CategoryDetailPage | Category-specific promises |
| `/news` | NewsUpdates | Latest political news |
| `/about` | AboutUs | About the platform |
| `/contact` | ContactUs | Contact form |
| `/disclaimer` | Disclaimer | Legal disclaimer |
| `/terms` | TermsOfService | Terms of service |
| `/privacy-policy` | PrivacyPolicy | Privacy policy |
| `/faq` | FAQ | Frequently asked questions |

---

## 🎨 Design & UX

### Color Scheme
- Primary: Orange/Saffron (#FF9933) - Indian flag colors
- Secondary: Blue (#2196F3)
- Success: Green (#4CAF50) - Indian flag colors
- Dark theme for main interface (#000, #1a1a1a)

### Key UI Patterns
- Card-based layouts for manifestos and promises
- Bootstrap responsive grid system
- Font Awesome icons throughout
- Lazy loading for performance
- Skeleton loaders during data fetching
- Error states with retry functionality

---

## 📞 Support & Contact

- **GitHub Issues:** https://github.com/manifestowatchindia/manifesto-watch/issues
- **Documentation:** See `docs/` folder
- **Deployment Guide:** `docs/DEPLOYMENT.md`

---

## 📝 Notes for ChatGPT

### Context
This is a production React application tracking Indian political manifestos and promises. The app is fully API-dependent with no mock data fallbacks.

### Common Tasks
1. **Adding new features** - Follow existing patterns in `src/layouts/`
2. **API changes** - Update `src/services/api.ts` and type definitions
3. **New routes** - Add to `src/App.tsx` with lazy loading
4. **Styling** - Use Bootstrap classes, maintain dark theme
5. **Testing** - Add tests in `src/services/__tests__/`

### Important Constraints
- Backend API must be running for features to work
- All data comes from API (no hardcoded data except categories)
- Maintain TypeScript strict typing
- Follow existing service layer architecture
- Keep SEO optimization in mind

### Current Focus
Working on central government promise tracking and preparing for Assam 2026 elections feature.

---

**Last Updated:** January 3, 2026  
**Version:** 0.1.0  
**Status:** Active Development
