# IssueFlow — Issue Tracker

A full-stack issue tracker built with React + Vite, Express.js, and MongoDB.

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Zustand, React Router v6
- **Backend**: Express.js (ESM), MongoDB + Mongoose, JWT auth, bcryptjs
- **Design**: Dark theme, Syne + DM Sans fonts, glass morphism UI

## Prerequisites

- Node.js ≥ 18
- MongoDB running locally (or MongoDB Atlas URI)

## Setup

### 1. Clone & Install

```bash
git clone <repo>

# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 2. Configure Backend

Edit `backend/.env`:
(allredy push that be to)

```env
PORT=5000
MONGO_URI=mongodb+srv://hasharamsankalpam_db_user:sweQyaNvAUYa4rzb@tracker.vapejy1.mongodb.net/?appName=tracker
JWT_SECRET=supersecretkey123changeInProduction
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Edit `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000

```

### 3. Run Development Servers

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm run dev
```

### 4. Open

Visit **http://localhost:5173** — Register an account and start tracking!

## Features

- ✅ JWT Authentication (register/login/logout)
- ✅ Full CRUD for issues
- ✅ Status, Priority, Severity badges
- ✅ Search with debouncing (400ms)
- ✅ Filter by status/priority/severity
- ✅ Sorting options
- ✅ Status counts dashboard
- ✅ Confirm dialogs for destructive actions
- ✅ Pagination
- ✅ Export to CSV and JSON
- ✅ Responsive design
