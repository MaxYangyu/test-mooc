const express = require('express');
const utils = require('utility'); //md5加密
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');//post的请求的中间件
const userRouter = require('./user');//express的中间件

const app = express();

//socket跟express配合
const server = require('http').Server(app);

const io = require('socket.io')(server);
io.on('connection', function (socket) {
    console.log('user login')
    socket.on('sendmsg', function (data) {
        console.log(data)
        io.emit('recvmsg', data)
    })
})

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter); //user前缀 router为后缀

server.listen(803, function () {
    console.log('server start at localhost:803')
});