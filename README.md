# GameSphere

GameSphere is a gaming community platform designed to connect players, manage profiles, and foster engagement through features like user ratings and suggested connections. This repository contains both the backend (Node.js/Express) and frontend (assumed to be a Node-based framework like React/Vite) components of the application.

## Project Structure

- **Backend**: Located in the `backend/` directory, powered by Node.js, Express, and MongoDB (via Mongoose).
- **Frontend**: Located in the `frontend/` directory, assumed to be a modern JavaScript framework (e.g., React with Vite).

## Features

- **User Authentication**: Secure login and registration with JWT and cookie-based sessions.
- **Profile Management**: Update user details (name, headline, location, etc.) and upload profile pictures/banners.
- **Public Profiles**: View user profiles by username, including connections.
- **Social Features**: Rate users and get suggested connections based on existing networks.
- **API**: RESTful endpoints under `/api/v1` for auth, users, posts, notifications, connections, and leagues.

## Prerequisites

- **Node.js**: v20.14.0 or higher (tested with v20.14.0).
- **npm**: Comes with Node.js.
- **MongoDB**: A running instance (local or cloud, e.g., MongoDB Atlas).
- **Environment Variables**: Set up a `.env` file in the `backend/` directory (see below).

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/gamesphere.git
cd gamesphere
```

### 2. Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `backend/` directory with the following:

```
PORT=5000
MONGO_URI=mongodb+srv://<your-username>:<your-password>@cluster0.1kcfn.mongodb.net/gamesphere?retryWrites=true&w=majority
JWT_SECRET=<yourverystrongsecret>
NODE_ENV=development
<<<<<<< HEAD
MAILTRAP_TOKEN=<your_mailtrap_token>
EMAIL_FROM=mailtrap@demomailtrap.com
EMAIL_FROM_NAME=<Your_Name>
=======
>>>>>>> 6d4d32d40b35442b4c0b066d8b5030c8cd582296
CLOUDINARY_API_KEY="134779465717673"
CLOUDINARY_API_SECRET=iMKOOQwrfLj6PE-kXm2aRWpaYrk
CLOUDINARY_CLOUD_NAME=dhc5jpevd
CLIENT_URL=http://localhost:5173
```

- Replace `MONGO_URI` with your MongoDB connection string (e.g., `mongodb+srv://(username):(password)@cluster0.1kcfn.mongodb.net/gamesphere?retryWrites=true&w=majority`). Update `<your-username>` and `<your-password>` with your MongoDB credentials and adjust the database name if different from `gamesphere`.
- Update `CLIENT_URL` if your frontend runs on a different port (e.g., `http://localhost:3000`); it's currently set to `http://localhost:5173` for Vite's default port.
- Set a secure `JWT_SECRET` (e.g., a random 32+ character string like `yourverystrongsecret123!@#`). Avoid using weak or predictable values.

### 4. Run the Application

#### Backend
```bash
cd backend
node server.js
```
- Starts the backend server on `http://localhost:5000` (or your configured `PORT`).

#### Frontend
```bash
cd frontend
npm run dev
```
- Starts the frontend development server (e.g., `http://localhost:5173` if using Vite).

### 5. Access the Application

- **API Base URL**: `http://localhost:5000/api/v1`
- **Frontend**: Open `http://localhost:5173` in your browser (adjust port if different).

## Scripts

### Backend
- `npm start`: Runs `node server.js`.
- `npm run dev`: Runs `nodemon server.js` for development with auto-restart.
- `npm run build`: Installs dependencies and builds the frontend (if applicable).

### Frontend
- `npm run dev`: Starts the development server.
- (Add other frontend scripts like `build` or `start` based on your setup.)

## API Endpoints (Examples)

- **GET /api/v1/users/public/:username**: Fetch a user's public profile.
- **PUT /api/v1/users/profile**: Update authenticated user's profile (requires token).
- **POST /api/v1/users/rate/:userId**: Rate a user (requires token).
- **GET /api/v1/users/suggestions**: Get suggested connections (requires token).
<<<<<<< HEAD
=======
>>>>>>>> 6d4d32d40b35442b4c0b066d8b5030c8cd582296:README.md
>>>>>>> 6d4d32d40b35442b4c0b066d8b5030c8cd582296
