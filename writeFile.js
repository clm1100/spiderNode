var fs =require('fs');
var spath = decodeURIComponent(process.argv[2]);
var str = decodeURIComponent(process.argv[3]);
console.log(spath)
console.log(str);
var sleep = require('./sleep1.js');
function writeFile(spath, str, cb) {
    sleep();
    var writestream = fs.createWriteStream(spath);
    writestream.write(str);
    writestream.on('close', function() {
        cb && cb();
    });
}
writeFile(spath,str,function(){
    console.log('写完一个')
    process.exit();
})