# Verlynk Blog Project

The Verlynk Blog Project is a simple blog platform where users can create blog posts and comment on each other's posts. The project utilizes Angular for the client-side application, Node.js with Express for the server-side API, MongoDB for database storage, JWT token authentication for user authentication, and Swagger for API documentation. Tailwind CSS is used for styling the user interface.

## Features

- User authentication with JWT tokens
- Creation, deletion, editing of blog posts
- Commenting on blog posts
- Rate limiting for API requests
- API documentation with Swagger UI

## Technologies Used

- Angular
- Node.js
- Express
- MongoDB
- JWT for authentication
- Swagger for API documentation
- Tailwind CSS for styling

## Installation Instructions

To run the project locally, follow these steps:

1. Clone the project from GitHub:

**git clone https://github.com/yourusername/verlynk-blog-project.git**

2. Navigate to the project directory:

**cd verlynk-blog-project**

3.Install dependencies for both the client and server:

**npm install**

4. **Set up environment variables:**

- Create a .env file in the server directory.
- Copy the contents of .env.example into .env.
- Fill in the MongoDB connection URL, PORT number and JWT_SECRET_KEY for Authentication.

# MongoDB configuration
MONGODB_URI=mongodb://<username>:<password>@<host>:<port>/<database>

# JWT secret key
JWT_SECRET=<your_secret_key>

5. Start the client-side (Angular) application:

**ng serve**

6. Start the server-side (Node.js/Express) application:

**npm start**


Once both the client and server applications are running with DB connected, you can access the application in your web browser.

## API Documentation

The API endpoints are documented using Swagger UI. You can access the API documentation at http://localhost:5000/api-docs after starting the server to get all information about API

- Params and query you need to have.
- Status code your server will send for Error handling. 

