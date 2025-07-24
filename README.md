AI-Powered Knowledgebase
A full-stack application for creating, managing, and searching articles with AI-powered summarization.
Features

Email/password authentication
Article creation, listing, and deletion
Search by keyword and tags
AI-powered article summarization using OpenAI
Production-ready with TypeScript, Next.js, Prisma, and TailwindCSS
Dockerized setup
Basic CI/CD with GitHub Actions

Setup Instructions

Clone the repository:
git clone <repository-url>
cd knowledgebase-app


Copy environment variables:
cp .env.example .env


Update .env with:

DATABASE_URL: PostgreSQL connection string
JWT_SECRET: Secret for JWT signing
OPENAI_API_KEY: OpenAI API key


Install dependencies:
npm install


Setup database:
npx prisma migrate dev


Run locally:
npm run dev


Or use Docker:
docker-compose up



Testing
npm test

Live Demo
[Link to live demo]
Tech Stack

Next.js (App Router)
TypeScript
TailwindCSS
PostgreSQL with Prisma
Node.js API Routes
OpenAI for summarization
