const fs = require('fs')
const path =  require('path')

// setTimeout(function(){
//     process.exit();
// })
module.exports = function(spath,content,cb){
    let writestream = fs.createWriteStream(spath);
    writestream.write(content)
    writestream.on('close',(err)=>{
        cb&&cb()
        console.log("close")
        // process.exit()
    })
}