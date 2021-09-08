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
var util = require('util');
var debug = util.debuglog('server');

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
        
        // If the request is within the public directory use to the public handler instead
       chosenHandler = trimmedPath.indexOf('public/') > -1 ? handlers.public : chosenHandler;
        
        var data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method':method,
            'headers': headers,
            'payload': helpers.parseJsonToObject(buffer)
        };
        chosenHandler(data,(statusCode,payload,contentType) => {
            //Determine the type of response fallback to json
            
            
            
            contentType = typeof(contentType) == 'string' ? contentType : 'json';
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;



            //return the response parts that are content specific
            var payloadString = '';
            if(contentType == 'json') {
                res.setHeader('Content-Type','application/json');
                payload = typeof(payload) == 'object' ? payload : {};
                payloadString = JSON.stringify(payload);
            } if (contentType == 'html') {
                res.setHeader('Content-Type','text-html');
                payloadString = typeof(payload) == 'string' ? payload : '';
            }

            if(contentType == 'favicon'){
                res.setHeader('Content-Type', 'image/x-icon');
                payloadString = typeof(payload) !== 'undefined' ? payload : '';
              }
     
              if(contentType == 'plain'){
                res.setHeader('Content-Type', 'text/plain');
                payloadString = typeof(payload) !== 'undefined' ? payload : '';
              }
     
              if(contentType == 'css'){
                res.setHeader('Content-Type', 'text/css');
                payloadString = typeof(payload) !== 'undefined' ? payload : '';
              }
     
              if(contentType == 'png'){
                res.setHeader('Content-Type', 'image/png');
                payloadString = typeof(payload) !== 'undefined' ? payload : '';
              }
     
              if(contentType == 'jpg'){
                res.setHeader('Content-Type', 'image/jpeg');
                payloadString = typeof(payload) !== 'undefined' ? payload : '';
              }
            

            //Return the response-parts that are common to all content-types
            
            res.writeHead(statusCode);
            res.end(payloadString);
            
            //If the response is 200, print green, otherwise print red
            if(statusCode == 200) {
                debug('\x1b[32m%s\x1b[0m', method.toUpperCase()+' /'+trimmedPath+ ' '+statusCode);
            } else {
                debug('\x1b[31m%s\x1b[0m', method.toUpperCase()+' /'+trimmedPath+ ' '+statusCode);
            }
        });
    });
};

//routers
server.router = {
    '': handlers.index,
    'account/create': handlers.accountCreate,
    'account/edit': handlers.accountEdit,
    'account/deleted': handlers.accountDeleted,
    'session/create': handlers.sessionCreate,
    'session/deleted': handlers.sessionDeleted,
    'checks/all': handlers.checksList,
    'checks/create': handlers.checksCreate,
    'checks/edit': handlers.checksEdit,
    'ping': handlers.ping,
    'api/users': handlers.users,
    'api/tokens': handlers.tokens,
    'api/checks': handlers.checks,
    'favicon.ico': handlers.favicon,
    'public': handlers.public
};

//init script
server.init = () => {
    server.httpServer.listen(config.httpPort,()=>{
        console.log('\x1b[36m%s\x1b[0m','listening port '+config.httpPort);
    });

    server.httpsServer.listen(config.httpsPort,()=>{
        console.log('\x1b[35m%s\x1b[0m','listening port '+config.httpsPort);
    });
};

module.exports = server;