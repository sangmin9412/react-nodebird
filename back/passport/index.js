const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

module.exports = () => {
  passport.serializeUser((user, done) => { // 로그인 성공
    // 메모리 절약을 위해 사용자 정보를 모두 기억하지 않고
    // 쿠키와, 로그인한 사용자 아이디만 서버에 기억
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => { // 로그인 성공 후
    // 로그인 후 요청이 올 때 아이디를 통해 사용자 정보를 복구
    // 복구된 정보는 req.user 로 사용
    try {
      const user = await User.findOne({
        where: { id }
      });
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
}