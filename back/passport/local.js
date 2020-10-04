const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      const user = await User.findOne({
        where: { email }
      });
      if (!user) { // 이메일이 없는 경우
        return done(null, false, { reason: '존재하지 않는 이메일입니다!' }); // done(1, 2, 3) params - 1번째 서버에러, 2번째 성공, 3번째 클라이언트 에러
      }
     const result = await bcrypt.compare(password, user.password);
     if (result) { // 로그인 성공
      return done(null, user); // user - 사용자정보 넘겨주기
     }
     return done(null, false, { reason: '비밀번호가 틀렸습니다.' });
    } catch (error) {
      console.error(error);
      return done(error);
    }
  }));
}
