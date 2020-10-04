const express = require('express'); // express
const cors = require('cors'); // cors module
const session = require('express-session'); // session
const cookieParser = require('cookie-parser'); // cookie
const passport = require('passport'); // login 전략 설정, SNS 로그인도 가능 npm passport-{SNS}
const dotenv = require('dotenv'); // 키 관리 (DB PASSWORD 등 소스에 노출되어지면 안되는 값들을 따로 관리)
const morgan = require('morgan'); // 프론트에서 어떤 요청이 왔는지 console 에 출력
const path = require('path');
const hpp = require('hpp');
const helmet = require('helmet');

const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const hashtagRouter = require('./routes/hashtag');
const db = require('./models');
const passportConfig = require('./passport');

dotenv.config();
const app = express();

/**
 * app.get -> 가져오다
 * app.post -> 생성하다
 * app.put -> 전체 수정
 * app.delete -> 제거
 * app.patch -> 부분 수정
 * app.options -> 찔러보기
 * app.head -> 헤더만 가져오기 (헤더/바디)
 * 
 */

db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공!');
  })
  .catch(console.error);

passportConfig();

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet());
} else {
  app.use(morgan('dev')); 
}

app.use(cors({
  //origin: true, // 요청 허용 (요청 온 주소를 자동으로 적용)
  origin: ['http://localhost:3050', 'nodebird.com'],
  credentials: true, // 다른 도메인과 쿠키 공유하기
}));
app.use('/', express.static(path.join(__dirname, 'uploads'))); // __dirname = /back/ + uploads
app.use(express.json()); // axios 로 json 데이터 받을 때
app.use(express.urlencoded({ extended: true })); // 일반 form data 받을 때
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('hello express');
});

app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);
app.use('/hashtag', hashtagRouter);

// 에러처리 미들웨어는 자체적으로 갖고 있지만 직접 처리하고 싶은 경우 아래 형태로 작성해서 직접 구현 가능
// app.use((err, req, res, next) => {});

app.listen(80, () => {
  console.log('서버 실행 중');
});

/*
app.get('/api', (req, res) => {
  res.send('hello api');
});

app.get('/posts', (req, res) => {
  res.json([
    { id: 1, content: 'hello1' },
    { id: 2, content: 'hello2' },
    { id: 3, content: 'hello3' },
  ]);
});
*/