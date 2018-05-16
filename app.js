var Crawler = require("crawler");
var path = require('path');
var fs = require('fs');
var book = {} 
var arr = [];
function writeFile(path, str, cb) {
    var writestream = fs.createWriteStream(path);
    writestream.write(str);
    writestream.on('close', function() {
        cb && cb();
    });
}

var cpage = new Crawler({
    maxConnections:10,
    rateLimit: 100,
    callback:(error,res,done)=>{
        var $ = res.$;
        done()
        writeFile(path.join(__dirname,`test/${$('title').text()}.txt`),$('title').text(),done)
    }
})




var c = new Crawler({
    maxConnections : 1,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            book.title= $("#info h1").text();
            let domarr = $('#list dd a');
            domarr.each((index,ele) => {
                var obj = {
                    title : $(ele).text(),
                    url:`http://www.biquke.com/bq/0/990/${$(ele).attr('href')}`
                }
                arr.push(obj);
                arr = arr.filter((ele,index)=>{
                    if(ele.title.indexOf("第")==0){
                        return true;
                    }else{
                        return false
                    }
                })
            });
        }
        var uriarr = arr.map((ele)=>{
            return {
                uri:ele.url
            }
        });
        done();
        cpage.queue(uriarr);
    }
});




c.queue({
    url: 'http://www.biquke.com/bq/0/990/',
})