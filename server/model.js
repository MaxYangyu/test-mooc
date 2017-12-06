const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/imooc-chat")
mongoose.connection.on('connected', function () {
    console.log('mongo connect succect')
});
const model = {
    user: {
        //require 为必须
        'name': {type: String, require: true},
        'pwd': {type: String, require: true},
        'type': {type: String, require: true},
        //头像
        'avatar': {type: String},
        //简介
        'desc': {type: String},
        //头衔
        'title': {type: String},
        //如果是boss
        'company': {type: String},
        'money': {type: String}

    },
    chat: {

    },
}
for (let m in model) {
    mongoose.model(m, new mongoose.Schema(model[m]))
}
module.exports = {
    getModel:function (name) {
        return mongoose.model(name)
    }
}