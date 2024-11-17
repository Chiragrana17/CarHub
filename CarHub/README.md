# CARHUB (A Car Management Application)

# Overview
A web application to manage cars, allowing users to create, view, edit, delete cars, and search through them. Each car can have up to 10 images, a title, a description, and tags.

# Features
-User authentication with login/signup.
-Add, view, update, and delete cars.
-Search cars by title, description, or tags.
-Images stored locally, database managed with MongoDB Compass.

# Tech Stack
-Frontend: React, Axios, Tailwind CSS.
-Backend: Node.js, Express.js, MongoDB.
-Storage: Local filesystem for images.

# Setup

# Backend
-Clone the repo and navigate to the backend directory:
-git clone <repo_url>
-cd backend
-npm install
-Create a .env file with: (Copy code)
PORT=5000
MONGODB_URI=mongodb://localhost:27017/car
JWT_SECRET=<your_jwt_secret>
-Start the backend server:
-npm start

# Frontend
Navigate to the frontend directory:
-cd ../frontend
Install dependencies:
-npm install
Create a .env file with: (Copy code)
REACT_APP_BACKEND_URL=http://localhost:5000
Start the frontend server:
-npm start

# Deployment

-Backend: Deployed on Render.
-Frontend: Deployed on Vercel.

# Live Demo

Frontend: Vercel Link
Backend: Render Link
