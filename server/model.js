const express = require('express');
const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/imooc-react")
mongoose.connection.on('connected', function () {
    console.log('mongo connect succect')
});
const User = mongoose.model('user', new mongoose.Schema({
    name: {type: String, require: true},
    age: {type: String, require: true},
}));