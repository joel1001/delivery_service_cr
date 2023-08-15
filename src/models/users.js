const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        required: true
    },
    image: {
        type: String,
        require: false
    },
    created: {
        type: Date,
        required: true,
        default: Date.now,
    },
});
module.exports = mongoose.model('User', userSchema);