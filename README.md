<div align="center">

# Smart Mini Ledger

### A Production-Grade Full-Stack Personal Finance Management Application

---

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com)
[![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)
[![Render](https://img.shields.io/badge/Render-46E3B7?logo=render&logoColor=white)](https://render.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

A secure, responsive, and production-deployed finance tracker with real-time insights, budget management, a what-if simulator, spending heatmaps, and a modern dark-mode UI.

[Live Frontend](https://smart-mini-ledger-ijci8akre-challa-balajis-projects.vercel.app/login) · [Live Backend API](https://smart-mini-ledger.onrender.com/api/v1/hello)

</div>

---

## Table of Contents

- [Project Overview](#project-overview)
- [Live Demo](#live-demo)
- [Screenshots](#screenshots)
- [Architecture](#architecture)
- [Folder Structure](#folder-structure)
- [Features](#features)
- [Unique Features](#unique-features)
- [Technology Stack](#technology-stack)
- [Database Design](#database-design)
- [API Documentation](#api-documentation)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Docker](#docker)
- [Testing](#testing)
- [Security](#security)
- [Performance](#performance)
- [AI Usage](#ai-usage)
- [Human Engineering](#human-engineering)
- [Future Improvements](#future-improvements)
- [License](#license)
- [Author](#author)

---

## Project Overview

**Smart Mini Ledger** is a full-stack personal finance management application built as part of the **ByteX Financial Ltd. Junior Full Stack Engineer Challenge**.

It enables users to track income and expenses, set category-wise budgets, and gain financial insights through an interactive dashboard with charts, health scores, smart spending recommendations, a what-if budget simulator, and a spending heatmap.

### Key Differentiators

- **Financial Health Score** — A 0–100 composite score based on 5 weighted factors (savings rate, income/expense ratio, budget utilization, overruns, spending consistency)
- **Smart Insights Engine** — 3–5 dynamic, data-driven financial insights generated per user
- **What-if Budget Simulator** — Interactive sliders to model budget scenarios and project health score changes
- **Spending Heatmap** — GitHub-style 30-day spending intensity visualization
- **Production-grade architecture** — Controller → Service → Repository pattern with centralized error handling

---

## Live Demo

| Service | URL |
|---|---|
| **Frontend** (Vercel) | [smart-mini-ledger.vercel.app](https://smart-mini-ledger-ijci8akre-challa-balajis-projects.vercel.app) |
| **Backend API** (Render) | [smart-mini-ledger.onrender.com/api/v1](https://smart-mini-ledger.onrender.com/api/v1) |

**Test Account:** Register a new account at the live URL to get started.

---

## Screenshots

<!-- Replace the placeholder paths below with actual screenshot files in a `screenshots/` directory -->

| Page | Preview |
|---|---|
| **Login** | ![Login](screenshots/login.png) |
| **Dashboard** | ![Dashboard](screenshots/dashboard.png) |
| **Transactions** | ![Transactions](screenshots/transactions.png) |
| **Budgets** | ![Budgets](screenshots/budgets.png) |
| **Analytics** | ![Analytics](screenshots/analytics.png) |
| **Simulator** | ![Simulator](screenshots/simulator.png) |
| **Profile** | ![Profile](screenshots/profile.png) |
| **Settings** | ![Settings](screenshots/settings.png) |

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Frontend (Vercel)                  │
│  React 19 + TypeScript + Vite + Tailwind CSS        │
│  React Query (caching) + React Router (routing)     │
│  Axios (HTTP) + Zod (validation) + Framer Motion    │
└──────────────────────┬──────────────────────────────┘
                       │ HTTPS (REST API)
                       ▼
┌─────────────────────────────────────────────────────┐
│                  Backend (Render)                    │
│  Express + TypeScript + Prisma ORM                  │
│  JWT Auth + Helmet + CORS + Rate Limiting           │
│  Controller → Service → Repository → Prisma         │
└──────────────────────┬──────────────────────────────┘
                       │ Prisma Client (connection pool)
                       ▼
┌─────────────────────────────────────────────────────┐
│              Database (Neon PostgreSQL)              │
│  Users · Transactions · Budgets                     │
└─────────────────────────────────────────────────────┘
```

---

## Folder Structure

```
smart-mini-ledger/
├── backend/
│   ├── prisma/
│   │   ├── migrations/          # Database migration history
│   │   └── schema.prisma        # Database schema definition
│   ├── src/
│   │   ├── config/db.ts         # Prisma client singleton
│   │   ├── controllers/         # Request/response handlers
│   │   │   ├── AuthController.ts
│   │   │   ├── TransactionController.ts
│   │   │   ├── BudgetController.ts
│   │   │   ├── DashboardController.ts
│   │   │   └── AnalyticsController.ts
│   │   ├── middleware/
│   │   │   ├── authMiddleware.ts       # JWT verification
│   │   │   ├── validationMiddleware.ts # Zod schema validation
│   │   │   └── errorMiddleware.ts      # Centralized error handling
│   │   ├── repositories/        # Database access layer
│   │   │   ├── UserRepository.ts
│   │   │   ├── TransactionRepository.ts
│   │   │   └── BudgetRepository.ts
│   │   ├── routes/              # Express route definitions
│   │   ├── services/            # Business logic layer
│   │   │   ├── AuthService.ts
│   │   │   ├── TransactionService.ts
│   │   │   ├── BudgetService.ts
│   │   │   ├── DashboardService.ts
│   │   │   └── AnalyticsService.ts    # Health score + insights
│   │   ├── utils/errors.ts      # Custom error classes
│   │   └── validators/          # Zod validation schemas
│   ├── Dockerfile               # Multi-stage production build
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/                 # API layer (Axios + auth endpoints)
│   │   ├── components/
│   │   │   ├── ErrorBoundary.tsx     # React error boundary
│   │   │   ├── SpendingHeatmap.tsx   # 30-day spending heatmap
│   │   │   ├── layout/              # DashboardLayout, Sidebar, Navbar
│   │   │   └── ui/                  # Reusable UI components
│   │   │       ├── Button.tsx
│   │   │       ├── Card.tsx
│   │   │       ├── Dialog.tsx
│   │   │       ├── EmptyState.tsx
│   │   │       ├── Input.tsx
│   │   │       ├── Skeleton.tsx
│   │   │       ├── Sidebar.tsx
│   │   │       └── Navbar.tsx
│   │   ├── contexts/            # Auth + Theme providers
│   │   ├── hooks/               # React Query hooks
│   │   └── pages/               # Route-level page components
│   │       ├── Dashboard.tsx
│   │       ├── Transactions.tsx
│   │       ├── Budgets.tsx
│   │       ├── Analytics.tsx
│   │       ├── Simulator.tsx    # What-if budget simulator
│   │       ├── Profile.tsx
│   │       ├── Settings.tsx
│   │       ├── NotFound.tsx     # 404 page
│   │       └── auth/            # Login + Register
│   ├── Dockerfile               # Multi-stage with Nginx
│   ├── nginx.conf               # SPA routing + security headers
│   └── package.json
│
├── docker-compose.yml           # Full-stack orchestration
└── README.md
```

---

## Features

### Authentication & Security

- Secure user registration with bcrypt password hashing (12 salt rounds)
- JWT authentication with dual token storage (httpOnly cookie + localStorage)
- Protected routes with automatic redirect to login
- Cross-tab authentication synchronization via custom events
- Rate limiting (100 requests / 15 min per IP)
- Helmet security headers
- CORS origin allowlist
- Zod validation on both client and server

### Dashboard

- Personalized greeting based on time of day
- 4 stat cards with sparkline animations: balance, income, expenses, savings
- Financial health score rendered as an animated SVG radial gauge (0–100)
- Tooltip explaining the 5-factor health score calculation
- 3–5 smart spending insights
- Recent transactions table (last 5)
- Expense-by-category donut chart
- Monthly cash flow bar chart
- Budget overview with progress bars and status badges

### Transaction Management

- Full CRUD operations for income and expense transactions
- 12 pre-defined categories (Food & Dining, Salary, Freelance, etc.)
- Real-time search by title or notes
- Filter by type, category, and sort order
- Paginated data table with income/expense summary strip
- Delete with confirmation

### Budget Management

- Create per-category monthly spending limits
- Edit and delete budgets
- Progress bars with color-coded status (On Track / Near Limit / Over Budget)
- Summary cards: total budget, total spent, over-budget count

### Analytics

- Net balance, income, expenses, and savings trend cards
- Monthly cash flow SVG line chart (6-month window)
- Financial health score gauge with breakdown tooltip
- Savings rate progress bar
- Category-wise spending breakdown with horizontal bars
- Largest expense highlight
- 3–5 dynamic smart insights
- 30-day spending heatmap

### What-if Budget Simulator

- Interactive sliders for Food, Shopping, Entertainment, Travel, and Healthcare
- Real-time calculation of: Monthly Balance, Savings, Savings Rate, Remaining Budget
- Projected Financial Health Score with animated gauge
- Income allocation percentage indicator
- Budgeting tip with the 50/30/20 rule

### Profile & Settings

- Avatar upload with preview (stored in localStorage)
- Password change with strength indicator (Weak / Fair / Good / Strong)
- Appearance toggle (light / dark mode) with system preference detection
- Localization preferences (currency, language, timezone)
- Notification toggles (email digest, budget alerts)
- Export CSV and clear data actions
- Toast notifications for all save operations

### UI/UX

- Dark mode with system preference detection and localStorage persistence
- Framer Motion page transitions with AnimatePresence
- Skeleton loading states on all data-dependent views
- Empty states with actionable CTAs
- Toast notifications for success, error, and loading feedback
- Responsive mobile bottom navigation bar
- Collapsible filter panel on small screens
- `prefers-reduced-motion` support for accessibility
- Professional FinTech color palette (inspired by Stripe, Linear, Revolut)

---

## Unique Features

### Financial Health Score (0–100)

A composite scoring algorithm that evaluates financial health across **5 weighted factors**:

| Factor | Max Points | Description |
|---|---|---|
| **Savings Rate** | 30 | Percentage of income saved (20%+ = max score) |
| **Income vs Expense Ratio** | 25 | How much of income is spent (50% or less = max) |
| **Budget Utilization** | 20 | Adherence to set budget limits (80% or less = max) |
| **Budget Overruns** | 15 | Number of categories exceeding limits (0 = max) |
| **Spending Consistency** | 10 | Low standard deviation of daily spending = max |

Score ranges: **90–100** Excellent · **75–89** Good · **60–74** Average · **40–59** Needs Improvement · **0–39** Critical

### Smart Insights Engine

Generates 3–5 context-aware financial insights per user:

- Savings rate analysis (above/below 20% target)
- Month-over-month spending comparison (percentage increase/decrease)
- Largest expense category identification
- Budget overrun warnings
- Budget exhaustion alerts
- Spending consistency evaluation
- Income/expense deficit warnings

### What-if Budget Simulator

Adjust sliders for 5 expense categories and instantly see projected impact on:
- Monthly balance and savings
- Savings rate percentage
- Financial health score
- Budget allocation vs income ratio

### Spending Heatmap

A GitHub-style contribution heatmap showing daily spending intensity over the last 30 days with 4 color levels and tooltip details on hover.

---

## Technology Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| React | 19.2 | UI framework |
| TypeScript | 6.0 | Type safety |
| Vite | 8.1 | Build tool with code splitting |
| Tailwind CSS | 3.4 | Utility-first styling |
| React Router | 7.18 | Client-side routing with lazy loading |
| TanStack React Query | 5.101 | Server-state caching and invalidation |
| Axios | 1.18 | HTTP client with interceptors |
| React Hook Form | 7.81 | Form state management |
| Zod | 3.25 | Schema validation |
| Framer Motion | 12.42 | Page transition animations |
| Lucide React | 1.24 | Icon library |
| React Hot Toast | 2.6 | Toast notifications |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| Node.js | 20.x | Runtime |
| Express | 4.19 | HTTP framework |
| TypeScript | 5.4 | Type safety |
| Prisma | 5.13 | ORM and migrations |
| bcrypt | 5.1 | Password hashing (12 rounds) |
| jsonwebtoken | 9.0 | JWT creation and verification |
| Zod | 3.23 | Request payload validation |
| Helmet | 7.1 | Security HTTP headers |
| CORS | 2.8 | Cross-origin resource sharing |
| Compression | 1.7 | gzip response compression |
| Morgan | 1.10 | HTTP request logging |
| express-rate-limit | 7.2 | Rate limiting (100 req/15 min) |

### Infrastructure

| Service | Provider |
|---|---|
| Frontend Hosting | [Vercel](https://vercel.com) |
| Backend Hosting | [Render](https://render.com) |
| Database | [Neon](https://neon.tech) (PostgreSQL) |
| Containerization | Docker + Docker Compose |
| Static Serving | Nginx (in Docker) |

---

## Database Design

### Entity Relationship

```
┌──────────────┐       ┌──────────────────┐       ┌──────────────┐
│     User     │       │   Transaction    │       │    Budget    │
├──────────────┤       ├──────────────────┤       ├──────────────┤
│ id      (PK) │──┐    │ id          (PK) │       │ id      (PK) │
│ fullName     │  │    │ userId      (FK) │       │ userId  (FK) │
│ email   (UQ) │  ├───>│ title            │       │ category(UQ) │
│ password     │  │    │ amount           │       │ monthlyLimit │
│ createdAt    │  │    │ type (income/exp) │       │ createdAt    │
│ updatedAt    │  │    │ category         │       │ updatedAt    │
│              │  │    │ notes            │       │              │
│              │  │    │ transactionDate  │       └──────────────┘
│              │  │    │ createdAt        │
│              │  │    │ updatedAt        │
│              │  │    └──────────────────┘
│              │  │
└──────────────┘  └──── Unique constraint: [userId, category] on Budget
```

### Models

- **User**: id (UUID), fullName, email (unique), password (bcrypt hash), timestamps
- **Transaction**: id (UUID), userId (FK, cascade delete), title, amount, type, category, notes?, transactionDate, timestamps
- **Budget**: id (UUID), userId (FK, cascade delete), category, monthlyLimit, timestamps, unique(userId, category)

---

## API Documentation

### Base URL

```
Production: https://smart-mini-ledger.onrender.com/api/v1
Development: http://localhost:5000/api/v1
```

### Public Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Login and receive JWT token |
| `POST` | `/auth/logout` | Clear authentication cookie |

### Protected Endpoints (requires `Authorization: Bearer <token>`)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/auth/me` | Get current user profile |
| `POST` | `/transactions` | Create a transaction |
| `GET` | `/transactions` | List transactions (with search, filter, sort, pagination) |
| `GET` | `/transactions/:id` | Get a single transaction |
| `PUT` | `/transactions/:id` | Update a transaction |
| `DELETE` | `/transactions/:id` | Delete a transaction |
| `POST` | `/budgets` | Create a budget limit |
| `GET` | `/budgets` | List all budgets |
| `PUT` | `/budgets/:id` | Update a budget limit |
| `DELETE` | `/budgets/:id` | Delete a budget |
| `GET` | `/dashboard/summary` | Dashboard stats + budget usage |
| `GET` | `/analytics` | Full analytics with health score, insights, heatmap |

### Transaction Query Parameters

| Parameter | Type | Description |
|---|---|---|
| `search` | string | Search title and notes |
| `category` | string | Filter by category |
| `type` | string | Filter by "income" or "expense" |
| `sortBy` | string | Sort: "date_asc", "date_desc", "amount_asc", "amount_desc" |
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 10) |

---

## Installation

### Prerequisites

- Node.js 20+
- npm or yarn
- PostgreSQL database (or Neon account)

### Backend

```bash
cd backend
npm install
cp .env.example .env    # Configure environment variables
npx prisma generate
npx prisma migrate deploy
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local    # Configure API URL
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:5000`.

---

## Environment Variables

### Backend (`.env`)

```env
DATABASE_URL=postgresql://user:password@host:5432/dbname?sslmode=require
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
PORT=5000
```

### Frontend (`.env.local`)

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_APP_NAME=Smart Mini Ledger
```

---

## Deployment

### Frontend (Vercel)

1. Connect GitHub repository to Vercel
2. Set root directory to `frontend`
3. Add environment variables: `VITE_API_BASE_URL`
4. Deploy — Vercel auto-detects Vite project

### Backend (Render)

1. Connect GitHub repository to Render
2. Set root directory to `backend`
3. Build command: `npm install && npm run build`
4. Start command: `npm run start`
5. Add environment variables: `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `NODE_ENV`, `FRONTEND_URL`

### Database (Neon)

1. Create a Neon account and project
2. Create a PostgreSQL database
3. Copy the connection string to `DATABASE_URL`
4. Run `npx prisma migrate deploy` on first deploy

---

## Docker

### Using Docker Compose

```bash
# From the project root
docker-compose up --build
```

This starts both frontend (port 3000) and backend (port 5000) with proper health checks and environment variable interpolation.

### Individual Containers

```bash
# Backend
cd backend
docker build -t sml-backend .
docker run -p 5000:5000 --env-file .env sml-backend

# Frontend
cd frontend
docker build --build-arg VITE_API_BASE_URL=https://your-api.com/api/v1 -t sml-frontend .
docker run -p 3000:80 sml-frontend
```

---

## Testing

### Manual Testing Checklist

- [ ] User registration with valid/invalid data
- [ ] Login and logout flow
- [ ] JWT token persistence across page refreshes
- [ ] Transaction CRUD operations
- [ ] Budget CRUD operations
- [ ] Search, filter, sort, and pagination
- [ ] Dashboard data aggregation
- [ ] Analytics health score calculation
- [ ] What-if simulator real-time updates
- [ ] Dark mode toggle
- [ ] Responsive layout (mobile, tablet, desktop)
- [ ] Toast notifications for all operations
- [ ] Error boundary catches runtime errors
- [ ] 404 page for invalid routes

### Build Validation

```bash
# Frontend
cd frontend && npm run build    # TypeScript + Vite build

# Backend
cd backend && npm run build     # Prisma generate + TypeScript compile
```

---

## Security

| Measure | Implementation | Status |
|---|---|---|
| Password Hashing | bcrypt, 12 salt rounds | Verified |
| JWT Authentication | Signed tokens, 7-day expiry | Verified |
| httpOnly Cookies | XSS protection for token storage | Verified |
| Protected Routes | Frontend route guards + backend middleware | Verified |
| Helmet | Security headers (CSP, X-Frame-Options, etc.) | Verified |
| CORS | Dynamic origin allowlist | Verified |
| Rate Limiting | 100 requests per 15 minutes | Verified |
| Input Validation | Zod schemas (client + server) | Verified |
| Ownership Verification | All data ops verify user ownership | Verified |
| Environment Variables | Secrets in .env, never committed | Verified |
| Non-root Container | Docker runs as appuser | Verified |

---

## Performance

### Frontend Optimizations

| Optimization | Implementation |
|---|---|
| **Code Splitting** | React.lazy() + Vite manual chunks (vendor, ui, data, forms) |
| **Server-State Caching** | React Query with stale-time and query invalidation |
| **Image Optimization** | Avatar stored as base64 in localStorage (client-only) |
| **Memoization** | useMemo for expensive computations in Heatmap, Simulator |
| **Lazy Loading** | All page components loaded on-demand |
| **CSS Optimization** | Tailwind CSS purging unused styles |

### Backend Optimizations

| Optimization | Implementation |
|---|---|
| **Response Compression** | gzip via compression middleware |
| **Database Indexing** | Prisma-managed indexes on foreign keys |
| **Connection Pooling** | Neon pooler endpoint |
| **Non-blocking Middleware** | Async handlers with proper error propagation |

---

## AI Usage

This project was developed with the assistance of the following AI tools:

### ChatGPT (OpenAI)

**Usage:** Architecture discussions, code generation, debugging assistance, and documentation.

- Generated boilerplate for Express server setup, Prisma schema, and React component scaffolding
- Assisted with designing the Controller → Service → Repository architecture pattern
- Helped write Zod validation schemas for both client and server
- Generated the Docker multi-stage build configuration
- Assisted in debugging CORS configuration issues during deployment
- Helped draft the initial README structure

### Antigravity

**Usage:** Rapid prototyping and component generation.

- Generated reusable UI component patterns (Button, Card, Dialog, Input)
- Created the initial CRUD operations for transactions and budgets
- Helped scaffold the React Query hooks
- Assisted with generating the dashboard layout and mobile navigation

### Stitch AI

**Usage:** Code review, optimization, and refactoring guidance.

- Reviewed and improved the financial health score algorithm
- Suggested the 5-factor scoring model for the health score
- Assisted with optimizing React Query cache invalidation patterns
- Helped identify and fix TypeScript type inconsistencies

---

## Human Engineering

While AI tools accelerated development significantly, the following required substantial manual effort, engineering judgment, and debugging:

### Prisma Deployment

- **Issue:** Prisma client generation failed on Render due to binary target mismatch
- **Fix:** Added `binaryTargets: ["native", "debian-openssl-3.0.x"]` to `schema.prisma` and configured `postinstall` script

### TypeScript Configuration

- **Issue:** TypeScript 6.0 on the frontend introduced stricter type checking that broke existing code
- **Fix:** Manually resolved type errors across all components, adjusted `tsconfig.json` settings

### Docker Compatibility

- **Issue:** Multi-stage Docker build failed due to Prisma engine not being available in the production image
- **Fix:** Restructured Dockerfile to copy `node_modules` with Prisma from the builder stage, added non-root `appuser`

### CORS Debugging

- **Issue:** CORS blocked requests from the Vercel deployment due to dynamic preview URLs
- **Fix:** Implemented dynamic origin allowlist in `app.ts` that checks `FRONTEND_URL` environment variable and multiple Vercel domains

### Environment Variable Configuration

- **Issue:** Environment variables not properly interpolated in Docker Compose
- **Fix:** Configured `docker-compose.yml` with proper env_file references and build args for Vite

### Production Deployment Debugging

- **Issue:** Backend crashed on Render with "Cannot find module" errors
- **Fix:** Restructured the build process to ensure `prisma generate` runs before TypeScript compilation, fixed the `tsconfig.json` output configuration

### UI Improvements

- **Issue:** Initial UI was functional but lacked professional polish
- **Fix:** Manually refined spacing, typography, color palette, hover effects, and transitions across all components to achieve a FinTech-quality look

### Component Refactoring

- **Issue:** Duplicate Sidebar and Navbar components existed in both `components/layout/` and `components/ui/`
- **Fix:** Consolidated to single source of truth, updated all imports

### Responsive Design Fixes

- **Issue:** Mobile layout broke on smaller screens, bottom nav overlapped content
- **Fix:** Added proper padding, adjusted breakpoints, implemented collapsible filter panels

### Authentication Debugging

- **Issue:** Cross-tab synchronization not working correctly
- **Fix:** Implemented custom window events (`auth:login`, `auth:unauthorized`) for cross-tab communication

### State Management Improvements

- **Issue:** Stale data displayed after mutations
- **Fix:** Configured proper React Query invalidation across all mutation hooks

### API Integration Corrections

- **Issue:** Analytics API response didn't match frontend types
- **Fix:** Manually aligned TypeScript interfaces with actual API response shapes

### Manual Testing

- **Issue:** Automated testing was not in scope, but comprehensive manual testing was required
- **Fix:** Manually tested all CRUD flows, authentication, responsive design, dark mode, error states, and edge cases across multiple browsers

### All architectural decisions, deployment troubleshooting, production validation, testing, debugging, and engineering decisions were completed manually.

---

## Future Improvements

- [ ] Automated testing (Vitest + React Testing Library + Playwright)
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] End-to-end encryption for sensitive financial data
- [ ] Recurring transactions and subscription tracking
- [ ] Multi-currency support with real exchange rates
- [ ] Data export (CSV, PDF reports)
- [ ] Push notifications for budget alerts
- [ ] Bank account integration via Plaid API
- [ ] Advanced analytics (trend forecasting, spending predictions)
- [ ] Team/household budget sharing
- [ ] Mobile app (React Native)
- [ ] WebSocket real-time updates

---

## License

MIT License — see [LICENSE](./LICENSE) for details.

---

## Author

**Challa Balaja**
Email: challabalaji@gmail.com
GitHub: [github.com/challabalaji](https://github.com/challabalaji)

Built with engineering judgment and production-grade practices for the **ByteX Financial Ltd. Junior Full Stack Engineer Challenge**.
