var http = require('http');
var url = require('url');


var server = http.createServer((req,res) => {

    var parsedUrl = url.parse(req.url, true);
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g,'');
    var method = req.method.toLowerCase();
    var queryStringObject = parsedUrl.query; 


    res.end('hello world');
    console.log('request received on: ' +trimmedPath+ ' \nThis method: ' +method);
    console.log(queryStringObject)
});

server.listen(3000,()=>{
    console.log('listening por 3000');
});