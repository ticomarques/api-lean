var fs = require('fs');
var path = require('path');


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

module.exports = lib;