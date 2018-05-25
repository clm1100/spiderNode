const cheerio = require('cheerio');
const path = require('path');
const template = require('art-template')
const express = require('express');
const axios = require('axios');
const app = express()


// 配置模板
app.engine('html', require('express-art-template'));
app.set('view engine', "html")
app.set('views', path.join(__dirname, 'views'))

app.get('/book/:num/:book', (req, res) => {
    let num = req.params.num;
    let book = req.params.book;
    let url = `http://www.biquke.com/bq/${num}/${book}/`
    axios.get(url).then(function (result) {
        let arr =  [];
        let $ = cheerio.load(result.data);
        let domarr = $('#list dd a');
        let latest = $('#info p a[href]').eq(0).text();
        let title = $('#info h1').text()
        let href = $('#info p a[href]').eq(0).attr('href');
        domarr.each((index, ele) => {
            let obj = {}
            obj.url = $(ele).attr('href')
            obj.title = $(ele).text();
            arr.push(obj);
        });
        // let str =  template(path.join(__dirname,'./views/index.html'),{href:href,latest:latest,arr:arr})
        // res.send(str);
        res.render('index', {
            href: href,
            latest: latest,
            arr: arr,
            title
        })
    })
})

app.get('/page/:num/:book/:page', (req, res) => {
    let page = req.params.page
    let book = req.params.book;
    let num = req.params.num
    let url = `http://www.biquke.com/bq/${num}/${book}/${page}`
    axios.get(url).then((result) => {
        let $ = cheerio.load(result.data);
        let content = $('#content').html();
        let title = $('title').text().replace("_笔趣阁", "")
        let pre = $(".bookname a").eq(1).attr('href');
        let next = $(".bookname a").eq(3).attr('href');
        res.render('template', {
            content,
            title,
            pre,
            next
        });
    })
})

app.listen(3001, () => {
    console.log("http://127.0.0.1:3001")
})