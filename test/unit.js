/*
  /Unit tests
*/

// Dependencies
var helpers = require('./../lib/helpers');
var assert = require('assert');
var logs = require('./../lib/logs');

//Holder for the tests

var unit = {};



//Assert that the GetANumber is returning a number
unit['helpers.getANumber should return a number'] = (done) => {
    var val = helpers.getANumber();
    assert.equal(typeof(val), 'number');
    done();
};

//Assert that the GetANumber is returning a 1
unit['helpers.getANumber should return a 1'] = (done) => {
    var val = helpers.getANumber();
    assert.equal(val, 1);
    done();
};

//Assert that the GetANumber is returning  2
unit['helpers.getANumber should return a 2'] = (done) => {
    var val = helpers.getANumber();
    assert.equal(val, 2);
    done();
};

//Logs .list should callback an array and false error

unit['logs.list should callback a false error and an  array of names'] = (done) => {
    logs.list(true, (err, logFileNames)=>{
        assert.equal(err,false);
        assert.ok(logFileNames instanceof Array);
        assert.ok(logFileNames.length > 1);
        done();
    });
};

//Logs truncate should not throw if the log id does not exist
unit['logs.truncate should not throw if the logId does not exist, it should call back and error instead'] = (done) => {
    assert.doesNotThrow(()=>{
        logs.truncate('I do not exist', (err)=>{
            assert.ok(err);
            done();
        });
    },TypeError);
};

module.exports = unit;