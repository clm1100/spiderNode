const path = require('path');
const template = require('art-template')
const express = require('express');
const router = require('./router/router.js')
const app = express()


// 配置模板
app.engine('html', require('express-art-template'));
app.set('view engine', "html")
app.set('views', path.join(__dirname, 'views'))

app.use(router);


app.listen(3001, () => {
    console.log("http://127.0.0.1:3001")
})