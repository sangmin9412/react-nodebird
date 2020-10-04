module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    // id가 기본적으로 들어있다.
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci', // 한글, 이모티콘 저장
  });
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // 일(User) 대 다(Post)   post.addUser, post.getUser, post.setUser
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }); // 다 대 다  post.addHashtags
    db.Post.hasMany(db.Comment); // 일(Post) 대 다(Comment)   post.addComments, post.getComments
    db.Post.hasMany(db.Image); // post.addImages, post.getImages
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }); // post.addLikers, post.removeLikers
    db.Post.belongsTo(db.Post, { as: 'Retweet' }); // post.addRetweet
  };
  return Post;
}