const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

userSchema.pre('save', function (next) {
    var user = this;

    // 비밀번호가 수정되었을 경우에만
    if (user.isModified('password')) {
        // 비밀번호를 암호화시킨다.
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);

                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
