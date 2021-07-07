'use strict';
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
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.ENUM('admin','supervisior','basic'),
    mobile: DataTypes.INTEGER,
    gender: DataTypes.ENUM('MALE','FEMALE'),
    date: DataTypes.DATE,
    dateOfJoing: DataTypes.DATE,
    address: DataTypes.STRING,
    permanentAddress: DataTypes.STRING,
    designation: DataTypes.STRING,
    photo: DataTypes.STRING,
    status: DataTypes.ENUM('ACTIVE','INACTIVE')
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};