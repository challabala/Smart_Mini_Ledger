# Smart Mini Ledger

A personal finance tracking application with income/expense management, budgeting, analytics, and dashboard features.

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Express, TypeScript, Prisma ORM
- **Database**: PostgreSQL (Neon)
- **Deployment**: Vercel (Frontend), Render (Backend)

## Project Structure

This is a monorepo containing two independent applications. Each app manages its own dependencies and can be installed, built, and deployed separately.

```
smart-mini-ledger/
├── backend/    # Express API server
├── frontend/   # React SPA
└── README.md
```

## Getting Started

### Backend

```bash
cd backend
cp .env.example .env.development
# Edit .env.development with your database credentials
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
```

### Frontend

```bash
cd frontend
cp .env.example .env.development
npm install
npm run dev
```

## Environment Variables

### Backend

| Variable | Required | Description | Example |
|---|---|---|---|
| `PORT` | No | Server port | `5000` |
| `NODE_ENV` | Yes | Environment mode | `development` or `production` |
| `DATABASE_URL` | Yes | PostgreSQL connection string | `postgresql://user:pass@host/db?sslmode=require` |
| `JWT_SECRET` | Yes | Secret key for JWT signing | `your_random_secret_here` |
| `JWT_EXPIRES_IN` | Yes | JWT token expiry duration | `7d` |
| `FRONTEND_URL` | Yes | Frontend origin for CORS | `http://localhost:5173` |

### Frontend

| Variable | Required | Description | Example |
|---|---|---|---|
| `VITE_API_BASE_URL` | Yes | Backend API base URL | `http://localhost:5000/api/v1` |
| `VITE_APP_NAME` | No | Application display name | `Smart Mini Ledger` |

## Production Deployment

### Render (Backend)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set the root directory to `backend`
4. Configure the following:

| Setting | Value |
|---|---|
| Root Directory | `backend` |
| Build Command | `npm install && npm run build` |
| Start Command | `npm run start` |

5. Add the following environment variables in Render's dashboard:

| Variable | Value |
|---|---|
| `DATABASE_URL` | Your Neon PostgreSQL connection string |
| `JWT_SECRET` | A strong random secret |
| `JWT_EXPIRES_IN` | `7d` |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | Your Vercel frontend URL (e.g. `https://your-app.vercel.app`) |

### Vercel (Frontend)

1. Import your repository on Vercel
2. Set the root directory to `frontend`
3. Add the following environment variables:

| Variable | Value |
|---|---|
| `VITE_API_BASE_URL` | Your Render backend URL + `/api/v1` (e.g. `https://your-app.onrender.com/api/v1`) |
| `VITE_APP_NAME` | `Smart Mini Ledger` |

## Docker Installation

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed

### Environment Variables for Docker

Create a `.env` file in the project root (`smart-mini-ledger/.env`):

```env
DATABASE_URL=postgresql://username:password@host/database?sslmode=require
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

### Docker Build

Build the images:

```bash
docker compose build
```

Or build individual services:

```bash
docker compose build backend
docker compose build frontend
```

### Docker Run

Start all services:

```bash
docker compose up
```

Start in detached mode:

```bash
docker compose up -d
```

Stop all services:

```bash
docker compose down
```

Rebuild and start:

```bash
docker compose up --build
```

### Docker Compose Services

| Service | Port | Description |
|---|---|---|
| `backend` | `5000` | Express API server |
| `frontend` | `3000` | React SPA served by nginx |

Access the application at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000/api/v1`

### Production Deployment

**With Docker (Render / any VPS)**

1. Build the production images:
   ```bash
   docker compose -f docker-compose.yml build
   ```
2. Push images to your container registry or deploy directly on a VPS.

**Without Docker (Vercel + Render)**

Follow the original deployment instructions in the [Production Deployment](#production-deployment) section above.

## Environment Files

The following environment files are **ignored** by Git (contain secrets):

- `.env`
- `.env.local`
- `.env.production`
- `.env.*.local`

The following environment files are **committed** (safe templates):

- `.env.example`
- `.env.development`
