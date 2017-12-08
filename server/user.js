const express = require('express');
const Router = express.Router();
const utils = require('utility');

const model = require('./model');
const User = model.getModel('user');

const _filter = {'pwd': 0, '__v': 0}
//查询所有的list
Router.get('/list', function (req, res) {
    //清除User的所有的数据
    /*User.remove({},function (err,doc) {})*/

    //查询User的所有的数据
    User.find({}, function (err, doc) {
        return res.json(doc)
    })
})

//用户信息
Router.get('/info', function (req, res) {
    const {user_id} = req.cookies
    if (!user_id) {
        return res.json({code: 1})
    }
    User.findOne({_id: user_id}, _filter, function (err, doc) {
        if (err) {
            res.json({code: 1, msg: '后端出错了'})
        }
        if (doc) {
            res.json({code: 0, data: doc})
        }
    })
});

//登录
Router.post('/login', function (req, res) {
    const {name, pwd} = req.body
    User.findOne({name, pwd: md5Pwd(pwd)}, _filter, function (err, doc) {
        if (!doc) {
            return res.json({code: 1, msg: '用户名或密码错误'})
        }
        res.cookie('user_id', doc._id)
        return res.json({code: 0, data: doc})
    })
})

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

