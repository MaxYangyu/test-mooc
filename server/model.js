const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/imooc-chat")
mongoose.connection.on('connected', function () {
    console.log('mongo connect succect')
});
const model = {
    user: {
        //require 为必须选项
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
        'chatid': {type: String, require: true},
        'from': {type: String, require: true},
        'to': {type: String, require: true},
        'read': {type: Boolean, default: false},
        'content': {type: String, require: true, default: ''},
        'create_time': {type: Number, default: new Date().getTime()}
    },
}
for (let m in model) {
    mongoose.model(m, new mongoose.Schema(model[m]))
}
module.exports = {
    getModel: function (name) {
        return mongoose.model(name)
    }
}