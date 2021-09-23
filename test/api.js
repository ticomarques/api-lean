/**
 * API TESTS
 */

//Depedencies
var app = require('./../index');
var assert = require('assert');
var http = require('http');
var config = require('./../lib/config');

//Holder for the tests
var api = {};

//Helpers
var helpers = {};

helpers.makeGetRequest = (path, callback) => {
    var requestDetails = {
        'protocol': 'http:',
        'hostname': 'localhost',
        'port': config.httpPort,
        'method': 'GET',
        path,
        'headers': {
            'Content-Type': 'application/json'
        }
    };

    //Send the request
    var req = http.request(requestDetails,(res)=>{
        callback(res);
    });
    req.end();
};


// The main init() function should be able to run without throwing
api['app.init should start without throw'] = (done) => {
    assert.doesNotThrow(()=>{
        app.init((err)=>{
            done();
        });
    }, TypeError);
};

// Make a request to /ping
api['/ping should respond to GET with 200'] = (done) => {
    helpers.makeGetRequest('/ping',(res)=>{
        assert.equal(res.statusCode,200);
        done();
    });
};

// Make a request to /api/users
api['/api/users should respond to GET with 400'] = (done) => {
    helpers.makeGetRequest('/api/users',(res)=>{
        assert.equal(res.statusCode,400);
        done();
    });
};

// Make a request to random path respond 404
api['random path should respond 404'] = (done) => {
    helpers.makeGetRequest('/api/xxx',(res)=>{
        assert.equal(res.statusCode,404);
        done();
    });
};


//Export the tests to the runner
module.exports = api;
