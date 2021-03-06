//Request handlers


//dependencies
var _data = require('./data');
var helpers = require('./helpers');
var config = require('./config');
var dns = require('dns');
var _url = require('url');
var _performance = require('perf_hooks').performance;
var util = require('util');
var debug = util.debuglog('performance');
const { PerformanceObserver } = require('perf_hooks');


var handlers = {}
/**
 * HTML handlers
 */


// index handler
handlers.index = (data, callback) => {
    //reject any request that is not GET
    if(data.method == 'get') {
        //prepare data for interpolation
        var templateData = {
            'head.title':'Uptime monitoring system',
            'header.description':'Free uptime monitoring system for HTTP/HTTPS web aplications, with text message alerts keeping yout up to date.',
            'body.class':'index'
        };

        //read in a template as string
        helpers.getTemplate('index',templateData,(err,str)=>{
            if(!err && str){
                //Add universal header and footer
                helpers.addUniversalTemplates(str,templateData,(err,str)=>{
                    if(!err && str){
                        callback(200,str,'html');
                    } else {
                        callback(500,undefined,'html');
                    }
                });
            } else {
                callback(500,undefined,'html');
            }
        });
    } else {
        callback(405, undefined,'html');
    }
};

//Create account handler
handlers.accountCreate = (data, callback) => {
    //reject any request that is not GET
    if(data.method == 'get') {
        //prepare data for interpolation
        var templateData = {
            'head.title':'Create an account',
            'header.description':'Signup is easy and only take a few seconds.',
            'body.class':'accountCreate'
        };

        //read in a template as string
        helpers.getTemplate('accountCreate',templateData,(err,str)=>{
            if(!err && str){
                //Add universal header and footer
                helpers.addUniversalTemplates(str,templateData,(err,str)=>{
                    if(!err && str){
                        callback(200,str,'html');
                    } else {
                        callback(500,undefined,'html');
                    }
                });
            } else {
                callback(500,undefined,'html');
            }
        });
    } else {
        callback(405, undefined,'html');
    }
};

//New Session handler
handlers.sessionCreate = (data, callback) => {
    //reject any request that is not GET
    if(data.method == 'get') {
        //prepare data for interpolation
        var templateData = {
            'head.title':'Login to your account',
            'header.description':'Please enter yor phone number and password to access your account',
            'body.class':'sessionCreate'
        };

        //read in a template as string
        helpers.getTemplate('sessionCreate',templateData,(err,str)=>{
            if(!err && str){
                //Add universal header and footer
                helpers.addUniversalTemplates(str,templateData,(err,str)=>{
                    if(!err && str){
                        callback(200,str,'html');
                    } else {
                        callback(500,undefined,'html');
                    }
                });
            } else {
                callback(500,undefined,'html');
            }
        });
    } else {
        callback(405, undefined,'html');
    }
};

//Delete Session 
handlers.sessionDeleted = (data, callback) => {
    //reject any request that is not GET
    if(data.method == 'get') {
        //prepare data for interpolation
        var templateData = {
            'head.title':'Logged out',
            'header.description':'You have been  logged out sucessfully',
            'body.class':'sessionDeleted'
        };

        //read in a template as string
        helpers.getTemplate('sessionDeleted',templateData,(err,str)=>{
            if(!err && str){
                //Add universal header and footer
                helpers.addUniversalTemplates(str,templateData,(err,str)=>{
                    if(!err && str){
                        callback(200,str,'html');
                    } else {
                        callback(500,undefined,'html');
                    }
                });
            } else {
                callback(500,undefined,'html');
            }
        });
    } else {
        callback(405, undefined,'html');
    }
};

//Account Edit 
handlers.accountEdit = (data, callback) => {
    //reject any request that is not GET
    if(data.method == 'get') {
        //prepare data for interpolation
        var templateData = {
            'head.title':'Account settings',
            'body.class':'accountEdit'
        };

        //read in a template as string
        helpers.getTemplate('accountEdit',templateData,(err,str)=>{
            if(!err && str){
                //Add universal header and footer
                helpers.addUniversalTemplates(str,templateData,(err,str)=>{
                    if(!err && str){
                        callback(200,str,'html');
                    } else {
                        callback(500,undefined,'html');
                    }
                });
            } else {
                callback(500,undefined,'html');
            }
        });
    } else {
        callback(405, undefined,'html');
    }
};

//Account Deleted 
handlers.accountDeleted = (data, callback) => {
    //reject any request that is not GET
    if(data.method == 'get') {
        //prepare data for interpolation
        var templateData = {
            'head.title':'Account settings',
            'head.description':'Your account has been deleted',
            'body.class':'accountDeleted'
        };

        //read in a template as string
        helpers.getTemplate('accountDeleted',templateData,(err,str)=>{
            if(!err && str){
                //Add universal header and footer
                helpers.addUniversalTemplates(str,templateData,(err,str)=>{
                    if(!err && str){
                        callback(200,str,'html');
                    } else {
                        callback(500,undefined,'html');
                    }
                });
            } else {
                callback(500,undefined,'html');
            }
        });
    } else {
        callback(405, undefined,'html');
    }
};

//Create a new check 
handlers.checksCreate = (data, callback) => {
    //reject any request that is not GET
    if(data.method == 'get') {
        //prepare data for interpolation
        var templateData = {
            'head.title':'Create a new check',
            'body.class':'checksCreate'
        };

        //read in a template as string
        helpers.getTemplate('checksCreate',templateData,(err,str)=>{
            if(!err && str){
                //Add universal header and footer
                helpers.addUniversalTemplates(str,templateData,(err,str)=>{
                    if(!err && str){
                        callback(200,str,'html');
                    } else {
                        callback(500,undefined,'html');
                    }
                });
            } else {
                callback(500,undefined,'html');
            }
        });
    } else {
        callback(405, undefined,'html');
    }
};

//Dashboard view all checks 
handlers.checksList = (data, callback) => {
    //reject any request that is not GET
    if(data.method == 'get') {
        //prepare data for interpolation
        var templateData = {
            'head.title':'Dashboard',
            'body.class':'checksList'
        };

        //read in a template as string
        helpers.getTemplate('checksList',templateData,(err,str)=>{
            if(!err && str){
                //Add universal header and footer
                helpers.addUniversalTemplates(str,templateData,(err,str)=>{
                    if(!err && str){
                        callback(200,str,'html');
                    } else {
                        callback(500,undefined,'html');
                    }
                });
            } else {
                callback(500,undefined,'html');
            }
        });
    } else {
        callback(405, undefined,'html');
    }
};

//Edit a check 
handlers.checksEdit = (data, callback) => {
    //reject any request that is not GET
    if(data.method == 'get') {
        //prepare data for interpolation
        var templateData = {
            'head.title':'Check details',
            'body.class':'checksEdit'
        };

        //read in a template as string
        helpers.getTemplate('checksEdit',templateData,(err,str)=>{
            if(!err && str){
                //Add universal header and footer
                helpers.addUniversalTemplates(str,templateData,(err,str)=>{
                    if(!err && str){
                        callback(200,str,'html');
                    } else {
                        callback(500,undefined,'html');
                    }
                });
            } else {
                callback(500,undefined,'html');
            }
        });
    } else {
        callback(405, undefined,'html');
    }
};

/** Favicon handler */
handlers.favicon = function(data,callback){
    // Reject any request that isn't a GET
    if(data.method == 'get'){
      // Read in the favicon's data
      helpers.getStaticAsset('favicon.ico',function(err,data){
        if(!err && data){
          // Callback the data
          callback(200,data,'favicon');
        } else {
          callback(500);
        }
      });
    } else {
      callback(405);
    }
  };

/** Static files */
handlers.public = function(data,callback){
    // Reject any request that isn't a GET
    if(data.method == 'get'){
      // Get the filename being requested
      var trimmedAssetName = data.trimmedPath.replace('public/','').trim();
      if(trimmedAssetName.length > 0){
        // Read in the asset's data
        helpers.getStaticAsset(trimmedAssetName,function(err,data){
          if(!err && data){
  
            // Determine the content type (default to plain text)
            var contentType = 'plain';
  
            if(trimmedAssetName.indexOf('.css') > -1){
              contentType = 'css';
            }
  
            if(trimmedAssetName.indexOf('.png') > -1){
              contentType = 'png';
            }
  
            if(trimmedAssetName.indexOf('.jpg') > -1){
              contentType = 'jpg';
            }
  
            if(trimmedAssetName.indexOf('.ico') > -1){
              contentType = 'favicon';
            }
  
            // Callback the data
            callback(200,data,contentType);
          } else {
            callback(404);
          }
        });
      } else {
        callback(404);
      }
  
    } else {
      callback(405);
    }
  };

/**
 * JSON API handlers
 */

/** 
    JSON API Handlers
*/

handlers.exampleError = (data, Callback) => {
    var err = new Error('This is an example error');
    throw(err);
};



handlers.users = (data, callback) => {
    var acceptableMethods = ['post', 'get','put', 'delete'];
    if(acceptableMethods.indexOf(data.method) > -1) {
        handlers._users[data.method](data, callback);
    } else {
        callback(405);
    }
};
handlers._users = {};

//Users - post
//Required data: firstName, lastName, phone, password,tosAgreement
//Optional data: none
/*
    {
        "firstName": "tiago",
        "lastName": "leite",
        "phone":"1234567890", 
        "password":"ovo",
        "tosAgreement": true
    }
*/ 
handlers._users.post = (data, callback) => {
    var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
    var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    var tosAgreement = typeof(data.payload.tosAgreement) == 'boolean' && data.payload.tosAgreement == true ? true : false;

    if(firstName && lastName && phone && password && tosAgreement){
        _data.read('users',phone,(err, data) => {
            if(err){
                var hashedPassword = helpers.hash(password);
                if(hashedPassword){
                    var userObject = {
                        firstName,
                        lastName,
                        phone,
                        hashedPassword,
                        tosAgreement
                    };
    
                    _data.create('users', phone,userObject,(err) => {
                        if (!err){
                            callback(200);
                        } else {
                            callback(500,{'Error': 'Could not create the user'});
                        }
                    });
                } else {
                    callback(500,{'Error':'Could not hash the users password'});
                }
            } else {
                callback(400,{'Error': 'A user with that phone number exists'});
            }
        });
    } else {
        callback(400,{'Error':'Missing required fields for Users Post'});
    }
};


//Users - get
//Required data: phone
//Optional data: none
//@TODO only authorized users access their object
handlers._users.get = (data, callback) => {
    var phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
    if(phone) {
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        
        handlers._tokens.verifyToken(token,phone,(tokenIsValid)=>{
            if(tokenIsValid){
                _data.read('users',phone,(err,data)=>{
                    if(!err && data){
                        delete data.hashedPassword;
                        callback(200,data);
                    } else {
                        callback(404);
                    }
                });
            } else {
                callback(403,{'Error: ':'Missing required token in header, or token invalid.'});
            }
        });   
    } else {
        callback(400, {'Error':'Missing required fields for get users.'});
    }
};

//Users - put
//Required data: phone
//optional data: firstName, lastName, password (at least one must be specified) 
//@Only let an authorized user update their data
handlers._users.put = (data, callback) => {
    var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
    var firstName = typeof(data.payload.firstName) == 'string' && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
    var lastName = typeof(data.payload.lastName) == 'string' && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

    if(phone){
        if(firstName || lastName || password){

            var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
            handlers._tokens.verifyToken(token,phone,(tokenIsValid)=>{
                if(tokenIsValid){
                    _data.read('users',phone,(err,userData)=>{
                        if(!err && userData){
                            if(firstName){
                                userData.firstName = firstName;
                            }
                            if(lastName){
                                userData.lastName = lastName;
                            }
                            if(password){
                                userData.hashedPassword = helpers.hash(password);
                            }
                            _data.update('users',phone,userData,(err)=>{
                                if(!err){
                                    callback(200);
                                } else {
                                    console.log(err);
                                    callback(500,{'Error: ':'Could not update thr user'});
                                }
                            });
                        } else {
                            callback(400,{'Error: ':'Specified user does not exist'});
                        }
                    });
                } else {
                    callback(403,{'Error: ':'Missing required token in header, or token invalid.'});
                }
            });
            
        } else {
            callback(400,{'Error: ':'Missing fields required.'});
        }
    } else {
        callback(400,{'Error: ':'Missing required fields.'});
    }
};

//Users - delete
//Required field: phone
//@TODO only let an authenticated user delete their object.
//@TODO Cleanup (delete) any other data file associated to this user.
handlers._users.delete = (data, callback) => {
    var phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
    if(phone) {
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        handlers._tokens.verifyToken(token,phone,(tokenIsValid)=>{
            if(tokenIsValid){ 
                _data.read('users',phone,(err,userData)=>{
                    if(!err && userData){
                        _data.delete('users',phone,(err)=>{
                            if(!err){
                                var userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
                                var checksToDelete = userChecks.length;
                                if(checksToDelete > 0){
                                    var checksDeleted = 0;
                                    var deletionErrors = false;

                                    userChecks.forEach((checkId)=>{
                                        _data.delete('checks',checkId,(err)=>{
                                            if(err){
                                                deletionErrors = true;
                                            }
                                            checksDeleted++;
                                            if(checksDeleted == checksToDelete) {
                                                if(!deletionErrors){
                                                    callback(200);
                                                } else {
                                                    callback(500,{'Error: ':'Errors encountered while attempting to delete all of users checks. All checks may not habe been deleted from the system sucessfully.'});
                                                }
                                            }
                                        });
                                    });

                                } else {
                                    callback(200);
                                }
                            } else {
                                callback(500,{'Error: ':'Could not delete the specified user.'});
                            }
                        });
                    } else {
                        callback(400,{'Error: ':'Could not find the specified user.'});
                    }
                });
            } else {
                callback(403,{'Error: ':'Missing required token in header, or token invalid.'});
            }
        });
    } else {
        callback(400, {'Error':'Missing required fields'});
    }
};



//TOKENS
handlers.tokens = (data, callback) => {
    var acceptableMethods = ['post', 'get','put', 'delete'];
    if(acceptableMethods.indexOf(data.method) > -1) {
        handlers._tokens[data.method](data, callback);
    } else {
        callback(405);
    }
};
handlers._tokens = {};


//TOKEN - POST
//REQUIRED DATA: phone, password
//OPTIONAL DATA: none
/*
    {
        "phone":"1234567890", 
        "password":"ovo"
    }
*/ 
handlers._tokens.post = (data, callback) => {
    _performance.mark('Entered function');
    var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
    var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

    _performance.mark('Inputs validated');
    if(phone && password){
        _performance.mark('beginning user lookup');
        _data.read('users', phone, (err,userData)=>{
            _performance.mark('User lookup completed');
            if(!err && userData){
                _performance.mark('Beginning password hashing');
                var hashedPassword = helpers.hash(password);
                _performance.mark('Password hashing completed');
                if(hashedPassword == userData.hashedPassword){
                    _performance.mark('Creating data for the token');
                    var tokenId = helpers.createRandomString(20);
                    var expires = Date.now() + 1000 * 60 * 60;
                    var tokenObject = {
                        'phone': phone,
                        'id':tokenId,
                        'expires': expires
                    };

                    //Store Token
                    _performance.mark('Beginning storing token');
                    _data.create('tokens',tokenId,tokenObject,(err)=>{
                        _performance.mark('Storing token complete');

                        // Log out all the measurements
                        const obs = new PerformanceObserver((list) => {
                            const measurements = list.getEntriesByType('measure');
                            measurements.forEach((measurement)=>{
                                debug('\x1b[33m%s\x1b[0m',measurement.name+' '+measurement.duration);
                            });
                        });
                        obs.disconnect();
                        obs.observe({ entryTypes: ['measure'] });

                        // Gather all the measures
                        _performance.measure('Begginning to end','Entered function','Storing token complete');
                        _performance.measure('Validating user inputs','Entered function','Inputs validated');
                        _performance.measure('User Lookup','beginning user lookup','User lookup completed');
                        _performance.measure('Password hashing','Beginning password hashing','Password hashing completed');
                        _performance.measure('Token data creation','Creating data for the token','Beginning storing token');
                        _performance.measure('Token storing','Beginning storing token','Storing token complete');

                        if(!err){
                            callback(200,tokenObject);
                        } else {
                            callback(500,{'Error: ': 'could no create a new token'});
                        }
                    });

                } else {
                    callback(400, {'Error: ': 'Password did not match to specified users stored password.'});
                }
            } else {
                callback(400, {'Error: ': 'could not find the specified user.'});
            }
        });
    } else {
        callback(200, {'Error: ': 'Missing required fields.'});
    }
};

//TOKENS GET
//REQUIRED DATA: id
//OPTIONAL DATA: 
handlers._tokens.get = (data, callback) => {
    var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
    
    if(id) {
        _data.read('tokens',id,(err,tokenData)=>{
            if(!err && tokenData){
                callback(200,tokenData);
            } else {
                callback(404);
            }
        });
    } else {
        callback(400, {'Error':'Missing required fields'});
    }
};


//TOKENS PUT
//REQUIRED DATA: id, extend
//OPTIONAL DATA: none
handlers._tokens.put = (data, callback) => {
    var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
    var extend = typeof(data.payload.extend) == 'boolean' && data.payload.extend == true ? true : false;

    if(id && extend){
        _data.read('tokens',id,(err,tokenData)=>{
            if(!err && tokenData){
                if(tokenData.expires > Date.now()){
                    tokenData.expires = Date.now() + 1000 * 60 * 60;
                    _data.update('tokens',id,tokenData,(err)=>{
                        if(!err){
                            callback(200);
                        } else {
                            callback(500,{'Error: ':'Could not update the token expiration'});
                        }
                    });
                } else {
                    callback(400,{'Error: ':'The token has already expired, and cannot be extended.'})
                }
            } else {
                callback(400,{'Error: ':'Specified token does not exist'});
            }
        });
    } else {
        callback(400,{'Error: ':'Missing required fields or fields are invalid.'})
    }
    
};


//TOKENS DELETE
//REQUIRED DATA: id
//OPTIONAL DATA: NONE
handlers._tokens.delete = (data, callback) => {
    var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
    if(id) {
        _data.read('tokens',id,(err,data)=>{
            if(!err && data){
                _data.delete('tokens',id,(err)=>{
                    if(!err){
                        callback(200);
                    } else {
                        callback(500,{'Error: ':'Could not delete the specified token.'});
                    }
                });
            } else {
                callback(400,{'Error: ':'Could not find the specified token.'});
            }
        });
    } else {
        callback(400, {'Error':'Missing required fields'});
    }
};

//verify if a given token id is currently valid for a fiven user
handlers._tokens.verifyToken = (id,phone,callback)=>{
    _data.read('tokens',id,(err,tokenData)=>{
        if(!err && tokenData){
            if(tokenData.phone == phone && tokenData.expires > Date.now()){
                callback(true);
            } else {
                callback(false);
            }
        } else {
            callback(false);
        }
    });
};


//******************* */
//Checks services
handlers.checks = (data, callback) => {
    var acceptableMethods = ['post', 'get','put', 'delete'];
    if(acceptableMethods.indexOf(data.method) > -1) {
        handlers._checks[data.method](data, callback);
    } else {
        callback(405);
    }
};
handlers._checks = {};

//Check POST
//Required data: protocol,url, method, successCodes,timeoutSeconds
//Optional data: none
/**
 * 
    {
        "protocol":"http",
        "url":"google.com",
        "method":"get",
        "successCode": [200,201,301,302],
        "timeoutSeconds": 3
    }
 */
handlers._checks.post = (data, callback) => {
    var protocol = typeof(data.payload.protocol) == 'string' && ['https','http'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
    var url = typeof(data.payload.url) == 'string' && data.payload.url.trim().length > 0 ? data.payload.url : false;
    var method = typeof(data.payload.method) == 'string' && ['post','get','put','delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
    var successCodes = typeof(data.payload.successCode) == 'object' && data.payload.successCode instanceof Array && data.payload.successCode.length > 0 ? data.payload.successCode : false;
    var timeoutSeconds = typeof(data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5  ? data.payload.timeoutSeconds : false;

    if(protocol && url && method && successCodes && timeoutSeconds){
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

        _data.read('tokens',token,(err,tokenData)=>{
            if(!err && tokenData){
                var userPhone = tokenData.phone;

                _data.read('users',userPhone,(err,userData)=>{
                    if(!err && userData){
                        var userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
                        if(userChecks.length < config.maxChecks){

                            //Verify that the URL given has DNS entries and therefore can resolve
                            var parsedUrl = _url.parse(protocol+'://'+url, true);
                            var hostName = typeof(parsedUrl.hostname) == 'string' && parsedUrl.hostname.length > 0 ? parsedUrl.hostname : false;
                            dns.resolve(hostName,(err, records)=>{
                                if(!err && records){
                                    // Create random id for check
                                    var checkId = helpers.createRandomString(20);
                                    
                                    // Create check object including userPhone
                                    var checkObject = {
                                        'id': checkId,
                                        userPhone,
                                        protocol,
                                        url,
                                        method,
                                        successCodes,
                                        timeoutSeconds
                                    };

                                    _data.create('checks',checkId,checkObject,(err)=>{
                                        if(!err){
                                            userData.checks = userChecks;
                                            userData.checks.push(checkId);

                                            _data.update('users',userPhone,userData,(err)=>{
                                                if(!err){
                                                    callback(200,checkObject);
                                                } else {
                                                    callback(500,{'Error: ':'Could not update the user with the new check'});
                                                }
                                            });
                                        } else {
                                            callback(500,{'Error: ': 'Could not create the new check'});
                                        }
                                    });
                                } else {
                                    callback(400, {'Error': 'The hostname of URL did not resolve to any DNS entries'});
                                }
                            });
                        } else {
                            callback(400,{'Error: ':'The user already has the maximum number of checks: ('+config.maxChecks+')'});
                        }
                    } else {
                        callback(403);
                    }
                });
            } else {
              callback(403);  
            }
        });
    } else {
        callback(400,{'Error: ':'Missing required inputs, or inputs are invalid..'});
    }
};


//Checks - Get
// Required data: id
// Optional data : none
handlers._checks.get = (data, callback) => {
    var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
    if(id) {

        _data.read('checks',id,(err,checkData)=>{
            if(!err && checkData){
                var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
                handlers._tokens.verifyToken(token,checkData.userPhone,(tokenIsValid)=>{
                    if(tokenIsValid){
                        callback(200,checkData);
                    } else {
                        callback(403);
                    }
                });
            } else {
                callback(404);
            }
        });   
    } else {
        callback(400, {'Error':'Missing required fields'});
    }
};


//Checks - put
//Required data: id
//Optional data: protocol, url, method, successCodes (one must be sent)
handlers._checks.put = (data, callback) => {
    var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;

    var protocol = typeof(data.payload.protocol) == 'string' && ['https','http'].indexOf(data.payload.protocol) > -1 ? data.payload.protocol : false;
    var url = typeof(data.payload.url) == 'string' && data.payload.url.trim().length > 0 ? data.payload.url : false;
    var method = typeof(data.payload.method) == 'string' && ['post','get','put','delete'].indexOf(data.payload.method) > -1 ? data.payload.method : false;
    var successCodes = typeof(data.payload.successCode) == 'object' && data.payload.successCode instanceof Array && data.payload.successCode.length > 0 ? data.payload.successCode : false;
    var timeoutSeconds = typeof(data.payload.timeoutSeconds) == 'number' && data.payload.timeoutSeconds % 1 === 0 && data.payload.timeoutSeconds >= 1 && data.payload.timeoutSeconds <= 5  ? data.payload.timeoutSeconds : false;

    if(id){
        if(protocol || url || method || successCodes || timeoutSeconds){
            _data.read('checks',id,(err,checkData)=>{
                if(!err && checkData){
                    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
                    handlers._tokens.verifyToken(token,checkData.userPhone,(tokenIsValid)=>{
                        if(tokenIsValid){
                            if(protocol){
                                checkData.protocol = protocol;
                            }
                            if(url){
                                checkData.url = url;
                            }
                            if(method){
                                checkData.method = method;
                            }
                            if(successCodes){
                                checkData.successCodes = successCodes;
                            }
                            if(timeoutSeconds){
                                checkData.timeoutSeconds = timeoutSeconds;
                            }

                            _data.update('checks',id,checkData,(err)=>{
                                if(!err){
                                    callback(200);
                                } else {
                                    callback(500,{'Error: ':'Could not update the check.'})
                                }
                            });
                        } else {
                            callback(403);
                        }
                    });
                } else {
                    callback(400,{'Error: ':'Check id did not exist'});
                }
            });
        } else {
            callback(400,{'Error: ':'Missing field to update.'})
        }
    } else {
        callback(400,{'Error: ':'Missing required field.'});
    }
};



//Checks - delete
//Required data: id
//Optional data: none
handlers._checks.delete = (data, callback) => {
    var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
    if(id) {
        _data.read('checks',id,(err, checkData) => {
            if(!err && checkData){
                var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
                handlers._tokens.verifyToken(token,checkData.userPhone,(tokenIsValid)=>{
                    if(tokenIsValid){ 

                        _data.delete('checks',id,(err)=>{
                            if(!err){
                                _data.read('users',checkData.userPhone,(err,userData)=>{
                                    if(!err && userData){
                                        var userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
                                        
                                        var checkPosition = userChecks.indexOf(id);
                                        if(checkPosition > -1){
                                            userChecks.splice(checkPosition,1);
                                            _data.update('users',checkData.userPhone,userData,(err)=>{
                                                if(!err){
                                                    callback(200);
                                                } else {
                                                    callback(500,{'Error: ':'Could not update the specified user.'});
                                                }
                                            });
                                        } else {
                                            callback(500,{'Error: ': 'Could not find the check on the users object, so could not remove it.'});
                                        }
                                        
                                    } else {
                                        callback(500,{'Error: ':'Could not find the user who created the check, so could not remove the check from the list of checks on the user object.'});
                                    }
                                });
                            } else {
                                callback(500,{'Error: ': 'Could delete the check data.'});
                            }
                        });
                    } else {
                        callback(403);
                    }
                });
            } else {
                callback(400,{'Error: ':'The specified check ID does not exist'});
            }
        });
    } else {
        callback(400, {'Error':'Missing required fields'});
    }
};

handlers.notFound = (data, callback) => {
    callback(404);
};

handlers.ping = (data, callback) => {
    callback(200);
};

module.exports = handlers;