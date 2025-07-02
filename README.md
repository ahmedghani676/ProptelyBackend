Proptely Backend
A Node.js + Express + Prisma backend for the Proptely mini‑app.

Features
REST API for Property, Tenant, Unit, Landlord, Lease

SQLite/PostgreSQL support via Prisma

Seed script for sample data

Setup
Clone this repo

git clone git@github.com:USERNAME/proptely-backend.git
cd proptely-backend
Install dependencies
npm install
Copy .env.example → .env and fill in your database URL

cp .env.example .env
Run migrations & seed data

npx prisma migrate dev
node prisma/seed.js
Start the server

npm run dev
# or
node index.js
