const mongoose = require('mongoose')

const newEvent = mongoose.Schema({
    eventt:String,
    date:{
        type:Date,
        default:new Date()
    }
})

module.exports = Evnt = mongoose.model('event',newEvent)