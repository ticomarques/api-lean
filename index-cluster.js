/**
 * Primary file for API
 * 
 */

//Dependencies
var server = require('./lib/server');
var workers = require('./lib/workers');
var cli = require('./lib/cli');
var cluster = require('cluster');
var os = require('os');

//Declare app
var app = {};

//If we are the master thread, start the background workers and CLI
app.init = (callback) => {
    if(cluster.isMaster) {
        //start workers
        workers.init();

        //Start the CLI, but make sure it starts last
        setTimeout(()=>{
            cli.init();
            callback();
        },50);

        // Fork the process
        for(var i = 0; i < os.cpus().length;i++){
            cluster.fork();
        }
    } else {
        //If we are not the master thread, start the hhtp server
        //Init function
        server.init();
    }

};

//Self invoking only if you require directly
if(require.main === module) {
    app.init(()=>{});
};

module.exports = app;