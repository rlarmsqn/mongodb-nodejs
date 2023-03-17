const express = require('express')
const app = express()
const port = 7000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./config/key')
const {auth} = require("./middleware/auth")
const {User} = require("./model/User")
const {upload, getFileList} = require('./middleware/upload')
//application/x-www-form-urlencoded 타입을 분석해서 가져옴
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}))
//json 타입 분석해서 가져옴
app.use(bodyParser.json({limit: '50mb'}))
app.use(cookieParser())

const mongoose = require('mongoose')

mongoose.set("strictQuery", true);
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('몽고 연결!'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello'))

app.get('/api/hello', (req, res) => {
    res.send('hiyo~')
})

app.post('/api/users/register', (req, res) => {

    const user = new User(req.body)

    user.save((err, userInfo) => {
        if (err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/api/users/login', (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."})

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err)

                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({loginSuccess: true, userId: user._id})
            })
        })
    })
})

app.get('/api/users/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user._id},
        {token: ""}
        , (err, user) => {
            if (err) return res.json({success: false, err})
            return res.status(200).send({
                success: true
            })
        })
})

app.post('/api/upload', upload, (req, res) => {
    console.log("머고...")
})

app.get('/api/getFileList', getFileList, (req, res) => {
    console.log("파일목록")
})

app.listen(port, () => console.log(`listening on port ${port}!`))