# TO-DO Application

This TO-DO application provides a robust solution for managing tasks efficiently. Built with Node.js, it features user authentication, secure data handling, and CRUD operations for task management.

## Features

- **User Registration and Login** with password hashing using bcrypt.js.
- **JWT Authentication** for secure API access.
- **Task Management**: Create, Read, Update, and Delete tasks.
- Role-based access with middleware support.

## Prerequisites

Ensure the following are installed:

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- npm (comes with Node.js)
- MongoDB (for database operations)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kumar-gopal/TO-DO-ASSIGNMENT
   cd TO-DO
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables in a `.env` file:

   ```env
   PORT=3000
   JWT_SECRET=your_secret_key
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the server:

   ```bash
   node SERVER/app.js
   ```

## Project Structure

```
TO-DO/
├── .env                # Environment variables
├── package.json        # Project metadata and dependencies
├── package-lock.json   # Lockfile for dependencies
├── SERVER/             # Server-side code
│   ├── app.js          # Main entry point
│   ├── config/         # Configuration files
│   ├── controller/     # API controllers
│   ├── middleware/     # Custom middleware
│   ├── models/         # Mongoose models
│   ├── route/          # API routes
│   └── utility/        # Utility functions
```

## API Endpoints

### User Authentication

#### Register User

- **POST** `/api/v1/users/register`
- **Request Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User successfully registered!",
    "success": true
  }
  ```

#### Login User

- **POST** `/api/v1/users/login`
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User successfully logged in!",
    "success": true,
    "token": "JWT token"
  }
  ```

### Task Management

#### Create Task

- **POST** `/api/v1/tasks`
- **Headers:**
  ```plaintext
  Authorization: Bearer <JWT token>
  ```
- **Request Body:**
  ```json
  {
    "title": "string",
    "description": "string"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Task created successfully!",
    "success": true
  }
  ```

#### Get All Tasks

- **GET** `/api/v1/tasks`
- **Headers:**
  ```plaintext
  Authorization: Bearer <JWT token>
  ```
- **Response:**
  ```json
  [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "status": "pending | in-progress | completed",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
  ```

#### Get Task by ID

- **GET** `/api/v1/tasks/:id`
- **Headers:**
  ```plaintext
  Authorization: Bearer <JWT token>
  ```
- **Response:**
  ```json
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "status": "pending | in-progress | completed",
    "createdAt": "date",
    "updatedAt": "date"
  }
  ```

#### Update Task

- **PUT** `/api/v1/tasks/:id`
- **Headers:**
  ```plaintext
  Authorization: Bearer <JWT token>
  ```
- **Request Body:**
  ```json
  {
    "status": "pending | in-progress | completed"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Task updated successfully!",
    "success": true
  }
  ```

#### Delete Task

- **DELETE** `/api/v1/tasks/:id`
- **Headers:**
  ```plaintext
  Authorization: Bearer <JWT token>
  ```
- **Response:**
  ```json
  {
    "message": "Task deleted successfully!",
    "success": true
  }
  ```

## Middleware

- **Authentication Middleware:** Protects routes and validates JWT tokens.
- **Error Handling:** Centralized error management for better API response.

## Utilities

- **Password Utility:** Functions for hashing and verifying passwords using bcrypt.js.

## Contributing

Fork the repository, create a branch, and submit pull requests with proper documentation and test cases.

## License

This project is licensed under the MIT License.

