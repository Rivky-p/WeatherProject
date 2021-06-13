const mongoose = require('mongoose');
const Weather = require('./Weather.model');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    requestsHistory: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Weather'
        }
    ]
})


userSchema.pre('remove', async function (next) {
    console.log('pre remove');
    await Weather.deleteMany({ user: this._id });
    next();
})

module.exports = mongoose.model('User', userSchema);