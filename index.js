const express = require('express')
const app = express()
const port = 7000
const bodyParser = require('body-parser')
const { User } = require("./model/User")

const config = require('./config/key')

//application/x-www-form-urlencoded 타입을 분석해서 가져옴
app.use(bodyParser.urlencoded({extended: true}))
//json 타입 분석해서 가져옴
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.set("strictQuery", true);
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('몽고 연결!'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello'))

app.post('/register', (req, res) => {

    const user = new User(req.body)

    user.save((err, userInfo) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.listen(port, () => console.log(`listening on port ${port}!`))