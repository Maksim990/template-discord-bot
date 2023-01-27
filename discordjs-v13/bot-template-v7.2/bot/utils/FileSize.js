const path = require("path");
const fs = require("fs");

function FileSize(dirname){
    let size = 0;
    try{
        fs.readdirSync(dirname).map(
            e => path.join(dirname, e)
        ).map(
            e => {
                try{
                    return {
                        dirname: e,
                        stat: fs.statSync(e)
                    };
                }catch(err){
                    return err;
                }
        }).forEach(e => {
            if(e){
                if(e.stat.isDirectory()){
                    size += FileSize(e.dirname);
                }else if(e.stat.isFile()){
                    size += e.stat.size;
                }
            };
        });
    }catch(err){console.log(err)}
    return size;
};

exports.FileSize = FileSize;