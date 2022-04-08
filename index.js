const express = require('express');
const req = require('express/lib/request');
const app = express();
const port = 8080;
const bodyParser = require('body-parser');
const config = require('./config/key');

// application/x-www-form-urlencoded 형식
app.use(bodyParser.urlencoded({ extended: true }));

// application/json 형식
app.use(bodyParser.json());

const mongoose = require('mongoose');
const { User } = require('./models/User');
mongoose
    .connect(config.mongoURI)
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err));

app.get('/users/signup', (req, res) => res.send('Hello World!'));

app.post('/users/signup', (req, res) => {
    // 회원가입할 때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터베이스에 넣어준다.
    const user = new User(req.body);
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err });

        return res.status(200).json({ success: true });
    });
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
