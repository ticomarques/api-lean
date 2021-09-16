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
var os = require('os');
var v8 = require('v8');
var _data = require('./data');
var _logs = require('./logs');



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
    var commands = {
        'exit' : 'Kill the CLI (and the rest of the application)',
        'man' : 'Show this help page',
        'help' : 'Alias of the "man" command',
        'stats' : 'Get statistics on the underlying operating system and resource utilization',
        'List users' : 'Show a list of all the registered (undeleted) users in the system',
        'More user info --{userId}' : 'Show details of a specified user',
        'List checks --up --down' : 'Show a list of all the active checks in the system, including their state. The "--up" and "--down flags are both optional."',
        'More check info --{checkId}' : 'Show details of a specified check',
        'List logs' : 'Show a list of all the log files available to be read (compressed only)',
        'More log info --{logFileName}' : 'Show details of a specified log file',
    };

    // Show a header for the help page that is as wide as the screen
    cli.horizontalLine();
    cli.centered('CLI MANUAL');
    cli.horizontalLine();
    cli.verticalSpace(2);

    // Show each command, followed by its explanation, in white and yellow respectively
    for(var key in commands){
        if(commands.hasOwnProperty(key)){
            var value = commands[key];
            var line = '      \x1b[33m '+key+'      \x1b[0m';
            var padding = 60 - line.length;
            for (i = 0; i < padding; i++) {
                line+=' ';
            }
            line+=value;
            console.log(line);
            cli.verticalSpace();
        }
    }

    cli.verticalSpace(1);

    // End with another horizontal line
    cli.horizontalLine();
};

// Create a vertical space
cli.verticalSpace = function(lines){
    lines = typeof(lines) == 'number' && lines > 0 ? lines : 1;
    for (i = 0; i < lines; i++) {
        console.log('');
    }
};

// Create a horizontal line across the screen
cli.horizontalLine = function(){
    // Get the available screen size
    var width = process.stdout.columns;

    // Put in enough dashes to go across the screen
    var line = '';
    for (i = 0; i < width; i++) {
        line+='-';
    }
    console.log(line);
};

// Create centered text on the screen
cli.centered = function(str){
    str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : '';
  
    // Get the available screen size
    var width = process.stdout.columns;
  
    // Calculate the left padding there should be
    var leftPadding = Math.floor((width - str.length) / 2);
  
    // Put in left padded spaces before the string itself
    var line = '';
    for (i = 0; i < leftPadding; i++) {
        line+=' ';
    }
    line+= str;
    console.log(line);
  };


// Exit
cli.responders.exit = () => {
    process.exit(0);
};
// Stats
cli.responders.stats = () => {
    // Compile an object of stats
  var stats = {
    'Load Average' : os.loadavg().join(' '),
    'CPU Count' : os.cpus().length,
    'Free Memory' : os.freemem(),
    'Current Malloced Memory' : v8.getHeapStatistics().malloced_memory,
    'Peak Malloced Memory' : v8.getHeapStatistics().peak_malloced_memory,
    'Allocated Heap Used (%)' : Math.round((v8.getHeapStatistics().used_heap_size / v8.getHeapStatistics().total_heap_size) * 100),
    'Available Heap Allocated (%)' : Math.round((v8.getHeapStatistics().total_heap_size / v8.getHeapStatistics().heap_size_limit) * 100),
    'Uptime' : os.uptime()+' Seconds'
  };

  // Create a header for the stats
  cli.horizontalLine();
  cli.centered('SYSTEM STATISTICS');
  cli.horizontalLine();
  cli.verticalSpace(2);

  // Log out each stat
  for(var key in stats){
     if(stats.hasOwnProperty(key)){
        var value = stats[key];
        var line = '      \x1b[33m '+key+'      \x1b[0m';
        var padding = 60 - line.length;
        for (i = 0; i < padding; i++) {
            line+=' ';
        }
        line+=value;
        console.log(line);
        cli.verticalSpace();
     }
  }

  // Create a footer for the stats
  cli.verticalSpace();
  cli.horizontalLine();
};
// List users
cli.responders.listUsers = () => {
    _data.list('users',function(err,userIds){
        if(!err && userIds && userIds.length > 0){
          cli.verticalSpace();
          userIds.forEach(function(userId){
            _data.read('users',userId,function(err,userData){
              if(!err && userData){
                var line = 'Name: '+userData.firstName+' '+userData.lastName+' Phone: '+userData.phone+' Checks: ';
                var numberOfChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array && userData.checks.length > 0 ? userData.checks.length : 0;
                line+=numberOfChecks;
                console.log(line);
                cli.verticalSpace();
              }
            });
          });
        }
      });
};
// More user info
cli.responders.moreUserInfo = (str) => {
    // Get ID from string
    var arr = str.split('--');
    var userId = typeof(arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;
    if(userId){
        // Lookup the user
        _data.read('users',userId,function(err,userData){
        if(!err && userData){
            // Remove the hashed password
            delete userData.hashedPassword;

            // Print their JSON object with text highlighting
            cli.verticalSpace();
            console.dir(userData,{'colors' : true});
            cli.verticalSpace();
        }
        });
    }
};
// Checks
cli.responders.listChecks = (str) => {
    _data.list('checks',function(err,checkIds){
        if(!err && checkIds && checkIds.length > 0){
          cli.verticalSpace();
          checkIds.forEach(function(checkId){
            _data.read('checks',checkId,function(err,checkData){
              if(!err && checkData){
                var includeCheck = false;
                var lowerString = str.toLowerCase();
                // Get the state, default to down
                var state = typeof(checkData.state) == 'string' ? checkData.state : 'down';
                // Get the state, default to unknown
                var stateOrUnknown = typeof(checkData.state) == 'string' ? checkData.state : 'unknown';
                // If the user has specified that state, or hasn't specified any state
                if((lowerString.indexOf('--'+state) > -1) || (lowerString.indexOf('--down') == -1 && lowerString.indexOf('--up') == -1)){
                  var line = 'ID: '+checkData.id+' '+checkData.method.toUpperCase()+' '+checkData.protocol+'://'+checkData.url+' State: '+stateOrUnknown;
                  console.log(line);
                  cli.verticalSpace();
                }
              }
            });
          });
        }
      });
};
// CHeck info
cli.responders.moreCheckInfo = (str) => {
    // Get ID from string
  var arr = str.split('--');
  var checkId = typeof(arr[1]) == 'string' && arr[1].trim().length > 0 ? arr[1].trim() : false;
  if(checkId){
    // Lookup the user
    _data.read('checks',checkId,function(err,checkData){
      if(!err && checkData){

        // Print their JSON object with text highlighting
        cli.verticalSpace();
        console.dir(checkData,{'colors' : true});
        cli.verticalSpace();
      }
    });
  }
};
// List logs
cli.responders.listLogs = () => {
    _logs.list(true,function(err,logFileNames){
        if(!err && logFileNames && logFileNames.length > 0){
          cli.verticalSpace();
          logFileNames.forEach(function(logFileName){
            if(logFileName.indexOf('-') > -1){
              console.log(logFileName);
              cli.verticalSpace();
            }
          });
        }
      });
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