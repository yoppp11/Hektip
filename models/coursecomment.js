'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CourseComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CourseComment.belongsTo(models.Comment, { foreignKey: 'CommentId' })
      CourseComment.belongsTo(models.Course, { foreignKey: 'CourseId' })
    }
  }
  CourseComment.init({
    CommentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Comments',
        key: 'id'
      }
    },
    CourseId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Courses',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'CourseComment',
  });
  return CourseComment;
};