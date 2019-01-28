var router = require('express').Router()
var mysql = require('mysql')
var bodyParser = require('body-parser');
router.use(bodyParser.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'sekolahku',
})

db.connect(()=>{
    console.log('Terhubung ke MySQL!')
})


//Signup
router.post('/signup', (req, res)=>{
    var dbstat = 'insert into users set ?'
    var data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    }
    db.query(dbstat, data, (error, result)=>{
        if(error) throw error
        console.log(result)
        res.send({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            status: 'Signup sukses'
        })
    })
})

//Login
router.post('/login', (req, res)=>{
    var dbstat = 'select * from users where email = ?'
    var email = req.body.email
    var password = req.body.password
    db.query(dbstat, [email], (error, result)=>{
        if(error){
            res.send(error)
        }
        else{
            if(result.length>0){
                if(result[0].password == password){
                    res.send({
                        "login": "ok",
                        "status": "Login sukses"
                    })
                }else{
                    res.send({
                        "login": "failed",
                        "status": "Password salah"
                    })
                }
            }else{
                res.send({
                    "login": "failed",
                    "status": "Akun tidak terdaftar"
                })
            }
        }
    })
})

//GET all data (untuk cek data yang berhasil terdaftar)
router.get('/users', (req, res)=>{
    var dbstat = 'select * from users'
    db.query(dbstat, (error, result)=>{
        if(error) throw error
        console.log(result)
        res.send(result)
    })
})


module.exports = router