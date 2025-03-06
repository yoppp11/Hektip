'use strict';

const bcrypt = require('bcryptjs')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserProfile, { foreignKey: 'UserId' })
      User.hasMany(models.Comment, { foreignKey: 'UserId' })

      User.belongsToMany(models.Course, { through: 'UserCourse' });
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Email Tidak Boleh kosong'
        },
        notEmpty: {
          msg: 'Email Tidak Boleh kosong'
        },
        isEmail: {
          msg: 'Email tidak valid'
        },
        async emailNotValid(value) {
          let isValid = await User.findOne({
            where: {
              email: value
            }
          })

          if(isValid) throw new Error('Email sudah terdaftar')
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password Tidak Boleh kosong'
        },
        notEmpty: {
          msg: 'Password Tidak Boleh kosong'
        },
        len: {
          args: [8],
          msg: 'Password minimal 8 karakter'
        }
      }
    },
    role: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  
  // hook untuk hashing password
  User.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  });

  return User;
};