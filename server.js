// Import The Express Module
const express = require('express');

// Create an Express Application
const app = express();

// Import the 'path' Module
const path = require('path');

// Import the 'dotenv' module to handle environment variables
const dotenv = require('dotenv');

// Configure the 'dotenv' module to load environment variables from a .env file
dotenv.config();

// Import the 'body-parser' middleware
 const bodyParser = require('body-parser');

 // Use the 'body-parser' middleware to parse JSON and URL-encoded data
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));    

// Define the port where the server will listen
 const PORT = 3000;

// Middleware that logs every request details
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next(); // Call the next middleware or route handler
})

// Middleware that serves the static files from the 'public' directory
app.use(express.static('public')); 


// Route for the homepage (index.html will be served automatically)
app.get('/', (req, res) => {
    res.sendFilel(__dirname + '/public/index.html');
});

// Define a route that throws an error
app.get('/error', (req, res) => {
    throw new Error('Something went wrong');
});

// Error handling middleware (must be defined last)
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack to the console
    res.status(500).send('<h1>500 - Internal Server Error </h1>'); // Send a generic error page
});

// Middleware to handle 404 errors

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'))
});


 // Start the server
 app.listen(PORT, () => {
     console.log(`Server is running at http://localhost:${PORT}`);
 });