'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.ENUM('Male', 'Female'),
    date_of_birth: DataTypes.DATE,
    mobile: DataTypes.STRING,
    image: DataTypes.STRING,
    address: DataTypes.STRING,
    email_verified_at: DataTypes.DATE,
    password: DataTypes.STRING,
   
    
    is_active: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true,
    underscored: true,
    paranoid: true,

    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  })
 
  
  return User;
};