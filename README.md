# Sports Odds Intelligence Platform

Full-stack sports odds intelligence platform with a React SPA, Node.js API, and FastAPI odds engine.

## Stack

- Frontend: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, React Query, Zustand, React Router
- Backend: Express, TypeScript, Prisma schema, JWT auth, Redis-ready cache boundary
- AI service: FastAPI with an Elo-inspired odds generation engine
- Infra: Docker Compose with PostgreSQL 15 and Redis 7

## Project Structure

- `frontend/`: single-page app with dashboard, matches, favorites, auth, and AI chat drawer
- `backend/`: API for auth, matches, favorites, and rule-based agent responses
- `ai-service/`: Python microservice that generates odds and confidence scores
- `Design/`: source design references used to shape the UI direction

## Local Development

1. Copy `.env.example` values into your local environment if needed.
2. Run `docker-compose up --build` from the repository root.

For manual development:

- Frontend: `cd frontend && npm install && npm run dev`
- Backend: `cd backend && npm install && npm run dev`
- AI service: `cd ai-service && python -m pip install -r requirements.txt && uvicorn app.main:app --reload`

## API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `GET /api/matches`
- `GET /api/matches/live`
- `GET /api/matches/:id`
- `GET /api/matches/:id/odds`
- `GET /api/favorites`
- `POST /api/favorites`
- `DELETE /api/favorites/:id`
- `POST /api/agent/query`

## Notes

- The backend currently runs in an in-memory development mode while still shipping the Prisma schema for the target PostgreSQL model.
- The Node API will call the FastAPI service when available and fall back to a local odds engine if the Python service is offline.
- Favorites are persisted in the frontend with local storage, and the API exposes protected favorites routes for the future full auth flow.
