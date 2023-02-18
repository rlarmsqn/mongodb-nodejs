const express = require('express')
const app = express()
const port = 7000
const mongoose = require('mongoose')
mongoose.set("strictQuery", true);
mongoose.connect('mongodb+srv://geunboo:asdf664417@boo-zone.zqgg2bw.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('몽고 연결!'))
    .catch(err => console.log(err))
app.get('/', (req, res) => res.send('Hello'))

app.listen(port, () => console.log(`listening on port ${port}!`))