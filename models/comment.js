'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, { foreignKey: 'UserId' })
      Comment.hasMany(models.CourseComment, { foreignKey: 'CommentId' })
    }

    formatDate() {
      const createdDate = new Date(this.getDataValue('createdAt'))
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      const formattedDate = createdDate.toLocaleDateString('id-ID', options);
      return formattedDate
    }
  }
  Comment.init({
    content: DataTypes.TEXT,
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};