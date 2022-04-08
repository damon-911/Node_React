const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: 1,
    },
    password: {
        type: String,
        minlength: 5,
    },
    name: {
        type: String,
        minlength: 2,
        maxlength: 5,
    },
    gender: {
        type: String,
    },
    age: {
        type: Number,
    },
    height: {
        type: Number,
    },
    role: {
        type: String,
    },
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
