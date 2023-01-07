const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { auth } = require('./middleware/auth');
const { User } = require('./models/User');

// application/x-www-form-urlencoded 형식
app.use(bodyParser.urlencoded({ extended: true }));

// application/json 형식
app.use(bodyParser.json());

app.use(cookieParser());

const mongoose = require('mongoose');
mongoose
    .connect(config.mongoURI)
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err));

app.post('/api/users/register', (req, res) => {
    // 회원가입할 때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터베이스에 넣어준다.
    const user = new User(req.body);
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err });

        return res.status(200).json({ success: true });
    });
});

app.post('/api/users/login', (req, res) => {
    // 요청된 이메일이 데이터베이스에 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: '제공된 이메일에 해당하는 사용자가 없습니다.',
            });
        }

        // 요청된 이메일이 있다면 비밀번호가 맞는지 확인한다.
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({ loginSuccess: false, message: '비밀번호가 틀렸습니다.' });

            // 비밀번호까지 맞다면 토큰을 생성한다.
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);

                // 토큰을 쿠키, 로컬스토리지 등에 저장한다.
                res.cookie('x_auth', user.token).status(200).json({ loginSuccess: true, userId: user._id });
            });
        });
    });
});

app.get('/api/users/auth', auth, (req, res) => {
    // 여기까지 middleware를 통과해 왔다는 얘기는 authentication이 true라는 말
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true, // role이 0이 아니면 관리자
        isAuth: true,
        email: req.user.email,
        name: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
});

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({ success: true });
    });
});

app.listen(port, () => console.log(`Listening on port ${port}...`));

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/hello', (req, res) => res.send('안녕하세요~'));
