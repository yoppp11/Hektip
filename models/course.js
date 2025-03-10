'use strict';

const {NumberFormat} = require('intl')
const {
  Model, Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.hasMany(models.UserCourse, {foreignKey: 'CourseId'})
      Course.hasMany(models.CourseComment, {foreignKey: 'CourseId'})
    }

    get formatPrice(){
      return new NumberFormat('id-Id', {
        style: 'currency',
        currency: 'IDR'
      }).format(this.price)
    }

    static async getData(search, filter){
      try {
        let data

        if(!search && !filter){
          data = await Course.findAll()          
        } else if(search){
          data = await Course.findAll({
            where: {
              courseName: {
                [Op.iLike]: `%${search}%`
              }
            }
          })
        } else if(filter){
          data = await Course.findAll({
            where: {
              level: filter
            }
          })
          
        }

        return data

      } catch (error) {
        throw error
      }
    }
  }
  Course.init({
    courseName: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING,
    trailerUrl: DataTypes.STRING,
    membersJoined: DataTypes.INTEGER,
    level: DataTypes.STRING,
    instructorName: DataTypes.STRING,
    instructorAvatar: DataTypes.STRING,
    instructorBio: DataTypes.STRING,
    curriculum: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};