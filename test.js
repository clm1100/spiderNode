// const { execFile } = require('child_process');
// const child = execFile('node', ['./app1.js'], (error, stdout, stderr) => {
//   if (error) {
//     throw error;
//   }
//   console.log(stdout);
// });


// const { exec } = require('child_process');
// exec(`node app1.js ${"wqewewqeqeqeqewqewqe"}`, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`exec error: ${error}`);
//     return;
//   }
  
//   console.log(`stdout: ${stdout}`);
//   console.log(`stderr: ${stderr}`);
// });
const async = require('async');
var urls = [1,2,3,4,5];
// async.mapLimit(urls,3,function(url,cb){
//   console.log(url)
//    cb&&cb(null,3333)
// },function(err,results){
//   console.log(results)
// })


// async.mapLimit(urls,3,async function(url){
//   console.log(url);
//   return 3333
// },function(err,results){
//   console.log(results)
// })

var p = function(){
  return new Promise(function(resolve,reject){
    setTimeout(()=>{
      console.log(22)
      resolve(33334)
    },1000)
  })
}


// async.mapLimit(urls, 5, async function(url) {
//   let response
//   // response = await p()
//   return response||"魏传参数"
// }, (err, results) => {
//   if (err) throw err
//   // results is now an array of the response bodies
//   console.log(results)
// })


var arr = [];
for(var i=1;i<=100;i++){
  arr.push(i.toString())
}


async function main(arr){
  let results = []
  for (let i = 0; i < arr.length; i++) {
    let ai = await p();
    results.push(ai)
  }
  return results;
}
// console.time("a")
// main(arr).then(function(data){
//   console.timeEnd("a")
//   console.log(data)
// })


// function loop(bigarr){
//     let arr = bigarr.splice(0,5)
//     if(arr.length>0){
//       // console.log(arr);
//       // loop(bigarr)
//       main(arr).then(function(data){
//         console.log(data)
//         loop(bigarr)
//       })
//     }else{
//       console.log("ok")
//     }
// }

// loop(arr);

function loop(bigarr){
  let arr = bigarr.splice(0,5)
  if(arr.length>0){
    async.mapLimit(arr,2,function(url,cb){
      setTimeout(function(){
        cb(null,'234')
      },1000)
    },function(err,results){
      console.log(results);
      loop(bigarr)
    })
  }else{
    console.log("ok")
  }
}

// loop(arr);


var a = 100
function test(){
  // var a = "nihao"
  async.mapLimit([1,2,3],2,function(url,cb){
    console.log(a);
    cb(9)
  },function(err,results){
    console.log(a);
  })
}
// test()
console.time('a')

// var q = async.queue(function (obj, cb) {

//   setTimeout(function () {　　
//     console.log(obj);
//     console.timeEnd('a')　　
//     cb();
//   }, obj.time)
// }, 1)

// q.push({name:222,time:2000},function(){
//   console.log("333")
// })
// q.push({name:222,time:2000},function(){
//   console.log("333")
// })
// q.push({name:222,time:2000},function(){
//   console.log("333")
// })
// q.push({name:222,time:2000},function(){
//   console.log("333")
// })

// for (var i = 0; i < 100; i++) {　　
//   console.log(1);　　　　
//   q.push({
//     name: i,
//     time: i * 1000
//   }, function (err) {　　　　　　
//     console.log(err);　　
//   })
// };

// for (var i = 0; i < 100; i++) {　　
//   console.log(2);　　
//   q.push({
//     name: 1,
//     time: 1000
//   }, function (err) {　　　　
//     console.log(err);　　
//   })
// };

var rq = require('request');
const jschardet = require("jschardet");
const iconv = require('iconv-lite');
let url = "http://www.biquke.com/bq/0/990/";
let url2 = 'http://www.biqugew.com/book/15/'
var options = {
  uri: url2,
  encoding: null
}
rq(options,function(err,data){
  let bianma = data.body
  let result = jschardet.detect(bianma);
  let str = iconv.decode(bianma, result.encoding)
  console.log(result)
  console.log(str)
})

