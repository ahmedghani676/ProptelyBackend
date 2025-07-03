# Proptely Backend

A **Node.js** + **Express** + **Prisma** backend for the Proptely property‑management mini‑app.

---

## 🚀 Features

- **REST API** for:
  - Property
  - Tenant
  - Unit
  - Landlord
  - Lease
- **Database support** via Prisma:
  - SQLite (development)
  - PostgreSQL (production)
- **Seed script** to populate the database with sample data

---

## ⚙️ Setup & Installation

1. **Clone this repository**  

   git clone git@github.com:USERNAME/proptely-backend.git
   cd proptely-backend
Install dependencies


npm install
Configure environment variables
Copy the example file and fill in your database URL:


cp .env.example .env
# Then edit `.env` and set:
# DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
Run database migrations


npx prisma migrate dev --name init
Seed the database


node prisma/seed.js
Start the server

In development (with nodemon):


npm run dev
In production:


npm start
