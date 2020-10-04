const express = require('express');
const { Op } = require('sequelize');

const { Post, User, Image, Comment } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => { // GET /posts
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) } // Op.lt - 보다 작을 때
    }
    const posts = await Post.findAll({
      // where: { id: lastId }, // lastId 방식 게시글 가져오는 방법 마지막에 가져온 게시글의 아이디를 저장해놓고 그 아이디로 부터 게시글을 불러옴.
      // offset: 0, // 1 ~ 10 구간 설정 (잘 사용하지 않음)
      where,
      limit: 10, // 가져올 갯수
      order: [ // 내림차순 설정
          ['createdAt', 'DESC'], // 1차 정렬
          [Comment, 'createdAt', 'DESC'], // 2차 정렬
      ], 
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }]
      }, {
        model: User, // 좋아요 누른 사람
        as: 'Likers',
        attributes: ['id'],
      }, {
        model: Post, // 리트윗 게시글
        as: 'Retweet',
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }, {
          model: Image,
        }],
      }]
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;