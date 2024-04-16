# Task Management Backend

## Overview

This project is the backend implementation of a task management application. It provides RESTful APIs for managing tasks and user authentication.

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
-   **GET /api/user/profile/:username:** Get the profile details of a user.
-   **PUT /api/user/:id/update-profile-picture:** Update the profile picture of a user.
-   **POST /api/tasks:** Create a new task.
-   **GET /api/tasks:** Get all tasks.
-   **GET /api/tasks/:id:** Get a task by ID.
-   **PUT /api/tasks/:id:** Update a task by ID.
-   **DELETE /api/tasks/:id:** Delete a task by ID.

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd task-management-backend`
3. Install dependencies: `npm install`
4. Set up environment variables: Create a `.env` file and add the necessary variables (e.g., JWT secret key).
5. Start the server: `npm start`

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
