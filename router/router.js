const express = require('express');
const router = express.Router();
const axios = require('axios');
const cheerio = require('cheerio');



router.get('/book/:num/:book', (req, res) => {
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
        res.render('book', {
            href: href,
            latest: latest,
            arr: arr,
            title,
            num,
            book
        })
    })
})

router.get('/page/:num/:book/:page', (req, res) => {
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
        let bookHome = `/book/${num}/${book}`
        res.render('template', {
            content,
            title,
            pre,
            next,
            bookHome
        });
    })
})

router.get('/',function(req,res){
    let newscontent = [];
    axios.get('http://www.biquke.com').then((result)=>{
        let $ = cheerio.load(result.data);
         $("#newscontent .l ul li").each(function(i,e){
             console.log($(e).find('.s2').find('a').text())
            newscontent.push({
                category:$(e).find('span.s1').text(),
                bookTilte:$(e).find('.s2').find('a').text(),
                bookHref:$(e).find('.s2').find('a').attr("href"),
                pageTilte:$(e).find('.s3').find('a').text(),
                pageHref:$(e).find('.s3').find('a').attr("href"),
                author:$(e).find('.s4').text(),
                time:$(e).find('.s5').text()
            })
        })
        // res.json({newscontent});
        res.render('index',{newscontent})    
    })
})

module.exports = router;