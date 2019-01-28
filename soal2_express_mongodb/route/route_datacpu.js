var router = require('express').Router()
var mongoose = require('mongoose')
var Data = require('../models/data')

let os = require('os')

var url = 'mongodb://lulu:1234@localhost:27017/dataCPU'

mongoose.connect(url, ()=>{
    console.log('Terhubung ke MongoDB')
})

//INSERT data
router.post('/data', (req, res)=>{
    new Data({
        namacpu: os.hostname(),
        tipe: os.type(),
        platform: os.platform(),
        rilis: os.release(),
        ramSisa: os.freemem(),
        ramTotal: os.totalmem()
    })
    .save()
    .then((newData)=>{
        console.log('Data masuk: '+newData)
        res.send(newData)
    })
    .catch((error)=>{
        console.log(error)
    })
})

//GET all data
router.get('/data', (req, res)=>{
    Data.find((error, data)=>{
        console.log(data)
        res.send(data)
    })
})



module.exports = router