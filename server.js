// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
// Spin up the Server
const server = app.listen(port, listening);
// const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)})
//Callback to debug
function listening() {
    console.log ('server running');
    console.log(`running on localhost: ${port}`);
};


// GET route
app.get('/all', sendData);
// Callback function to complete GET '/all'
function sendData (request, response) {
    response.send(projectData);
};

// POST route
app.post('/addWeatherData', addData);

function addData(request, response) {
    console.log(request.body);
    newEntry = {
        date: request.body.date,
        temp: request.body.temp,
        content: request.body.feeling
    }
    projectData = newEntry;
    
};