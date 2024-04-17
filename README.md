# Task Management Backend

## Overview

This project is the backend implementation of a task management application. It provides RESTful APIs for managing tasks and user authentication. Deployed in Heroku.

## Features

-   **User Registration:** Users can create a new account by providing their name, email, password, and username.
-   **User Login:** Registered users can log in to their account using their email or username and password.
-   **User Authentication:** Authenticated users receive a JWT token for accessing protected routes.
-   **Task CRUD Operations:** Users can perform CRUD (Create, Read, Update, Delete) operations on tasks.
-   **Task Filtering:** Tasks can be filtered based on various criteria such as status, title, or description.
-   **Avatar Selection:** Users can select a profile avatar from a predefined set of avatars.

## API Endpoints

-   **POST /api/user/register:** Register a new user.
-   **POST /api/user/login:** Log in a user and generate a JWT token.
-   **GET /api/user/profile:** Get the profile details of logged in user.
-   **PATCH /api/user/profile/:id:** Update the profile picture of a user.
-   **POST /api/tasks:** Create a new task.
-   **GET /api/tasks:** Get all tasks.
-   **GET /api/tasks/:id:** Get a task by ID.
-   **PUT /api/tasks/:id:** Update a task by ID.
-   **DELETE /api/tasks/:id:** Delete a task by ID.

## Installation (Node Version (v20.5.0) and npm version (10.5.1))

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd todo-management-server`
3. Install dependencies: `npm install`
4. Set up environment variables: Create a `.env` file and add the necessary variables.
   (e.g., PORT=3001
          JWT_SECRET=taskmanager
          NODE_ENV=development)
6. Start the server: `npm start`/`npm run server`
7. To run unit tests: `npm run test`

## Technologies Used

-   Node.js
-   Express
-   MongoDB
-   Mongoose
-   JSON Web Tokens (JWT)
-   bcrypt
-   dotenv

## Author

Aakash Pal
