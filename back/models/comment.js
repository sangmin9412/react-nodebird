const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Comment extends Model {
  static init(sequelize) {
    return super.init({
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    }, {
      modelName: 'Comment',
      tableName: 'comments',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', // 한글, 이모티콘 저장
      sequelize,
    });
  }

  static associate(db) {
    this.belongsTo(db.User);
    this.belongsTo(db.Post);
  }
};