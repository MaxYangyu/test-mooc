const express = require('express');
const Router = express.Router();
const utils = require('utility');
/*引入mongo*/
const model = require('./model');
/*选择哪个库*/
const User = model.getModel('user');
const Chat = model.getModel('chat');
/*过滤 不返回的作用*/
const _filter = {'pwd': 0, '__v': 0};

/*Chat.remove({},function(e,d){

})*/
//查询所有的list
Router.get('/list', function (req, res) {
    const type = req.query.type;

    //清除User的所有的数据
    /*User.remove({},function (err,doc) {})*/

    //查询User的所有的数据
    User.find({type}, _filter, function (err, doc) {
        return res.json({code: 0, data: doc})
    })
});

//用户信息
Router.get('/info', function (req, res) {
    const {user_id} = req.cookies;
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

//获取chat
Router.get('/getmsglist', function (req, res) {
    const name = req.cookies.user_id;
    User.find({}, function (err, doc) {
        let users = {};
        doc.forEach(v => {
            users[v._id] = {name: v.name, avatar: v.avatar}
        });
        Chat.find({'$or': [{from: name}, {to: name}]}, function (err, doc) {
            if (!err) {
                return res.json({code: 0, msgs: doc, users: users})
            }
        })
    })

});

Router.post('/readmsg', function (req, res) {
    const userid = req.cookies.user_id;
    const {from} = req.body;
    console.log(userid, from);
    Chat.update({from, to: userid}, {'$set': {read: true}}, function (err, doc) {
        console.log(doc)
        if (!err) {
            return res.json({code: 0, num: doc.nModified})
        }
        return res.json({code: 1, msg: '修改失败'})
    })

});

//登录
Router.post('/login', function (req, res) {
    const {name, pwd} = req.body;
    User.findOne({name, pwd: md5Pwd(pwd)}, _filter, function (err, doc) {
        if (!doc) {
            return res.json({code: 1, msg: '用户名或密码错误'})
        }
        res.cookie('user_id', doc._id)
        return res.json({code: 0, data: doc})
    })
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
});

//更新信息
Router.post('/update', function (req, res) {
    const user_id = req.cookies.user_id
    if (!user_id) {
        return res.json({code: 1, msg: '请先登录'})
    }
    const body = req.body;
    User.findByIdAndUpdate(user_id, body, function (e, d) {
        const data = Object.assign({}, {
            name: d.name,
            type: d.type
        }, body);
        return res.json({code: 0, data: data})
    })
});

//加密算法
function md5Pwd(pwd) {
    const salt = 'yangyu_de+test_imooc_kec_____+~~~'
    return utils.sha1(utils.md5(pwd + salt))
}


module.exports = Router;

