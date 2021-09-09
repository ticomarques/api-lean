/*
front-end logic for application
 */
var app = {};

app.config = {
    'sessionToken': false
};

//AJAX client for the REST API

app.client = {};

app.client.request = (headers,path,method,queryStringObject,payload,callback) => {
    //Set defautls for everything
    headers = typeof(headers) == 'object' && headers !== null ? headers : {};
    path = typeof(path) == 'string' ? path : '/';
    method = typeof(method) == 'string' && ['POST','GET','PUT','DELETE'].indexOf(method) > -1 ? method.toUpperCase() : 'GET';
    queryStringObject = typeof(queryStringObject) == 'object' && queryStringObject !== null ? queryStringObject : {};
    payload = typeof(payload) == 'object' && payload !== null ? payload : {};
    callback = typeof(callback) == 'function' ? callback : false;

    //in this case we check for callback because, if we dont pass argument callback, dont bother about it.
    //in this case, it is possible to define a value in the argument, like a default value, ES7 features


    //for each querystring paramter sent add it to the path
    var requestUrl = path+'?';
    var counter = 0;
    
    for(var queryKey in queryStringObject){
        if(queryStringObject.hasOwnProperty(queryKey)){
            counter++;
            //join the parameters
            if(counter > 1){
                requestUrl+='&';
            }
            requestUrl+=queryKey+'='+queryStringObject[queryKey];

        }
    }

    var xhr = new XMLHttpRequest();
    xhr.open(method,requestUrl,true);
    xhr.setRequestHeader("Content-Type","application/json");

    //for each header sent, add it to the request
    for(var headerKey in headers){
        if(headers.hadOwnProperty(headerKey)){
            xhr.setRequestHeader(headerKey,headers[headerKey]);

        }
    }  


    //if there is a current session token set, add that as a header
    if(app.config.sessionToken){
        xhr.setRequestHeader("token",app.config.sessionToken.id);
    };

    //When the request comes back, handle the response
    xhr.onreadystatechange = () => {
        if(xhr.readyState == XMLHttpRequest.DONE){
            var statusCode = xhr.status;
            var responseReturned = xhr.responseText;

            //callback if requested
            if(callback){
                try{
                    var parsedResponse = JSON.parse(responseReturned);
                    callback(statusCode,parsedResponse);
                } catch(e){
                    callback(statusCode,false);
                }
            }
        }
    }



    //send the payload JSON
    var payloadString = JSON.stringify(payload);
    xhr.send(payloadString);

};