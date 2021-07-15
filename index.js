var http = require('http');


var server = http.createServer((req,res) => {
    res.end('hello world');
});

server.listen(3000,()=>{
    console.log('listening por 3000');
});