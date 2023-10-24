# Book Search Engine

## Description

The Book Search Engine is a MERN stack application that allows users to search for books, view book details, and save their favorite books. This application is designed to showcase how to build a full-stack web application using MongoDB, Express.js, React, and Node.js.

![Book Search Engine Screenshot](./screenshot.png)

## Features

- User registration and authentication
- Book search functionality
- Display book details, including title, authors, description, and cover image
- Save books to a user's profile
- View and manage saved books

## Technologies Used

- MongoDB: A NoSQL database used to store user information and saved books.
- Express.js: A Node.js web application framework used to build the backend API.
- React: A JavaScript library for building the user interface.
- Node.js: A JavaScript runtime used for the server-side code.
- GraphQL: A query language for your API, and a server-side runtime for executing those queries.
- Apollo Client: A comprehensive state management library for React applications.
- JWT (JSON Web Tokens): Used for user authentication.
- Bootstrap: A CSS framework used for styling the application.
- Heroku: A cloud platform for deploying the application.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/book-search-engine.git
```

2. Navigate to the project directory:

```bash
cd book-search-engine
```

3. Install server dependencies:

```bash
npm install
```

4. Navigate to the client directory:

```bash
cd client
```

5. Install client dependencies:

```bash
npm install
```

6. Return to the project root:

```bash
cd ..
```

## Usage

1. Create a MongoDB Atlas account and a database to store user information and saved books.

2. Set up environment variables by creating a `.env` file in the project's root directory. Define the following variables:

```env
MONGODB_URI=your-mongodb-uri
SECRET=your-secret-key
```

3. Start the server:

```bash
npm start
```

4. Navigate to the client directory:

```bash
cd client
```

5. Start the client:

```bash
npm start
```

6. Access the application in your web browser at `http://localhost:3000`.

## Deployment

You can deploy this MERN stack application to platforms like Heroku. Don't forget to set up environment variables for the production environment on your hosting platform.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- This project is based on the book search engine module in the Full-Stack Coding Bootcamp.
