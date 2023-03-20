const mongoose = require('mongoose')
const imageSchema = mongoose.Schema({
    url: {
        type: String,
    },
    title: {
        type: String,
    },
    comment: {
        type: String,
    },
    regDate: {
        type: String,
    },
})

const Image = mongoose.model('Image', imageSchema)

module.exports = {Image}