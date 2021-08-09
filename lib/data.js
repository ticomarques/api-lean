var fs = require('fs');
var path = require('path');
var helpers = require('./helpers');


var lib = {

};

lib.baseDir = path.join(__dirname,'/../.data/');

lib.create = (dir, file, data, callback) => {
    fs.open(lib.baseDir+dir+'/'+file+'.json','wx',(err, fileDescriptor)=>{
        if(!err && fileDescriptor){
            var stringData = JSON.stringify(data);

            fs.writeFile(fileDescriptor, stringData,(err)=>{
                if(!err){
                    fs.close(fileDescriptor,(err)=>{
                        if(!err){
                             callback(false);
                        } else {
                            callback('Error closing new file');
                        }
                    });
                } else {
                    callback('error writing the new file');
                }
            });
        } else {
            callback('could not create the file, it may already exist');
        }
    });
};

lib.read = (dir, file, callback)=>{
    fs.readFile(lib.baseDir+dir+'/'+file+'.json','utf8',(err,data)=>{
        if(!err && data){
            var parsedData = helpers.parseJsonToObject(data);
            callback(false,parsedData);
        } else {
            callback(err,data);
        }
    });
};

lib.update = (dir,file,data,callback)=>{
    fs.open(lib.baseDir+dir+'/'+file+'.json','r+',(err,fileDescriptor)=>{
        if(!err && fileDescriptor){
            var stringData = JSON.stringify(data);
            fs.ftruncate(fileDescriptor,(err)=>{
                if(!err){
                    fs.writeFile(fileDescriptor,stringData,(err)=>{
                        if(!err){
                            fs.close(fileDescriptor,(err)=>{
                                if(!err){
                                    callback(false);
                                } else {
                                    callback('Error closing the file');
                                }
                            });
                        } else {
                            callback('Error to write the existing file.')
                        }
                    });
                } else {
                    callback('Error truncating file.');
                }
            });
        } else {
            callback('Could not open the file for updating, it may not exist yet.')
        }
    });
};

lib.delete = (dir,file,callback) => {
    fs.unlink(lib.baseDir+dir+'/'+file+'.json',(err)=>{
        if(!err){
            callback(false);
        } else {
            callback('Error deleting the file');
        }
    });
};

lib.list = (dir, callback) => {
    fs.readdir(lib.baseDir+'dir'+'/',(err, data)=>{
        if(!err && data && data.length > 0){
            var trimmedFileNames = [];
            data.forEach((fileName)=>{
                trimmedFileNames.push(fileName.replace('.json',''));
            });
            callback(false,trimmedFileNames);
        } else {
            callback(err,data);
        }
    });
};

module.exports = lib;