var express = require('express');
var route_mongoose = require('./route/route_datacpu')
var cors = require('cors')

var app = express();
app.use(route_mongoose);
app.use(cors())

// route
app.get('/', (req, res)=>{
    res.send('<h1>Express x Mongoose</h1>')
})

// aktivasi server
app.listen(3210, ()=>{
    console.log('Server aktif di port 3210!')
})