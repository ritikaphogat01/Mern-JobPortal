# TokenJobs Project

This project is split into a frontend (React/Vite) and a backend (Node/Express).

## Project Structure
```
/
 ├── frontend/   (React app)
 ├── backend/    (Node + Express API)
 ├── .env.local  (Shared environment variables)
 └── package.json (Root scripts)
```

## Setup Instructions

### 1. Prerequisites
- Node.js installed on your machine.
- MongoDB Atlas account (or local MongoDB).

### 2. Environment Variables
Create or update `.env.local` in the root directory:
```dotenv
GEMINI_API_KEY=your_gemini_key
MONGODB_URI=your_mongodb_uri
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

### 3. Installation
Install dependencies for both frontend and backend:
```bash
npm run install:all
```

### 4. Running the Application
You can run both frontend and backend concurrently from the root:
```bash
npm run dev
```
- Frontend will run on `http://localhost:5000`
- Backend will run on `http://localhost:3001`

### 5. Deployment

#### Frontend (Vercel)
1. Push the code to GitHub.
2. Connect your repo to Vercel.
3. Set the **Root Directory** to `frontend`.
4. Add your environment variables (from `.env.local`) in the Vercel dashboard.

#### Backend (Render/Railway/Vercel)
- For Render: Create a new Web Service, set the root directory to `backend`, and use `npm run dev` or `npm start` as the build/start command.
- For Vercel (Serverless): You may need to add a `vercel.json` in the `backend` folder to configure it as a serverless function.

## Scripts
- `npm run dev`: Runs both frontend and backend.
- `npm run dev:frontend`: Runs only the frontend.
- `npm run dev:backend`: Runs only the backend.
- `npm run install:all`: Installs dependencies for both.