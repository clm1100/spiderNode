const rp = require('request-promise');
const rq = require('request');
const cheerio = require('cheerio');
const async = require('async')
let testPath;
const path = require('path');
const makeDir = require('make-dir');
const { exec } = require('child_process');
const writeFile = require("./writeFile2.js");
const  template = require('art-template')
const templatepath =  path.join(__dirname,'views/template.html')

let url = "http://www.biquke.com/bq/0/990/";
let book = {}
let arr = [];
let options = {
    uri: url,
    transform: function (body) {
        return cheerio.load(body,{decodeEntities: false});
    }
};

makeDir('test').then(path => {
    testPath = path;
}).then(()=>{
    rp(options).then(($) => {
        book.title = $("#info h1").text();
        let domarr = $('#list dd a');
        domarr.each((index, ele) => {
            var url =  `http://www.biquke.com/bq/0/990/${$(ele).attr('href')}`
            arr.push(url);
        });
        return Promise.resolve(arr)
    }).then(function(urls){
        loop(urls)
    })
});

function loop(bigarr){
    let arr = bigarr.splice(0,20)
    if(arr.length>0){
      async.mapLimit(arr,10,function(url,cb){
        rqpage(url,cb)
      },function(err,results){
        loop(bigarr)
      })
    }else{
      console.log("ok")
    }
  }

function rqpage(url, cb) {
    rp({
        uri: url,
        transform: function (body) {
            return cheerio.load(body,{decodeEntities: false});
        }
    }).then(($)=>{
        let content = $('#content').html();
        let title = $('title').text().replace("_笔趣阁","")
        let pre = $(".bookname a").eq(1).attr('href');
        let next = $(".bookname a").eq(3).attr('href');
        let abctestPath = path.join(testPath, path.basename(url));
        let contentHtml = template(templatepath,{
            title,
            content,
            pre,
            next
        })
        cb(null, $('title').text());
        // console.log(Buffer.alloc(content).toString())
        writeFile(abctestPath, contentHtml)
        
    })
}
