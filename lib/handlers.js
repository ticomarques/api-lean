//Request handlers


//dependencies
var _data = require('./data');
var helpers = require('./helpers');

var handlers = {}
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
        callback(400,{'Error':'Missing required fields'});
    }
};


//Users - get
//Required data: phone
//Optional data: none
//@TODO only authorized users access their object

handlers._users.get = (data, callback) => {
    var phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
    if(phone) {
        _data.read('users',phone,(err,data)=>{
            if(!err && data){
                delete data.hashedPassword;
                callback(200,data);
            } else {
                callback(404);
            }
        });
    } else {
        callback(400, {'Error':'Missing required fields'});
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
            callback(400,{'Error: ':'Missing fields required.'})
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
        _data.read('users',phone,(err,data)=>{
            if(!err && data){
                _data.delete('users',phone,(err)=>{
                    if(!err){
                        callback(200);
                    } else {
                        callback(500,{'Error: ':'Could not delete the specified user.'});
                    }
                });
            } else {
                callback(400,{'Error: ':'Could not find the specified user.'});
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
handlers._tokens.post = (data, callback) => {
    var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
    var password = typeof(data.payload.password) == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

    if(phone && password){
        _data.read('users', phone, (err,userData)=>{
            if(!err && userData){
                var hashedPassword = helpers.hash(password);
                if(hashedPassword == userData.hashedPassword){
                    var tokenId = helpers.createRandomString(20);
                    var expires = Date.now() + 1000 * 60 * 60;
                    var tokenObject = {
                        'phone': phone,
                        'id':tokenId,
                        'expires': expires
                    };
                    _data.create('tokens',tokenId,tokenObject,(err)=>{
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







handlers.notFound = (data, callback) => {
    callback(404);
};

handlers.ping = (data, callback) => {
    callback(200);
};

module.exports = handlers;