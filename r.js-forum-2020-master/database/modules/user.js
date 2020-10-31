const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    college:{
       type: String
    },
    profilepic:{
        type:String
    }
    
}) 

module.exports = user = mongoose.model('RegesterCandidate',UserSchema)
