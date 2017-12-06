const express = require('express');
const utils= require('utility'); //md5加密
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const userRouter = require('./user');//express的中间件

const app = express();
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter); //user前缀 router为后缀

app.listen(803, function () {
    console.log('server start at localhost:803')
});