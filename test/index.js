/**
 * TEST RUNNER
 */

// Appication logic for the test runner
_app = {}

// Container for tests
_app.tests = {};

//Add unit tests as depency
_app.tests.unit = require('./unit');

// Count all the tests
_app.countTests = () => {
    var counter = 0;

    for(var key in _app.tests){
        if(_app.tests.hasOwnProperty(key)){
            var subTests = _app.tests[key];
            for(var testName in subTests){
                if(subTests.hasOwnProperty(testName)){
                    counter++;
                }
            }
        }
    }
    return counter;
};

//Function to run tests
_app.runTests = () => {
    var errors = [];
    var successes = 0;

    var limit = _app.countTests();
    var counter = 0;

    for (var key in _app.tests){
        if(_app.tests.hasOwnProperty(key)){
            var subTests = _app.tests[key];
            for(var testName in subTests){
                if(subTests.hasOwnProperty(testName)){
                    (() => {
                        var tmpTestName = testName;
                        var testValue = subTests[testName];
                        
                        // Call the test
                        try{
                            testValue(() => {
                                //If it calls back it means it worked
                                console.log('\x1b[32m%s\x1b[0m',tmpTestName);
                                counter++;
                                successes++;
                                if(counter == limit) {
                                    _app.produceTestReport(limit,successes,errors);

                                }
                            });
                        }catch(e){
                            //If it throws it captured the fail
                            errors.push({
                                'name': testName,
                                'error': e,
                            });
                            console.log('\x1b[31m%s\x1b[0m',tmpTestName);
                            counter++;
                            if(counter == limit) {
                                _app.produceTestReport(limit,successes,errors);

                            }
                        }
                    })();
                }
            }
        }
    }
};


// Produce the test report
_app.produceTestReport = (limit,successes,errors) => {
    console.log("");
    console.log("-------------- BEGIN TEST REPORT ---------------");
    console.log("");
    console.log("Total tests:", limit);
    console.log("Passed: ", successes);
    console.log("Fails: ", errors.length);
    console.log("");
    
    // If there are errors, print the errors
    if(errors.length > 0){

        console.log("---- BEGIN ERROR DETAILS -------");
        console.log("");

        errors.forEach(testError => {
            console.log('\x1b[31m%s\x1b[0m',testError.name);
            console.log(testError.error);
            console.log("");
        });

        console.log("");
        console.log("---- END ERROR DETAILS -----");

    }

    console.log("");
    console.log("---- END TEST REPORT -----");
};

// Run tthe test
_app.runTests();

