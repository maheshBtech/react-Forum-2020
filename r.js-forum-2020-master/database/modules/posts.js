const mongoose = require('mongoose')
const newPost = mongoose.Schema({
    post:String,
    date:{
        type:Date,
        default:new Date
    }
})

module.exports = postt = mongoose.model('post',newPost)