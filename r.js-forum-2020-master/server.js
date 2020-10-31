const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))



const routee = require('./routes/route')
const mongoose = require('./database/mongoose')




app.use('/',routee)
app.listen(4000,() =>
{
    console.log("server is running at port:4000")
})