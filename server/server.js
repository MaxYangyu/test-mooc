const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/imooc-react")
mongoose.conection.on('connected',function () {
    console.log('mongo connect succect')
})
const User = mongoose.model('user',new mongoose.Schema({
        name:{type:String,require:true},
        age:{type:String,require:true},
}))
app.get('/', function (req, res) {
    res.send('<h1>hello world</h1>')
})
app.get('/data', function (req, res) {
    User.find({},function (err,doc) {
         res.json(doc)
    })
})

app.listen(803, function () {
    console.log('server start at localhost:830')
})