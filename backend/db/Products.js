const mongoose = require('mongoose');

const producShema = mongoose.Schema({
    name: String,
    price: Number,
    userId: String,
})

module.exports = mongoose.model('products', producShema);