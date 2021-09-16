/**
 * CLI RELATED TASKS
 */

//DEPENDENCIES
var readline = require('readline');
var util = require('util');
var debug = util.debuglog('cli');
var events = require('events');

class _events extends events{};
var e = new _events();


//Instantiate the CLI module object

var cli = {};

// Input handlers

e.on('man',(str)=>{
    cli.responders.help();
});

e.on('help',(str) => {
    cli.responders.help();
});

e.on('exit',(str) => {
    cli.responders.exit();
});

e.on('stats',(str) => {
    cli.responders.stats();
});

e.on('list users',(str) => {
    cli.responders.listUsers();
});

e.on('more user info',(str) => {
    cli.responders.moreUserInfo(str);
});

e.on('list checks',(str) => {
    cli.responders.listChecks(str);
});

e.on('more check info',(str) => {
    cli.responders.moreCheckInfo(str);
});

e.on('list logs',(str) => {
    cli.responders.listLogs();
});

e.on('more log info',(str) => {
    cli.responders.moreLogInfo(str);
});

// Responders object
cli.responders = {

};

// HELP / man
cli.responders.help = () => {
    console.log('You asked for help');
};
// Exit
cli.responders.exit = () => {
    process.exit(0);
};
// Stats
cli.responders.stats = () => {
    console.log('You asked stats');
};
// List users
cli.responders.listUsers = () => {
    console.log('You asked for list users');
};
// More user info
cli.responders.moreUserInfo = (str) => {
    console.log('You asked for help',str);
};
// Checks
cli.responders.listChecks = (str) => {
    console.log('You asked for list checks'),str;
};
// CHeck info
cli.responders.moreCheckInfo = (str) => {
    console.log('You asked for more check info',str);
};
// List logs
cli.responders.listLogs = () => {
    console.log('You asked for list logs');
};
// more logs info
cli.responders.moreLogInfo = (str) => {
    console.log('You asked for more logs info',str);
};


cli.processInput = (str) => {
    str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : false;
    //Only process the input if the user actually wrote something. otherqise ignore.
    if(str){
        // Codify unique strings that identify the unique questions allowed to be asked
        var uniqueInputs = [
            'man',
            'help',
            'exit',
            'stats',
            'list users',
            'more user info',
            'list checks',
            'more check info',
            'list logs',
            'more log info'
        ];

        //Go through the possible inputs, emit and event when a match is found
        var matchFound = false;
        var counter = 0;

        uniqueInputs.some((input)=>{
            if(str.toLowerCase().indexOf(input) > -1){
                matchFound = true;
                // Emit an event matching the unique input, and include the full string 

                e.emit(input,str);
                return true;
            }
        });

        //If no match is found, tell the user to start again
        if(!matchFound){
            console.log('Sorry, try again!');
        }
    }
};


cli.init = () => {
    //Send start message em dark blue
    console.log('\x1b[34m%s\x1b[0m','CLI is running');

    // Start the interface
    var _interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: '>'
    });

    //Create a initial prompt
    _interface.prompt();

    //Handle each line of input separetaly
    _interface.on('line',(str)=>{
        //send to the input the processor
        cli.processInput(str);

        //Re-init the prompt afterwards
        _interface.prompt();
    });

    //If the user stops the CLI, kill the associated process
    _interface.on('close',()=>{
        process.exit(0);
    });



};

//Export the module
module.exports = cli;