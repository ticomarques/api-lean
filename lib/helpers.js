var crypto = require('crypto');
var config = require('./config');
var https = require('https');
var querystring = require('querystring');
var path = require('path');
var fs = require('fs');


var helpers = {};

helpers.hash = (str) => {
    if(typeof(str) == 'string' && str.length > 0){
        var hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
        return hash;
    } else {
        return false;
    }
};

helpers.parseJsonToObject = (str) => {
    try {
        var obj = JSON.parse(str);
        return obj;
    } catch(e) {
        return {};
    }
};

helpers.createRandomString = (strLength) => {
    strLength =typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
    if(strLength){
        var possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';

        var str = '';

        for(i=1; i <= strLength; i++){
            var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random()* possibleCharacters.length));
            str += randomCharacter;
        }

        return str;
    } else {
        return false;
    }
};

helpers.sendTwilioSms = (phone, msg, callback) => {
    phone = typeof(phone) == 'string' && phone.trim().length == 10 ? phone.trim() : false;
    msg = typeof(msg) == 'string' && msg.trim().length > 0 && msg.trim().length <= 160 ? msg.trim() : false;

    console.log(phone);
    console.log(msg);

    if(phone && msg){
        var payload = {
            'From': config.twilio.fromPhone,
            'To': '+1'+phone,
            'Body': msg
        };

        var stringPayload = querystring.stringify(payload);

        var requestDetails = {
            'protocol' : 'https:',
            'hostname' : 'api.twilio.com',
            'method' : 'POST',
            'path' : '/2010-04-01/Accounts/'+config.twilio.accountSid+'/Messages.json',
            'auth' : config.twilio.accountSid+':'+config.twilio.authToken,
            'headers' : {
              'Content-Type' : 'application/x-www-form-urlencoded',
              'Content-Length': Buffer.byteLength(stringPayload)
            }
          };

          var req = https.request(requestDetails,function(res){
            var status =  res.statusCode;
            if(status == 200 || status == 201){
              callback(false);
            } else {
              callback('Status code returned was '+status);
            }
        });

        req.on('error',(e)=>{
            callback(e);
        });

        req.write(stringPayload);
        req.end();

    } else {
        callback('Given parameters were missing or invalid');
    }
};

helpers.getTemplate = (templateName, data,callback) => {
    templateName = typeof(templateName) == 'string' && templateName.length > 0 ? templateName : false;
    data = typeof(data) == 'object' && data !== null ? data : {};

    if(templateName){
        var templatesDir = path.join(__dirname,'/../templates/');
        fs.readFile(templatesDir+templateName+'.html','utf-8',(err, str)=>{
            if(!err && str.length > 0) {
                //interpolation on the string
                var finalString = helpers.interpolate(str,data);
                callback(false,finalString);
            } else {
                callback('No template could be found');
            }
        });
    } else {
      callback('A valid template name was not specified');
    }
};

//Add the universal header and footer to a string, and pass provided data object to the header and footer for interpolation
helpers.addUniversalTemplates = (str,data,callback) => {
    str = typeof(str) == 'string' && str.length > 0 ? str : '';
    data = typeof(data) == 'object' && data !== null ? data : {};

    //get the header
    helpers.getTemplate('_header',data,(err,headerString)=>{
        if(!err && headerString){
            //get the footer
            helpers.getTemplate('_footer',data,(err, footerString)=>{
                if(!err && footerString){
                    var fullString = headerString+str+footerString;
                    callback(false,fullString);
                } else {
                    callback('could not find footer template');
                }
            });
        } else {
            callback('Could not find the header template.');
        }
    });
};

// take a given string and a data object and find-replace all the keys within it
helpers.interpolate = (str, data) => {
    str = typeof(str) == 'string' && str.length > 0 ? str : '';
    data = typeof(data) == 'object' && data !== null ? data : {};

    // Add the templateGlobals do the data object, prepeding their key name with "globals"
    for(var keyName in config.templateGlobals){
        if(config.templateGlobals.hasOwnProperty(keyName)){
            data['global.'+keyName] = config.templateGlobals[keyName];
        }
    }

    //for each in key in the data object, insert it is value into the string at the corresponding placeholder
    for(var key in data){
        if(data.hasOwnProperty(key) && typeof(data[key]) == 'string'){
            var replace = data[key];
            var find = '{'+key+'}';
            str = str.replace(find,replace);
        }
    }

    return str;
};

// Get the contents of a static (public) asset
helpers.getStaticAsset = function(fileName,callback){
    fileName = typeof(fileName) == 'string' && fileName.length > 0 ? fileName : false;
    if(fileName){
      var publicDir = path.join(__dirname,'/../public/');
      fs.readFile(publicDir+fileName, function(err,data){
        if(!err && data){
          callback(false,data);
        } else {
          callback('No file could be found');
        }
      });
    } else {
      callback('A valid file name was not specified');
    }
  };

module.exports = helpers;