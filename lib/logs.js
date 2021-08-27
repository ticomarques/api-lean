/**
 * Library for storing and rotating logs
 */

var fs = require('fs');
var path = require('path');
var zlib = require('zlib');

//container for the module
var lib = {};

//base directory of the logs folder
lib.baseDir = path.join(__dirname,'/../.logs/');

// Append a string to a file. Create the file, if it does not exist.
lib.append = (file,str,callback) => {
    //Open the file for append

    fs.open(lib.baseDir+file+'.log','a',(err,fileDescriptor)=>{
        if(!err && fileDescriptor){
            //Append to the file and close it
            fs.appendFile(fileDescriptor,str+'\n',(err)=>{
                if(!err){
                    fs.close(fileDescriptor,(err)=>{
                        if(!err){
                            callback(false);
                        } else {
                            callback('Error closing the file that was being appended.')
                        }
                    });
                } else {
                    callback('Error appedding the file');
                }
            });
        } else {
            callback('Could not open the file for appending.');
        }
    });
};

//List all the logs, and optionally include the compressed logs
lib.list = (includeCompressedLogs, callback) => {
    fs.readdir(lib.baseDir, (err, data)=>{
        if(!err && data.length > 0) {
            var trimmedFileNames = [];
            data.forEach((fileName) => {
                //Add the .log files
                if(fileName.indexOf('.log') > -1){
                    trimmedFileNames.push(fileName.replace('.log',''));
                }
                //Add on the .gz files 
                if(fileName.indexOf('.gz.b64') > -1 && includeCompressedLogs){
                    trimmedFileNames.push(fileName.replace('.gz.b64',''));
                }
            });
            callback(false, trimmedFileNames);
        } else {
            callback(err, data);
        }
    });
};

//Compress the contents of one .log file into a .gz.b64 file within the same direcotry

lib.compress = (logId,newFileId,callback)=>{
    var sourceFile = logId+'.log';
    var destFile = newFileId+'gz.b64';

    //Read the source file
    fs.readFile(lib.baseDir+sourceFile,'utf8',(err,inputstring) => {
        if(!err && inputstring){
            //compress the data using gzip
            zlib.gzip(inputstring,(err,buffer)=>{
                if(!err && buffer){
                    //send the data to the destination file
                    fs.open(lib.baseDir+destFile,'wx',(err,fileDescriptor)=>{
                        if(!err && fileDescriptor){
                            //wite destination file
                            fs.writeFile(fileDescriptor,buffer.toString('base64'),(err)=>{
                                if(!err){
                                    fs.close(fileDescriptor,(err)=>{
                                        if(!err){
                                            callback(false);
                                        } else {
                                            callback(err);
                                        }
                                    });
                                } else {
                                    callback(err);
                                }
                            })
                        } else {
                            callback(err);
                        }
                    });
                } else {
                    callback(err);
                }
            });
        } else {
            callback(err);
        }
    });
};

//decompress the contents of a .gz.b64 file into a string variable
lib.decompress = (fileId, callback) => {
    var fileName = fileId + '.gz.b64';
    fs.readFile(lib.baseDir+fileName,'utf8',(err,str)=>{
        if(!err && str){
            //Decompress the data
            var inputBuffer = Buffer.from(str,'base64');
            zlib.unzip(inputBuffer,(err,outputBuffer)=>{
                if(!err && outputBuffer){
                    var str = outputBuffer.toString();
                    callback(false,str);
                } else {
                    callback(err);
                }
            });
        } else {
            callback(err);
        }
    });
};

//Truncate a log file

lib.truncate = (logId, callback) => {
    fs.truncate(lib.baseDir+logId+'.log',0, err => {
        if(!err){
            callback(false);
        } else {
            callback(err);
        }
    });
};

module.exports = lib;