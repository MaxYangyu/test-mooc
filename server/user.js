const express = require('express');
const Router = express.Router();
const utils = require('utility');

const model = require('./model');
const User = model.getModel('user');
//查询所有的list
Router.get('/list', function (req, res) {
    /*User.remove({},function (err,doc) {})*/    //清除User的所有的数据
    User.find({}, function (err, doc) {
        return res.json(doc)
    })
});
//用户信息
Router.get('/info', function (req, res) {
    return res.json({code: 1})
});
//注册
Router.post('/register', function (req, res) {
    console.log(req.body);
    const {name, pwd, type} = req.body;
    User.findOne({name}, function (err, doc) {
        if (doc) {
            return res.json({code: 1, msg: '用户名已存在'})
        }
        User.create({name, pwd: md5Pwd(pwd), type}, function (e, d) {
            if (e) {
                return res.json({code: 1, msg: '后端出错了'})
            }
            return res.json({code: 0})
        })
    })
})
//加密算法
function md5Pwd(pwd) {
    const salt = 'yangyu_de+test_imooc_kec_____+~~~'
    return utils.sha1(utils.md5(pwd + salt))
}


module.exports = Router;

