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
const express = require('express');
const app = express()

let url = "http://www.biquke.com/bq/0/990/";
let book = {}
let arr = [];
let options = {
    uri: url,
    transform: function (body) {
        return cheerio.load(body,{decodeEntities: false});
    }
};

app.engine('html', require('express-art-template'));
app.set('view engine',"html")
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    makeDir('test').then(path => {
        testPath = path;
    }).then(()=>{
        rp(options).then(($) => {
            book.title = $("#info h1").text();
            let domarr = $('#list dd a');
            let latest = $('#info p a[href]').eq(0).text();
            let href = $('#info p a[href]').eq(0).attr('href');
            domarr.each((index, ele) => {
                let obj = {}
            //  obj.url =  `http://www.biquke.com/bq/0/990/${$(ele).attr('href')}`
            obj.url = $(ele).attr('href')
            obj.title = $(ele).text();

                arr.push(obj);
            });
            // let str =  template(path.join(__dirname,'./views/index.html'),{href:href,latest:latest,arr:arr})
            // res.send(str);
            res.render('index',{href:href,latest:latest,arr:arr})
        })
    });
})

app.get('/page/:page',(req,res)=>{
    let page = req.params.page
    let url = `http://www.biquke.com/bq/0/990/${page}`
    rqpage(url,function(err,data){
        // res.json(data)
        // let str = template(path.join(__dirname,'/views/template.html'),data);
        // res.send(str);
        res.render('template',data);
    })
})

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
        cb(null, {
            title,
            content,
            pre,
            next
        });
    })
}
app.listen(3001,()=>{
    console.log("http://127.0.0.1:3001")
})