Root README.md

# Task Management System

## Repository Structure

```
-   backend
-   client
-   docker-compose.yml
-   README.md (this file)
```

## Manual Setup

1. **Clone repository**

```bash

git clone [your-repo-url]
cd task-management-system

### Install dependencies

cd backend
npm install
cd ../client
npm install

### Configure environment

cd backend
cp .env.example .env
# Edit .env with your PORT and MONGODB_URI
cd ../client
cp .env.example .env
# Edit .env with VITE_API_URL

### Run applications

# Backend
cd backend
npm run dev

# In another terminal, Frontend
cd client
npm run dev
```

## Docker Setup

```
docker-compose up --build
```

Applications:

Frontend: http://localhost:3000 || originally vercel url - http://localhost:5173

Backend API: http://localhost:3001/api/tasks

MongoDB: localhost:27017

Technical Questions

1. Database Design:

Chose a MongoDB schema with fields for title, description, status, priority, and timestamps to match task requirements and leverage MongoDB's flexible documents.

Indexes: Add indexes on status, priority, and dueDate for efficient filtering and sorting in production.

2. API Design:

3. React Architecture:

Used React Context or custom hook useTasks for state management, allowing centralized data fetching and updates without heavier libraries.

Preferred hooks over Redux for simplicity in this small app; scalable for more complexity with Context or external state libs.

4. Performance:

5. Security:

Enabled CORS and environment variable configuration. Data validation prevents injection attacks.

For production, add HTTPS, helmet middleware, rate limiting, authentication/authorization (e.g., JWT), and sanitize inputs.

6. DevOps:

Dockerized both services and MongoDB, orchestrated via docker-compose. Used .env files for config.

For production, switch to multi-stage builds, use a production-ready Node image, set up health checks (Docker HEALTHCHECK), and integrate CI/CD with GitHub Actions or GitLab CI.
