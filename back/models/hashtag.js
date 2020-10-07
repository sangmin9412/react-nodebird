const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class HashTag extends Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    }, {
      modelName: 'HashTag',
      tableName: 'hashtags',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', // 한글, 이모티콘 저장
      sequelize,
    })
  }

  static associate(db) {
    this.belongsToMany(db.Post, { through: 'PostHashtag' });
  }
};