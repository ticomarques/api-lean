/**
 * Primary file for API
 * 
 */

//Dependencies
var server = require('./lib/server');
var workers = require('./lib/workers');
var cli = require('./lib/cli');

//Declare app
var app = {};

//Init function
app.init = () => {
    //start server
    server.init();

    //start workers
    workers.init();

    //Start the CLI, but make sure it starts last
    setTimeout(()=>{
        cli.init();
    },50);
};

app.init();

module.exports = app;