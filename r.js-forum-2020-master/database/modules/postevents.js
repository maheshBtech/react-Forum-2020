const mongoose = require('mongoose');

const newEvent = mongoose.Schema({
    path:String,
    videopath:String,
    desc:String,
    comments:String
})
module.exports = postevent = mongoose.model('postevent',newEvent)