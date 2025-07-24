KnowledgeHub 📚

KnowledgeHub is a modern, AI-powered knowledge management platform built with Next.js 15, TypeScript, Prisma, and Google’s Gemini API. It allows users to create, manage, search, and summarize articles securely with JWT-based authentication. The app features a sleek, responsive UI with TailwindCSS, interactive elements with React Icons, and user-friendly feedback via React-Toastify.
Table of Contents

Features
Tech Stack
Getting Started
Prerequisites
Installation
Environment Variables
Running the App


API Endpoints
Project Structure
Testing
Troubleshooting
Contributing
License

Features

User Authentication 🔐: Secure signup and login with JWT-based authentication.
Article Management ✍️: Create, view, delete, and summarize articles with a modern UI.
AI-Powered Summarization 🤖: Generate concise article summaries using Google Gemini (gemini-2.5-flash).
Search and Filter 🔍: Search articles by content or filter by tags for quick access.
Responsive Design 📱: Sleek, mobile-friendly UI with TailwindCSS and smooth animations.
Feedback System 🔔: User-friendly toast notifications for success and error states.
Loading States ⏳: Visual spinners for API calls to enhance UX.

Tech Stack

Frontend: Next.js 15, React 18, TypeScript, TailwindCSS
Backend: Next.js API Routes, Prisma (PostgreSQL)
AI: Google Gemini API (@google/generative-ai)
Authentication: JWT (jsonwebtoken)
UI Enhancements: React Icons, React-Toastify
Database: PostgreSQL
Environment: Node.js 20.x

Getting Started
Prerequisites

Node.js: Version 20.x or higher
PostgreSQL: A running instance (local or hosted)
Google API Key: Obtain from Google AI Studio

Installation

Clone the Repository:
git clone https://github.com/your-username/knowledgehub.git
cd knowledgehub


Install Dependencies:
npm install


Set Up PostgreSQL:

Create a database named knowledgebase.
Run Prisma migrations:npx prisma migrate dev





Environment Variables
Create a .env file in the root directory with the following:
DATABASE_URL=postgresql://user:password@localhost:5432/knowledgebase
JWT_SECRET=3f9b2a8c7d4e1f6b9a0c3e8d7f4a2b1c9e0d3f8a7b6c2e1f9a0b3d8e7c4f2a
GOOGLE_API_KEY=your_gemini_api_key


DATABASE_URL: Your PostgreSQL connection string.
JWT_SECRET: A secure key for JWT signing (use the provided value or generate a new one).
GOOGLE_API_KEY: Obtain from Google AI Studio.

Running the App

Start the Development Server:
npm run dev


Open the App:

Visit http://localhost:3000 in your browser.


Explore Prisma Studio (optional):
npx prisma studio



API Endpoints



Method
Endpoint
Description
Authentication



POST
/api/auth/signup
Register a new user
None


POST
/api/auth/login
Log in and receive a JWT token
None


GET
/api/auth/session
Verify user session
JWT


GET
/api/articles
Fetch articles (supports search & tags)
JWT


POST
/api/articles
Create a new article
JWT


GET
/api/articles/[id]
Fetch a single article by ID
JWT


DELETE
/api/articles/[id]
Delete an article by ID
JWT


GET
/api/summary/[id]
Generate AI summary for an article
JWT


Example API Usage
Create an Article:
curl -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{"title":"Test Article","body":"This is a test.","tags":["test","demo"]}'

Get Article Summary:
curl -H "Authorization: Bearer <your-token>" \
  http://localhost:3000/api/summary/<article-id>

Project Structure
knowledgehub/
├── src/
│   ├── app/
│   │   ├── articles/[id]/page.tsx      # Article details page
│   │   ├── auth/[...]/page.tsx         # Auth pages (signup, login)
│   │   ├── dashboard/page.tsx          # Dashboard for article management
│   │   ├── api/
│   │   │   ├── articles/route.ts       # List and create articles
│   │   │   ├── articles/[id]/route.ts  # Get/delete article by ID
│   │   │   ├── summary/[id]/route.ts   # Generate article summary
│   │   │   ├── auth/[...]/route.ts     # Auth endpoints
│   │   ├── layout.tsx                  # Root layout with ToastContainer
│   │   ├── page.tsx                    # Home page
|   ├── context/
|   |   ├── AuthProvider.tsx            # Auth context
│   ├── components/
│   │   ├── ArticleForm.tsx             # Form to create articles
│   │   ├── ArticleList.tsx             # List of articles
│   │   ├── Navbar.tsx                  # Navigation bar
│   ├── lib/
│   │   ├── auth.ts                     # JWT token utilities
│   │   ├── prisma.ts                   # Prisma client setup
├── prisma/
│   ├── schema.prisma                   # Database schema
├── public/                             # Static assets
├── tailwind.config.js                  # TailwindCSS configuration
├── .env                                # Environment variables
├── README.md                           # This file

Testing

Sign Up/Login:

Go to http://localhost:3000/auth/signup and create a user (e.g., test@example.com, password123).
Log in at http://localhost:3000/auth/login.


Create an Article:

Navigate to http://localhost:3000/dashboard.
Create an article:
Title: Test Article
Body: This is a sample article body for testing the KnowledgeHub application. It includes some content to verify rendering, searching, and summarization functionality. Tags: test, sample, demo.
Tags: test,sample,demo


Verify a toast notification: “Article created successfully”.


View Details:

Click “View Details” in the article list.
Check the article’s title, body, and tags at http://localhost:3000/articles/<id>.


Summarize and Delete:

On the details page, click “Summarize” to see a Gemini-generated summary via toast.
Click “Delete Article” to remove it and return to the dashboard.


Search and Filter:

On the dashboard, search for “test” or filter by tag “demo”.



Troubleshooting

API Errors:

401 Unauthorized: Ensure localStorage has a valid JWT token. Check JWT_SECRET in .env.
404 Article Not Found: Verify the article ID in Prisma Studio (npx prisma studio).
500 Server Error: Check server logs for Gemini error or Delete error.


UI Issues:

Toasts Not Showing: Ensure ToastContainer is in layout.tsx and react-toastify CSS is imported.
Icons Missing: Verify react-icons is installed (npm install react-icons).
Styling Issues: Check tailwind.config.js includes src/**/*.{js,ts,jsx,tsx}.


Database Issues:

Verify DATABASE_URL is correct and PostgreSQL is running.
Run npx prisma migrate reset if schema issues occur.


Gemini API Errors:

Ensure GOOGLE_API_KEY is valid (test at Google AI Studio).
Try switching to gemini-1.5-pro if gemini-1.5-flash fails.



Contributing

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit changes (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a pull request.

License
MIT License. See LICENSE for details.