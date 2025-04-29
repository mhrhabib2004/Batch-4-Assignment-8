
# 🏍 Bike Servicing Management System API SQL Prisma

[![Live Backend](https://img.shields.io/badge/LIVE-Backend-brightgreen)](https://bike-service-prisma-server.vercel.app)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue)

A comprehensive backend API for managing bike servicing operations, customers, and their vehicles with complete CRUD functionality and service tracking.

## 🔗 Live Deployment
The API is currently deployed at:  
- **Website Backend deploy Link**: <a href="https://batch-4-assignment-8-one.vercel.app/" target="_blank" rel="noopener noreferrer">Bike Service Api SQL Prisma</a>

## 🛠 Tech Stack
- **Runtime**: Node.js 18+
- **Language**: TypeScript 5+
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **API Documentation**: OpenAPI/Swagger (coming soon)

## ✨ Key Features
- ✅ Complete CRUD operations for customers, bikes, and services
- ✅ Service status tracking (pending/in-progress/done)
- ✅ Overdue service detection (7+ days pending)
- ✅ Relational data modeling (Customers → Bikes → Services)
- ✅ Robust error handling with standardized responses
- ✅ Type-safe codebase with TypeScript

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/developerFarukk/Bike-Service-Prisma-Server.git
   ```
   ```
   cd bike-service-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```