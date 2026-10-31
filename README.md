# 🔗 Authenticated URL Shortener Service

A URL Shortening RESTful backend built with **TypeScript**, **Node.js (Express 5)**, **MongoDB**, and **Redis**. It provides secure user authentication, email OTP verification via Brevo, and efficient URL shortening with collision handling and fast redirection.

---

## 📑 Table of Contents

- [Overview & Architecture](#-overview--architecture)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation & Running](#installation--running)
- [API Documentation](#-api-documentation)
- [Design References & Inspirations](#-design-references--inspirations)
- [AI-Assisted Development Disclosure](#-ai-assisted-development-disclosure)
- [License](#-license)

---

## 🏛 Overview & Architecture


```
[ HTTP Requests ]
       │
       ▼
[ Middlewares ]  (Auth Guard, Zod DTO Validation, Global Error Handling)
       │
       ▼
[ Controllers ]  (HTTP Layer / Request-Response Orchestration)
       │
       ▼
  [ Services ]   (Business Logic, Domain Rules, Token Creation, Hashing)
       │
       ▼
[ Repositories ] (Data Access Layer - Mongo & Redis via Interfaces)
       │
       ▼
 [ MongoDB / Redis / External Services (Brevo) ]
```

### Architectural Highlights:
- **Dependency Inversion / Decoupling:** Services and repositories communicate through explicit TypeScript interfaces (`/interface`), wired via dependency containers (`/containers`).
- **DTO Validation via Zod:** Every incoming request payload is strictly typed and validated prior to controller execution using custom validation middlewares.
- **Resilient Short Link Generation:** Utilizes `nanoid` for generating compact, collision-resistant unique identifiers with built-in existence checks.
- **Dual-Layer Storage:** Persistent URL and User records are maintained in MongoDB, while ephemeral data (such as temporary OTPs with TTL) is delegated to Redis.

---

## ✨ Key Features

- **Robust Authentication & Security:**
  - Password hashing with salt rounds via `bcrypt`.
  - Dual-token lifecycle: Short-lived Access Tokens and Refresh Tokens via `jsonwebtoken`.
  - Email verification workflow with time-limited OTPs sent through the Brevo Email API.
  - Ephemeral OTP caching with Redis expiration (TTL).
- **URL Management:**
  - Authenticated route for generating short URLs.
  - Automatic deduplication: If a user submits an existing long URL, the existing short URL is returned.
  - Fast redirection (`GET /:shortId`) resolving to the destination address.
- **Enterprise-Grade Developer Experience:**
  - Strict linting and formatting via ESLint 10, `@typescript-eslint`, and Prettier.
  - Fast local development utilizing `tsx watch` with native `.env` loading.
  - Production bundling using `tsup`.

---

## 🛠 Tech Stack

- **Runtime & Language:** Node.js (v20+ recommended), TypeScript 5.9+
- **Web Framework:** Express 5.3 (`express-async-handler`)
- **Databases & Cache:** MongoDB (via Mongoose 9), Redis 6.3
- **Validation & Serialization:** Zod 4
- **Security & Tokens:** `bcrypt`, `jsonwebtoken`
- **Identifier Generation:** `nanoid`
- **Email Infrastructure:** Brevo (Sendinblue) API
- **Build & Dev Tooling:** `tsup`, `tsx`, ESLint, Prettier

---

## 📂 Project Directory Structure

```text
server/
├── src/
│   ├── config/              # Environment, MongoDB, and Redis configuration
│   ├── containers/          # Dependency injection container / composition root
│   ├── controller/          # Request handlers (Auth & URL controllers)
│   ├── dtos/                # Zod schemas & DTO transfer objects
│   │   ├── shared/
│   │   ├── url/
│   │   └── user/
│   ├── infrastructure/      # Third-party integrations (Brevo Email API)
│   ├── interface/           # Clean architectural interfaces (Services, Repos, Models)
│   ├── mapper/              # Data mappers & entity transformations
│   ├── middlewares/         # JWT Auth, Zod validation, Global error handler
│   ├── models/              # Mongoose schemas & data models
│   ├── repo/                # Repository pattern implementation (Base, User, Url, Redis)
│   ├── routes/              # Express route definitions
│   ├── service/             # Domain business logic
│   ├── shared/              # Reusable utilities, constants, custom AppError classes
│   ├── types/               # Global TypeScript declarations
│   └── server.ts            # Application bootstrap & HTTP server entrypoint
├── .env.example
├── eslint.config.mjs
├── package.json
├── tsconfig.json
└── tsup.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed locally:
- [Node.js](https://nodejs.org/) (v20.x or higher)
- [MongoDB](https://www.mongodb.com/) (running standalone or replica set `rs0`)
- [Redis](https://redis.io/) 

### Environment Variables

Create a `.env` file in the root of the `server/` directory:

```env
# Application Settings
PORT=3000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database & Cache
MONGO_URI=mongodb://127.0.0.1:27017/url?replicaSet=rs0
REDIS_URI=redis://127.0.0.1:6379

# Email Infrastructure (Brevo)
BREVO_API_KEY=your_brevo_api_key_here
BREVO_SENDER=your_verified_sender@example.com

# JSON Web Token
JWT_ACCESS_SECRET=your_jwt_access_secret_key
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Base Short URL Domain
BASE=http://localhost:3000
```


---

### Installation & Running

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run in development mode:**
   ```bash
   npm run dev
   ```

4. **Linting and Formatting:**
   ```bash
   npm run lint        # Check for lint issues
   npm run lint:fix    # Automatically fix lint issues
   npm run format      # Format codebase with Prettier
   ```

5. **Production Build & Start:**
   ```bash
   npm run build
   npm run start
   ```

---


## 📡 API Endpoints

### 1. Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Register a new user and dispatch OTP via Brevo | No |
| `POST` | `/api/auth/verify-otp` | Verify email OTP stored in Redis cache | No |
| `POST` | `/api/auth/resend-otp` | Generate and resend a new OTP via Brevo | No |
| `POST` | `/api/auth/login` | Authenticate user credentials & issue Access/Refresh tokens | No |
| `POST` | `/api/auth/refresh` | Renew access token using a valid refresh token | No |

---

### 2. URL Management & Redirection Routes

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/url` | Create a short URL (returns existing if already shortened) | **Yes (JWT)** |
| `GET` | `/:shortId` | Public redirect to the original destination URL | **No (Public)** |

---

## 📖 Design References & Inspirations

- The core mechanics and requirements for URL identifier mapping and HTTP redirection were referenced from LogRocket's guide:
  - Reference: [How to build a URL shortener in Node.js (LogRocket)](https://blog.logrocket.com/how-build-url-shortener-node-js/#why-use-url-shortener)

---

## 🤖 AI-Assisted Development Disclosure

- **Claude AI:**
  - Used for frontend UI layout and styling—specifically generating the landing/home page, responsive navigation bar, and authentication/URL submission forms.
  - Assisted in generating the website favicons and visual branding assets.

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).