var http = require('http');
var https = require('https');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./config');
var fs = require('fs');


var httpServer = http.createServer((req,res) => {
    unifiedServer(req,res);
});

httpServer.listen(config.httpPort,()=>{
    console.log('listening port '+config.httpPort);
});


var httpsServerOptions = {
    'key' : fs.readFileSync('./https/key.pem'),
    'cert' : fs.readFileSync('./https/cert.pem')
};
var httpsServer = https.createServer(httpsServerOptions,(req,res) => {
    unifiedServer(req,res);
});

httpsServer.listen(config.httpsPort,()=>{
    console.log('listening port '+config.httpsPort);
});

var unifiedServer = (req, res) => {
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

        var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
        var data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'headers': headers,
            'payload': buffer
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

//handlers
var handlers = {}

handlers.sample = (data, callback) => {
    callback(406,{'name':'sample handler'});
};

handlers.notFound = (data, callback) => {
    callback(404);
};


//routers
var router = {
    'sample': handlers.sample
};