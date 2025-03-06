'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // UserCourse.belongsToMany(models.User)
      // UserCourse.belongsToMany(models.Course)
    }
  }
  UserCourse.init({
    enrolledDate: DataTypes.DATE,
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
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
    modelName: 'UserCourse',
  });
  return UserCourse;
};