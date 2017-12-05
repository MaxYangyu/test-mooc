const express = require('express');
const userRouter = require('./user');//express的中间件

const app = express();
app.use('/user', userRouter); //user前缀 router为后缀

app.listen(803, function () {
    console.log('server start at localhost:803')
});