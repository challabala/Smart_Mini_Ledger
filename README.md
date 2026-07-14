<div align="center">

# Smart Mini Ledger

### A Modern Full-Stack Personal Finance Management Application

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

A secure, responsive, and production-deployed finance tracker with real-time insights, budget management, and a modern dark-mode UI.

[Live Frontend](https://smart-mini-ledger-ijci8akre-challa-balajis-projects.vercel.app/login) · [Live Backend API](https://smart-mini-ledger.onrender.com/api/v1/hello)

</div>

---

## Table of Contents

- [Project Overview](#-project-overview)
- [Live Demo](#-live-demo)
- [Screenshots](#-screenshots)
- [Features](#-features)
- [Unique Features](#-unique-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Database Design](#-database-design)
- [Deployment](#-deployment)
- [Docker](#-docker)
- [Testing](#-testing)
- [Security](#-security)
- [Performance Optimizations](#-performance-optimizations)
- [AI Usage](#-ai-usage)
- [Challenges Faced](#-challenges-faced)
- [Future Improvements](#-future-improvements)
- [License](#-license)
- [Author](#-author)
- [Acknowledgements](#-acknowledgements)

---

## Project Overview

**Smart Mini Ledger** is a full-stack personal finance management application built as part of the **ByteX Financial Ltd. Junior Full Stack Engineer Challenge**.

It enables users to track income and expenses, set category-wise budgets, and gain financial insights through an interactive dashboard with charts, health scores, and smart spending recommendations.

### Purpose

- Provide a clean, professional alternative to spreadsheet-based finance tracking
- Demonstrate full-stack engineering proficiency across frontend, backend, database, and deployment
- Showcase production-grade practices including authentication, validation, security hardening, and containerization

### Key Features

- Secure user registration and login with JWT authentication
- Full CRUD operations for transactions and budgets
- Interactive dashboard with financial health scoring
- Analytics with cash flow charts, category breakdowns, and smart insights
- Dark mode, responsive design, and smooth page transitions
- Production-deployed on Vercel, Render, and Neon with Docker support

---

## Live Demo

| Service | URL |
|---|---|
| **Frontend** (Vercel) | [https://smart-mini-ledger-git-main-challa-balajis-projects.vercel.app](https://smart-mini-ledger-git-main-challa-balajis-projects.vercel.app) |
| **Backend API** (Render) | [https://smart-mini-ledger.onrender.com/api/v1](https://smart-mini-ledger.onrender.com/api/v1) |

---

## Screenshots

> Replace the placeholder paths below with actual screenshot files in a `screenshots/` directory.

### Login

![Login Page](screenshots/login.png)

### Register

![Register Page](screenshots/register.png)

### Dashboard

![Dashboard](screenshots/dashboard.png)

### Transactions

![Transactions Page](screenshots/transactions.png)

### Budgets

![Budgets Page](screenshots/budgets.png)

### Analytics

![Analytics Page](screenshots/analytics.png)

### Profile

![Profile Page](screenshots/profile.png)

### Settings

![Settings Page](screenshots/settings.png)

---

## Features

### Authentication & Security

- Secure user registration with password hashing (bcrypt, 12 salt rounds)
- JWT authentication with httpOnly cookie support
- Protected routes with automatic redirect to login
- Cross-tab authentication synchronization
- Rate limiting (100 requests / 15 min per IP)
- Helmet security headers

### Dashboard

- Personalized greeting based on time of day
- Stat cards: current balance, total income, total expenses, net savings
- Financial health score rendered as an SVG radial gauge
- Smart spending insight recommendations
- Recent transactions table (last 5)
- Expense-by-category donut chart
- Monthly cash flow bar chart
- Budget overview with progress bars and status badges

### Transaction Management

- Add income or expense transactions
- 12 pre-defined categories (Food & Dining, Salary, Freelance, etc.)
- Real-time search by title or notes
- Filter by type, category, and sort order
- Paginated data table with summary strip
- Delete with confirmation

### Budget Management

- Create per-category monthly spending limits
- Edit and delete budgets
- Progress bars with color-coded status (On Track / Near Limit / Over Budget)
- Summary cards: total budget, total spent, over-budget count

### Analytics

- Net balance, income, expenses, and savings trend cards
- Monthly cash flow SVG line chart (6-month window)
- Financial health score gauge
- Savings rate progress bar
- Category-wise spending breakdown with horizontal bars
- Largest expense highlight
- Dynamic smart insights

### Profile & Settings

- Avatar upload with preview (stored in localStorage)
- Password change with strength indicator (Weak / Fair / Good / Strong)
- Appearance toggle (light / dark mode)
- Localization preferences (currency, language, timezone)
- Notification toggles (email digest, budget alerts)
- Export CSV and clear data actions

### UI/UX

- Dark mode with system preference detection
- Framer Motion page transitions
- Skeleton loading states on all data-dependent views
- Empty states with actionable CTAs
- Toast notifications for success and error feedback
- Responsive mobile bottom navigation bar
- Collapsible filter panel on small screens
- Form validation on both client (Zod) and server (Zod)

---

## Unique Features

### Financial Health Score

A proprietary scoring algorithm that evaluates the user's financial standing based on savings rate and expense-to-income ratio. The score is rendered as an animated SVG radial gauge with color-coded thresholds (Excellent / Good / Fair).

### Smart Spending Insights

Dynamic, context-aware recommendations generated from the user's actual transaction data. Examples:

- "Great job! You're saving over 30% of your income."
- "Your spending in Shopping is high relative to your income."
- "Consider setting a budget for Transportation."

### Modern Dashboard

A single-page overview combining 4 stat cards, 3 charts (donut, bar, radial), a transactions table, and budget progress cards — all fetched from a single aggregated API endpoint.

### Responsive Mobile Experience

A complete mobile layout with bottom tab navigation, collapsible filter panels, and touch-friendly interactions — built without a framework, using only Tailwind CSS breakpoints.

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool and dev server |
| Tailwind CSS | Utility-first styling |
| React Router v7 | Client-side routing |
| TanStack React Query | Server-state management and caching |
| Axios | HTTP client with interceptors |
| React Hook Form | Form state management |
| Zod | Schema validation (client + server) |
| Framer Motion | Page transition animations |
| Lucide React | Icon library |
| React Hot Toast | Toast notifications |

### Backend

| Technology | Purpose |
|---|---|
| Node.js 20 | Runtime |
| Express | HTTP framework |
| TypeScript | Type safety |
| Prisma ORM | Database access and migrations |
| PostgreSQL | Relational database |
| bcrypt | Password hashing (12 rounds) |
| jsonwebtoken | JWT creation and verification |
| Zod | Request payload validation |
| Helmet | Security HTTP headers |
| CORS | Cross-origin resource sharing |
| Compression | gzip response compression |
| Morgan | HTTP request logging |
| express-rate-limit | Rate limiting |

### Database

| Service | Provider |
|---|---|
| PostgreSQL | [Neon](https://neon.tech) |

### Deployment

| Layer | Platform |
|---|---|
| Frontend | [Vercel](https://vercel.com) |
| Backend | [Render](https://render.com) |
| Database | [Neon](https://neon.tech) |

### Containerization

| Tool | Purpose |
|---|---|
| Docker | Production-ready container images |
| Docker Compose | Multi-service orchestration |
| Nginx | Static file serving for frontend |

---

## Project Structure

```
smart-mini-ledger/
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts
│   │   ├── constants/
│   │   ├── controllers/
│   │   │   ├── AuthController.ts
│   │   │   ├── TransactionController.ts
│   │   │   ├── BudgetController.ts
│   │   │   ├── DashboardController.ts
│   │   │   └── AnalyticsController.ts
│   │   ├── middleware/
│   │   │   ├── authMiddleware.ts
│   │   │   ├── validationMiddleware.ts
│   │   │   └── errorMiddleware.ts
│   │   ├── repositories/
│   │   │   ├── UserRepository.ts
│   │   │   ├── TransactionRepository.ts
│   │   │   └── BudgetRepository.ts
│   │   ├── routes/
│   │   │   ├── authRoutes.ts
│   │   │   ├── transactionRoutes.ts
│   │   │   ├── budgetRoutes.ts
│   │   │   ├── dashboardRoutes.ts
│   │   │   └── analyticsRoutes.ts
│   │   ├── services/
│   │   │   ├── AuthService.ts
│   │   │   ├── TransactionService.ts
│   │   │   ├── BudgetService.ts
│   │   │   ├── DashboardService.ts
│   │   │   └── AnalyticsService.ts
│   │   ├── types/
│   │   ├── utils/
│   │   │   └── errors.ts
│   │   ├── validators/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   ├── axiosInstance.ts
│   │   │   └── auth.ts
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── DashboardLayout.tsx
│   │   │   │   ├── ProtectedRoute.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── Navbar.tsx
│   │   │   └── ui/
│   │   │       ├── Button.tsx
│   │   │       ├── Card.tsx
│   │   │       ├── Input.tsx
│   │   │       ├── Dialog.tsx
│   │   │       ├── Skeleton.tsx
│   │   │       └── EmptyState.tsx
│   │   ├── context/
│   │   │   ├── AuthContext.tsx
│   │   │   └── ThemeContext.tsx
│   │   ├── hooks/
│   │   │   ├── useTransactions.ts
│   │   │   ├── useDashboard.ts
│   │   │   ├── useAnalytics.ts
│   │   │   └── useBudgets.ts
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── Login.tsx
│   │   │   │   └── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Transactions.tsx
│   │   │   ├── Budgets.tsx
│   │   │   ├── Analytics.tsx
│   │   │   ├── Profile.tsx
│   │   │   ├── Settings.tsx
│   │   │   └── NotFound.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── .dockerignore
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## Installation

### Prerequisites

- [Node.js 20+](https://nodejs.org)
- [npm](https://www.npmjs.com)
- [PostgreSQL](https://www.postgresql.org) (or a Neon account)
- [Docker](https://docs.docker.com/get-docker/) (optional)

### Clone the Repository

```bash
git clone https://github.com/challabala/smart-mini-ledger.git
cd smart-mini-ledger
```

### Backend Setup

```bash
cd backend
cp .env.example .env.development
# Edit .env.development with your database credentials
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

The backend starts at `http://localhost:5000`.

### Frontend Setup

```bash
cd frontend
cp .env.example .env.development
# Edit .env.development if your backend runs on a different port
npm install
npm run dev
```

The frontend starts at `http://localhost:5173`.

---

## Environment Variables

### Frontend

| Variable | Required | Description | Example |
|---|---|---|---|
| `VITE_API_BASE_URL` | Yes | Backend API base URL | `http://localhost:5000/api/v1` |
| `VITE_APP_NAME` | No | Application display name | `Smart Mini Ledger` |

### Backend

| Variable | Required | Description | Example |
|---|---|---|---|
| `PORT` | No | Server port (default: 5000) | `5000` |
| `NODE_ENV` | Yes | Environment mode | `development` or `production` |
| `DATABASE_URL` | Yes | PostgreSQL connection string | `postgresql://user:pass@host/db?sslmode=require` |
| `JWT_SECRET` | Yes | Secret key for JWT signing | `your_random_secret_here` |
| `JWT_EXPIRES_IN` | Yes | Token expiry duration | `7d` |
| `FRONTEND_URL` | Yes | Frontend origin for CORS | `https://your-app.vercel.app` |

> **Note:** Never commit `.env` files. The `.env.example` files are committed as templates.

---

## API Documentation

All endpoints are prefixed with `/api/v1`.

### Health Check

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/v1/hello` | No | Backend health and version check |
| `GET` | `/health` | No | Simple health check |

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/v1/auth/register` | No | Register a new user |
| `POST` | `/api/v1/auth/login` | No | Log in and receive JWT |
| `POST` | `/api/v1/auth/logout` | No | Clear authentication cookie |
| `GET` | `/api/v1/auth/me` | Yes | Get current user profile |

<details>
<summary><strong>POST /auth/register</strong></summary>

**Request Body:**

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "uuid",
      "fullName": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

</details>

<details>
<summary><strong>POST /auth/login</strong></summary>

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "uuid",
      "fullName": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

</details>

### Transactions

All endpoints require authentication.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/transactions` | Get all transactions (paginated, filterable) |
| `POST` | `/api/v1/transactions` | Create a new transaction |
| `GET` | `/api/v1/transactions/:id` | Get a single transaction |
| `PUT` | `/api/v1/transactions/:id` | Update a transaction |
| `DELETE` | `/api/v1/transactions/:id` | Delete a transaction |

**Query Parameters (GET):**

| Parameter | Type | Description |
|---|---|---|
| `search` | string | Search by title or notes |
| `category` | string | Filter by category |
| `type` | string | `income` or `expense` |
| `sortBy` | string | `newest`, `oldest`, or `highest` |
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 10) |

<details>
<summary><strong>POST /transactions</strong></summary>

**Request Body:**

```json
{
  "title": "Monthly Salary",
  "amount": 5000,
  "type": "income",
  "category": "Salary",
  "transactionDate": "2026-07-01",
  "notes": "July salary"
}
```

</details>

### Budgets

All endpoints require authentication.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/budgets` | Get all budgets |
| `POST` | `/api/v1/budgets` | Create a new budget |
| `PUT` | `/api/v1/budgets/:id` | Update a budget |
| `DELETE` | `/api/v1/budgets/:id` | Delete a budget |

<details>
<summary><strong>POST /budgets</strong></summary>

**Request Body:**

```json
{
  "category": "Food & Dining",
  "monthlyLimit": 500
}
```

</details>

### Dashboard

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/v1/dashboard/summary` | Yes | Aggregated dashboard data |

### Analytics

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/v1/analytics` | Yes | Analytics summary with charts and insights |

---

## Database Design

The database uses **PostgreSQL** managed via **Prisma ORM** with three models:

### Entity Relationship

```
User (1) ──── (many) Transaction
User (1) ──── (many) Budget
```

### User

| Field | Type | Constraints |
|---|---|---|
| `id` | UUID | Primary key |
| `fullName` | String | Required |
| `email` | String | Unique |
| `password` | String | Hashed (bcrypt) |
| `createdAt` | DateTime | Default: now() |
| `updatedAt` | DateTime | Auto-updated |

### Transaction

| Field | Type | Constraints |
|---|---|---|
| `id` | UUID | Primary key |
| `userId` | UUID | Foreign key → User (cascade delete) |
| `title` | String | Required |
| `amount` | Float | Required |
| `type` | String | "income" or "expense" |
| `category` | String | Required |
| `notes` | String | Optional |
| `transactionDate` | DateTime | Default: now() |
| `createdAt` | DateTime | Default: now() |
| `updatedAt` | DateTime | Auto-updated |

### Budget

| Field | Type | Constraints |
|---|---|---|
| `id` | UUID | Primary key |
| `userId` | UUID | Foreign key → User (cascade delete) |
| `category` | String | Required |
| `monthlyLimit` | Float | Required |
| `createdAt` | DateTime | Default: now() |
| `updatedAt` | DateTime | Auto-updated |
| | | Unique constraint: (userId, category) |

---

## Deployment

### Vercel (Frontend)

1. Import the GitHub repository on Vercel
2. Set the root directory to `frontend`
3. Add environment variables:

| Variable | Value |
|---|---|
| `VITE_API_BASE_URL` | `https://your-app.onrender.com/api/v1` |
| `VITE_APP_NAME` | `Smart Mini Ledger` |

4. Deploy. Vercel auto-detects Vite and builds.

### Render (Backend)

1. Create a new Web Service on Render
2. Connect the GitHub repository
3. Configure:

| Setting | Value |
|---|---|
| Root Directory | `backend` |
| Build Command | `npm install && npm run build` |
| Start Command | `npm run start` |

4. Add environment variables in the Render dashboard:

| Variable | Value |
|---|---|
| `DATABASE_URL` | Your Neon PostgreSQL connection string |
| `JWT_SECRET` | A strong random secret |
| `JWT_EXPIRES_IN` | `7d` |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | Your Vercel frontend URL |

### Neon (Database)

1. Create a free account at [neon.tech](https://neon.tech)
2. Create a new PostgreSQL database
3. Copy the connection string and use it as `DATABASE_URL` on Render
4. Run migrations: `npx prisma migrate deploy`

---

## Docker

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Environment Variables for Docker

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://username:password@host/database?sslmode=require
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

### Docker Build

```bash
docker compose build
```

Or build individually:

```bash
docker compose build backend
docker compose build frontend
```

### Docker Run

```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f

# Stop all services
docker compose down

# Rebuild and start
docker compose up --build -d
```

### Docker Compose Services

| Service | Port | Description |
|---|---|---|
| `backend` | `5000` | Express API server (node:20-alpine) |
| `frontend` | `3000` | React SPA served by nginx:alpine |

Access the application:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000/api/v1`

---

## Testing

### Manual Testing

All features were verified through manual testing across the following workflows:

| Workflow | Steps Verified |
|---|---|
| Registration | Form validation, duplicate email handling, successful account creation |
| Login | Correct credentials, wrong password, non-existent email, JWT cookie setting |
| Logout | Cookie clearing, redirect to login, protected route access denied |
| Transactions | Create income/expense, search, filter, sort, pagination, delete with confirmation |
| Budgets | Create per-category budget, duplicate category prevention, edit, delete, over-budget detection |
| Dashboard | Stat cards, charts, recent transactions, budget overview |
| Analytics | Line chart, health score, category breakdown, smart insights |
| Profile | Avatar upload/removal, password change, strength indicator |
| Settings | Theme toggle, preference persistence, export CSV |

### API Testing

Backend APIs were tested using the `/api/v1/hello` health check endpoint and through the frontend application:

```bash
# Health check
curl https://smart-mini-ledger.onrender.com/api/v1/hello

# Expected response:
{
  "success": true,
  "message": "Smart Mini Ledger Backend is running successfully.",
  "timestamp": "2026-07-15T00:00:00.000Z",
  "environment": "production",
  "version": "1.0.0"
}
```

### Validation

- Client-side: Zod schemas validate all form inputs before submission
- Server-side: Zod schemas validate all request bodies, query parameters, and params
- Prisma: Database-level constraints (unique email, unique user-category budgets, foreign keys with cascade)

### Error Handling

- Custom `AppError` hierarchy with appropriate HTTP status codes (400, 401, 403, 404, 409, 500)
- Prisma error code mapping (P2002 → 409, P2025 → 404)
- Frontend toast notifications for all error responses
- Loading skeletons and empty states for all data-dependent views

---

## Security

| Measure | Implementation |
|---|---|
| **Password Hashing** | bcrypt with 12 salt rounds |
| **JWT Authentication** | Signed tokens with configurable expiry (default: 7d) |
| **httpOnly Cookies** | Tokens stored in httpOnly cookies for XSS protection |
| **Helmet** | Security HTTP headers (X-Frame-Options, CSP, etc.) |
| **CORS** | Origin allowlist with credentials support |
| **Rate Limiting** | 100 requests per 15 minutes per IP on `/api` routes |
| **Input Validation** | Zod schemas on both client and server |
| **Ownership Verification** | All transaction/budget operations verify user ownership |
| **Protected Routes** | Frontend route guards redirect unauthenticated users |
| **Environment Variables** | Secrets stored in environment variables, never committed |
| **Docker** | Non-root user in production container |

---

## Performance Optimizations

| Optimization | Details |
|---|---|
| **Gzip Compression** | Express compression middleware + Nginx gzip for static assets |
| **Static Asset Caching** | Nginx sets 1-year cache headers for JS, CSS, images, and fonts |
| **React Query Caching** | TanStack Query caches API responses and invalidates on mutations |
| **Optimized Builds** | Vite produces minified bundles with content hashing |
| **Multi-stage Docker** | Separate build and runtime stages for minimal production images |
| **Alpine Base Images** | `node:20-alpine` and `nginx:alpine` for small container sizes |
| **SPA Fallback** | Nginx serves `index.html` for client-side routes without server hits |
| **Lazy Animations** | Framer Motion animations are lightweight CSS transforms, not heavy JS |

---

## AI Usage

### Tools Used

- **ChatGPT** (OpenAI)
- **Anthropic Claude** (via Antigravity)
- **Stitch AI**

### How AI Accelerated Development

AI tools were used throughout the development process to speed up boilerplate generation, research solutions, and draft initial implementations. Specific use cases:

| Area | How AI Was Used |
|---|---|
| **Project scaffolding** | Generated initial project structure, boilerplate configs, and base component layouts |
| **Prisma schema design** | Drafted the initial database schema and migration setup |
| **CORS configuration** | Generated initial CORS middleware setup, which required manual correction for production origins |
| **TypeScript debugging** | Assisted in identifying type mismatches and fixing compilation errors |
| **Docker configuration** | Generated Dockerfiles and docker-compose.yml, which required manual tuning for Prisma binary targets |
| **Deployment troubleshooting** | Helped diagnose Render deployment failures, particularly the `libquery_engine-linux-musl` error |
| **UI component drafting** | Generated initial versions of dashboard charts, stat cards, and form components |
| **API route scaffolding** | Generated boilerplate for Express routes, controllers, and services |

### Where AI-Generated Code Required Human Correction

1. **Prisma binary targets**: AI initially generated `rhel-openssl-*` targets which are incorrect for Render's Debian-based environment. Fixed to `debian-openssl-3.0.x` after manual research into Render's infrastructure.

2. **CORS configuration**: AI's initial single-origin `cors()` setup failed in production because it could only allow one origin at a time. Rewrote to a dynamic allowlist function with explicit origin validation.

3. **Docker health checks**: Initial Dockerfile used `curl` for health checks, but Alpine images don't include curl. Corrected to use `wget --spider`.

4. **Helmet blocking CORS**: AI's initial `helmet()` configuration included `crossOriginResourcePolicy` which returned headers that blocked cross-origin font and image loading. Fixed by setting `crossOriginResourcePolicy: false`.

5. **TypeScript strict mode**: Several AI-generated type definitions were incomplete, particularly around Express `Request` extensions for authenticated routes. Required manual type augmentation fixes.

6. **React Query cache invalidation**: Initial mutation hooks didn't invalidate related queries, causing stale data after mutations. Manually configured proper query key invalidation patterns.

### Engineering Responsibility

All final decisions regarding architecture, debugging, deployment validation, security configuration, and testing were made manually. AI was used as a productivity tool, not as a replacement for engineering judgment.

---

## Challenges Faced

### 1. Prisma Deployment Compatibility

**Problem:** Backend crashed on Render with `Unable to require libquery_engine-linux-musl.so.node` because Prisma defaulted to the musl (Alpine) binary on Render's Debian environment.

**Solution:** Added explicit `binaryTargets = ["native", "debian-openssl-3.0.x"]` to `schema.prisma` and added a `postinstall` script to ensure `prisma generate` runs after every `npm install`.

### 2. CORS Errors in Production

**Problem:** Frontend on Vercel received CORS errors when calling the Render backend because the CORS configuration only allowed a single origin.

**Solution:** Replaced the single-origin string with a dynamic allowlist function that checks incoming `Origin` headers against a list of permitted domains. Added `credentials: true` and explicit `methods` and `allowedHeaders`.

### 3. Helmet Blocking Cross-Origin Requests

**Problem:** Helmet's default `crossOriginResourcePolicy` header blocked legitimate cross-origin resource loading from the frontend.

**Solution:** Configured `helmet({ crossOriginResourcePolicy: false })` to disable only that specific header while keeping all other security headers active.

### 4. Environment Variable Management

**Problem:** Different environment variables were needed for local development, Docker, and production deployment on Vercel/Render.

**Solution:** Maintained separate `.env.example` templates for frontend and backend, with clear documentation. Docker Compose uses variable interpolation from a root `.env` file.

### 5. TypeScript Strict Mode Issues

**Problem:** TypeScript's strict mode caught several issues with Express middleware type extensions and Prisma-generated types.

**Solution:** Added proper type augmentations for the Express `Request` object and used Prisma's generated types throughout the service layer.

### 6. Authentication Flow

**Problem:** JWT tokens needed to work across cookies and Authorization headers, with proper cross-tab synchronization.

**Solution:** Implemented dual token extraction (header + cookie), httpOnly cookie storage, and custom window events (`auth:login`, `auth:unauthorized`) for cross-tab auth state sync.

---

## Future Improvements

| Feature | Description |
|---|---|
| **Email Verification** | Verify user emails during registration |
| **Password Reset** | Forgot password flow with email-based reset tokens |
| **Recurring Transactions** | Auto-generate recurring income/expense entries |
| **Multi-Currency Support** | Real-time exchange rates and multi-currency accounts |
| **Export Reports** | PDF and Excel export of financial reports |
| **Advanced Charts** | Interactive Recharts or D3.js visualizations |
| **Notifications** | Push notifications for budget alerts and reminders |
| **Redis Caching** | Server-side caching for dashboard and analytics queries |
| **React Native Mobile App** | Cross-platform mobile application |
| **Kubernetes Deployment** | Container orchestration for horizontal scaling |
| **Automated Testing** | Unit tests (Vitest), integration tests, and E2E tests (Playwright) |
| **CI/CD Pipeline** | GitHub Actions for automated testing and deployment |

---

## License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 Challa Balaji

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Author

**Challa Balaji**

- GitHub: [https://github.com/challabala](https://github.com/challabala)
- LinkedIn: [linkedin.com/in/challabala](https://linkedin.com/in/challabala)
- Email: [challabalaji@gmail.com](mailto:challabalaji@gmail.com)

---

## Acknowledgements

- **ByteX Financial Ltd.** — for the challenge opportunity and project requirements
- **React** — the UI library that powers the frontend
- **Node.js & Express** — the runtime and framework powering the backend API
- **Prisma** — the ORM that simplified database management and migrations
- **Neon** — serverless PostgreSQL for the production database
- **Vercel** — seamless frontend deployment and hosting
- **Render** — reliable backend hosting with automatic deployments
- **Docker** — containerization for consistent development and production environments
- **Open Source Community** — for the incredible tools and libraries that made this project possible
