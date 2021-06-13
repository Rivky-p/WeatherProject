const mongoose = require('mongoose');

const weatherSchema = mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    temp: {
        type: String
    },
    wind: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})
module.exports = mongoose.model('Weather', weatherSchema);