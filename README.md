# Book Search Engine

## Description

The Book Search Engine is a web application that allows users to search for books, view search results, save books to their account, and manage their saved books. This project was motivated by a desire to create a useful tool for avid readers. The application solves the problem of easily searching for books, saving them, and accessing saved book information. It uses GraphQL for efficient data retrieval and management and employs JWT tokens for user authentication.

[Please Click here to view walkthrough](https://watch.screencastify.com/v/bTz6vZBDuVFEexncv4Ku)

[Experience Live App here]

## Table of Contents

- [Usage](#usage)
- [Installation](#installation)
- [Deployment](#deployment)
- [Credits](#credits)
- [License](#license)

## Usage

1. Upon visiting the application, you will see a menu with the options "Search for Books" and "Login/Signup." You can use the search field to search for books by title, author, or keywords.

2. If you are not logged in and you enter a search term and click the submit button, you will be presented with search results, including book titles, authors, descriptions, images, and links to the Google Books site for each book.

3. You can click on "Login/Signup" to open a modal that allows you to log in or sign up. When signing up, you will need to provide a username, email address, and password.

4. After signing up or logging in, the menu options will change to "Search for Books," "See Your Saved Books," and "Logout."

5. When logged in, you can enter a search term, and the results will include a "Save" button for each book. Clicking "Save" will add the book to your saved books.

6. Click "See Your Saved Books" to view the books you have saved. You can remove a book by clicking the "Remove" button.

7. You can log out using the "Logout" button.

[Quick-Demo of the Google books App](https://watch.screencastify.com/v/6zePkGQ5IQL4COlZvzmZ)

![Google Book Search Results](/client/public/google-book-search-engine.png).

## Installation

If you would like to see the project code on your desktop please follow the steps below, that explain how to run the project on the localhost as well.

To run the Book Search Engine on your local development environment, follow these steps:

1. Clone the repository to your local machine.

    - git clone <https://github.com/hafsah1976/Book-Search-Engine>

2. Navigate to the project directory.

    - cd book-search-engine

3. Install the required dependencies.

    - npm install

4. Start the development server.
    - npm start

The application should now be running locally at `http://localhost:3001`.

## Deployment

To deploy the Book Search Engine to Heroku with a MongoDB database using MongoDB Atlas, follow these steps:

a. Create a Heroku account if you don't have one. Log in to Heroku using the Heroku CLI by running the following command and following the prompts:

- heroku login
- Navigate to your project directory.

- cd book-search-engine

b. Create a Procfile in your project directory. This file tells Heroku how to run your application. Inside Procfile, add the following line:

- Commit your changes to Git.

- git add .
- git commit -m "Added Procfile for Heroku"

c.Create a new Heroku app using the following command, replacing "your-heroku-app-name" with your desired app name:

- heroku create your-heroku-app-name

d. Set up a MongoDB Atlas database:

1. Go to MongoDB Atlas.
2. Create an account or log in.
3. Click "Build a Cluster" to set up a new database.
4. Follow the instructions to create your cluster.
5. Once the cluster is set up, click "Connect" and select "Connect your application." Copy the connection string.
6. In your Heroku dashboard, navigate to your app's settings and click on the "Reveal Config Vars" button. Add the following environment variables:

- MONGODB_URI: Set it to the connection string from your MongoDB Atlas cluster.

e. Deploy your application to Heroku:

- git push heroku master

Your Book Search Engine application is now deployed to Heroku. You can open it in your web browser by running:

heroku open

Now, your Book Search Engine application is live on Heroku with a MongoDB database hosted on MongoDB Atlas. Users can access and use your application from anywhere.

## Credits

This project was refactored by Hafsah Nasreen. Debugged with the help of Xpert Learning Assistant at the bootcamp portal.
You can find the source code on GitHub at [Book-Search-Engine](https://github.com/hafsah1976/Book-Search-Engine).

Special thank you to Spider and the entire LA Team from AskBCS Learning Assistant!

This application uses the following technologies and libraries:

Frontend: React, GraphQL, Apollo, JWT Tokens
Backend: Nodejs-Express, JWT Tokens, MongoDB &  Mongoose

## License

This project is licensed under the [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
