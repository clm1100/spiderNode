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
    // console.log(path);
    testPath = path;
    
}).then(()=>{
    rp(options).then(($) => {
        book.title = $("#info h1").text();
        let domarr = $('#list dd a');
        domarr.each((index, ele) => {
            var obj = {
                title: $(ele).text(),
                url: `http://www.biquke.com/bq/0/990/${$(ele).attr('href')}`
            }
            arr.push(obj);
            arr = arr.filter((ele, index) => {
                if (ele.title.indexOf("第") == 0) {
                    return true;
                } else {
                    return false
                }
            })
        });
        var uriarr = arr.map((ele) => {
            return {
                uri: ele.url
            }
        });
        return Promise.resolve(uriarr)
    }).then(function(data){
        let urls = data.map((e)=>e.uri)
        loop(urls)
    })
});






function loop(bigarr){
    let arr = bigarr.splice(0,20)
    if(arr.length>0){
      async.mapLimit(arr,10,function(url,cb){
        // rq(url,(err,data)=>{
        //     let $ = cheerio.load(data.body)
        //     cb(null,$('title').text())
        // })
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
        let title = $('title').text()
        let abctestPath = path.join(testPath, `/${title}.html`);
        let contentHtml = template(templatepath,{
            title:title,
            content:content
        })
        cb(null, $('title').text());
        // console.log(Buffer.alloc(content).toString())
        // console.log(content)
        writeFile(abctestPath, contentHtml)
        
    })
}