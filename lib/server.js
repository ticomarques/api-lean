/*
* Server-related tasks

*/

var http = require('http');
var https = require('https');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');
var fs = require('fs');
var handlers = require('./handlers');
var helpers = require('./helpers');
var path = require('path');

//instantiate the server module object

var server = {};

// @TODO GET RID OF THIS
// helpers.sendTwilioSms('4158440443','Hello this is test from nodejs API LEAN',(err)=>{
//     console.log('This was the error: ',err);
// });


server.httpServer = http.createServer((req,res) => {
    server.unifiedServer(req,res);
});
server.httpsServerOptions = {
    'key' : fs.readFileSync(path.join(__dirname,'/../https/key.pem')),
    'cert' : fs.readFileSync(path.join(__dirname,'/../https/cert.pem'))
};
server.httpsServer = https.createServer(server.httpsServerOptions,(req,res) => {
    server.unifiedServer(req,res);
});



server.unifiedServer = (req, res) => {
    //cleaning

    var parsedUrl = url.parse(req.url, true);
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g,'');
    var method = req.method.toLowerCase();
    var queryStringObject = parsedUrl.query;
    var headers = req.headers;
    var decoder = new StringDecoder('utf-8');
    
    var buffer = '';
    req.on('data',(data) => {
        buffer += decoder.write(data);
    });
    req.on('end',()=>{
        buffer += decoder.end();

        var chosenHandler = typeof(server.router[trimmedPath]) !== 'undefined' ? server.router[trimmedPath] : handlers.notFound;
        var data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method':method,
            'headers': headers,
            'payload': helpers.parseJsonToObject(buffer)
        };
        chosenHandler(data,(statusCode,payload) => {
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
            payload = typeof(payload) == 'object' ? payload : {};

            var payloadString = JSON.stringify(payload);
            
            res.setHeader('Content-Type','application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
            console.log('Response: ', statusCode, payloadString);
        });
        

    });


};

//routers
server.router = {
    'notFound': handlers.notFound,
    'ping': handlers.ping,
    'users': handlers.users,
    'tokens': handlers.tokens,
    'checks': handlers.checks
};

//init script
server.init = () => {
    server.httpServer.listen(config.httpPort,()=>{
        console.log('listening port '+config.httpPort);
    });

    server.httpsServer.listen(config.httpsPort,()=>{
        console.log('listening port '+config.httpsPort);
    });
};

module.exports = server;