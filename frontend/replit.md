# TokenJobs — Job Hunting Made Easy

A mobile-style React + TypeScript job hunting app with an Express/MongoDB backend and Gemini AI integration.

## Architecture

- **Frontend**: React 19 + TypeScript, Vite 6, Tailwind CSS 4
- **Backend**: Express + Mongoose (TypeScript), running on port 3001
- **Database**: MongoDB Atlas (via `MONGODB_URI` secret)
- **AI**: Google Gemini API (via `GEMINI_API_KEY` secret)

## Project Layout

```
/                   # Frontend (React/Vite)
  App.tsx           # Root component / router
  screens/          # Page-level screen components
  components/       # Reusable UI components
  services/         # Gemini AI service
  types.ts          # Shared TypeScript types
  constants.ts      # App-wide constants
  vite.config.ts    # Vite config (port 5000, proxy to backend)

/server/            # Backend (Express)
  index.ts          # Express app + Mongoose models + routes
  seed.ts           # Database seeding script
  tsconfig.json     # Server TypeScript config
```

## Workflows

- **Start application** — `npm run dev` — Frontend on port 5000 (webview)
- **Backend API** — `cd server && npm run dev` — Backend on port 3001 (console)

## Required Secrets

| Secret | Purpose |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `GEMINI_API_KEY` | Google Gemini API key for AI Coach feature |

## API Proxy

Vite proxies `/api/*` requests from the frontend to `http://localhost:3001`, so the frontend and backend work seamlessly together in dev.

## Deployment

Configured for `autoscale` deployment. Build compiles both frontend and backend TypeScript, and serves the Vite preview alongside the Node.js API server.
