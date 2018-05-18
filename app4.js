const rp = require('request-promise');
const cheerio = require('cheerio');
const async = require('async')
let url = "http://www.biquke.com/bq/0/990/";
let book = {}
let arr = [];
let options = {
    uri: url,
    transform: function (body) {
        return cheerio.load(body);
    }
};

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
    console.log(data)
    data.map((e)=>e.url)
    loop(data)
})


function loop(bigarr){
    let arr = bigarr.splice(0,20)
    if(arr.length>0){
      async.mapLimit(arr,2,function(url,cb){
        setTimeout(function(){
          cb(null,'234')
        },100)
      },function(err,results){
        console.log(results);
        loop(bigarr)
      })
    }else{
      console.log("ok")
    }
  }