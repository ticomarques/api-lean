/**
 * Primary file for API
 * 
 */

//Dependencies
var server = require('./lib/server');
var workers = require('./lib/workers');

//Declare app
var app = {};

//Init function
app.init = () => {
    //start server
    server.init();

    //start workers
    workers.init();
};

app.init();

module.exports = app;