var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;


var server = http.createServer((req,res) => {

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

        res.end('hello world');
        console.log('Payload: ', buffer);
    });   
});

server.listen(3000,()=>{
    console.log('listening por 3000');
});